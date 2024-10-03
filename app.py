from flask import Flask, render_template, request, redirect, url_for, jsonify, session
from datetime import datetime
import os
import pymysql
from werkzeug.utils import secure_filename
import traceback
import pytz
from flask_cors import CORS
import mysql.connector
import logging
from flask import send_file, abort


app = Flask(__name__)
CORS(app)
app.secret_key = '123'


# MySQL configuration
DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = 'Hay49056'
DB_NAME = 'dec19'

def get_db_connection():
    return pymysql.connect(
        host=DB_HOST, user=DB_USER, password=DB_PASSWORD, database=DB_NAME, cursorclass=pymysql.cursors.DictCursor
    )

app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, 'uploads')

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        role = request.form.get('role')  # Get the role from the form

        print("Email entered:", email)
        print("Role selected:", role)

        conn = None
        try:
            conn = get_db_connection()
            with conn.cursor() as cursor:
                query = """
                SELECT u.first_name, r.role_name AS role, u.photo_filename 
                FROM users u 
                JOIN user_role ur ON u.user_id = ur.user_id
                JOIN roles r ON ur.role_id = r.id 
                WHERE u.email = %s AND r.role_name = %s
                """
                cursor.execute(query, (email, role))
                user = cursor.fetchone()

            print("User found:", user)

            if user:
                session['first_name'] = user['first_name']
                session['role'] = user['role']
                session['photo_filename'] = user['photo_filename']
                return redirect(url_for('user_list', first_name=user['first_name'], role=user['role'], photo_filename=user['photo_filename']))
            else:
                return "User not found or role mismatch!", 404
        except Exception as e:
            return str(e), 500
        finally:
            if conn:
                conn.close()

    return render_template('login.html')

@app.route('/api/user_roles', methods=['GET'])
def get_user_roles():
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            query = """
                SELECT 
                    u.user_id, 
                    u.first_name, 
                    COALESCE(GROUP_CONCAT(ur.role_id), '') AS role_ids
                FROM 
                    Users u
                LEFT JOIN 
                    User_Role ur ON u.user_id = ur.user_id
                GROUP BY 
                    u.user_id
            """
            cursor.execute(query)
            user_roles = cursor.fetchall()

            logging.debug(f'Fetched user_roles: {user_roles}')

            for user in user_roles:
                role_ids_str = user.get('role_ids', '')

    # Ensure role_ids_str is always a string and trim whitespace
                if role_ids_str is None:
                        role_ids_str = ''
                        role_ids_str = role_ids_str.strip()

                logging.debug(f'Processing role_ids_str: "{role_ids_str}"')

    # Process if role_ids_str is not empty
                if role_ids_str:
                    try:
            # Convert the comma-separated string of role IDs to a list of integers
                        user['role_ids'] = list(map(int, role_ids_str.split(',')))
                        logging.debug(f'Converted role_ids: {user["role_ids"]}')
                    except ValueError as ve:
                        logging.error(f'Error converting role_ids_str to integers: {ve}')
                        user['role_ids'] = []
                else:
                    user['role_ids'] = []

                logging.debug(f'Processed user_roles entry: {user}')

    except Exception as e:
        # Safely convert the exception message to a string
        error_message = str(e) if e is not None else 'Unknown error'
        logging.error('An unexpected error occurred: %s', error_message)
        return jsonify({'error': 'An unexpected error occurred. Please try again later.'}), 500
    finally:
        connection.close()

    return jsonify(user_roles)

 
 
@app.route('/api/update_user_roles', methods=['POST'])
def update_user_roles():
    data = request.json  # Get the JSON data from the request
    logging.debug(f'Received data for update: {data}')
    
    # Validate input data
    if 'user_id' not in data or not data['role_ids']:
        logging.error('Invalid input data: user_id or role_ids missing.')
        return jsonify({'error': 'Invalid input data: user_id or role_ids missing.'}), 400
    
    user_id = data['user_id']
    role_ids = data['role_ids']
    
    if user_id is None or any(role_id is None for role_id in role_ids):
        logging.error('Invalid data: NoneType encountered in user_id or role_ids.')
        return jsonify({'error': 'Invalid data: NoneType encountered in user_id or role_ids.'}), 400

    # Print all role_ids
    print(f'Role IDs to update for user_id {user_id}: {role_ids}')
    logging.debug(f'Role IDs to update for user_id {user_id}: {role_ids}')

    connection = get_db_connection()
   
    try:
        with connection.cursor() as cursor:
            # First, delete existing roles for the user
            cursor.execute("DELETE FROM user_role WHERE user_id = %s", (user_id,))
            logging.debug(f'Deleted roles for user_id: {user_id}')
           
            # Insert the new roles for the user
            for role_id in role_ids:
                if role_id is not None:  # Ensure role_id is not None before inserting
                    cursor.execute(
                        "INSERT INTO user_role (user_id, role_id) VALUES (%s, %s)", 
                        (user_id, role_id)
                    )
                    logging.debug(f'Inserted role_id {role_id} for user_id: {user_id}')
                
        connection.commit()  # Commit the transaction
        logging.debug('Transaction committed successfully')
        return jsonify({'status': 'success'}), 200
        
    except Exception as e:
        logging.error(f'Error occurred during user roles update: {str(e)}')
        connection.rollback()  # Rollback the transaction in case of error
        return jsonify({'error': 'Failed to update user roles'}), 500
    finally:
        connection.close()


@app.route('/user_list')
def user_list():
    conn = None
    try:
        sort_by = request.args.get('sort_by', 'user_id')

        conn = get_db_connection()
        with conn.cursor() as cursor:
            cursor.execute(f"SELECT * FROM users ORDER BY {sort_by}")
            users = cursor.fetchall()

        role_counts = {}
        for user in users:
            role_name = user['role']
            role_counts[role_name] = role_counts.get(role_name, 0) + 1

        first_name = request.args.get('first_name')
        role = request.args.get('role')
        photo_filename = request.args.get('photo_filename')

        return render_template('blank.html', users=users, role_counts=role_counts, first_name=first_name, role=role, photo_filename=photo_filename)
    except Exception as e:
        return jsonify({'error': str(e)})
    finally:
        if conn:
            conn.close()
             
             

@app.route('/accountsettings', methods=['POST'])
def account_settings():
    conn = None
    try:
        emp_id = request.form.get('Emp_id')
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        email = request.form.get('email')
        role = request.form.get('Role')
        phone_number = request.form.get('phone_number')
        photo_file = request.files.get('photo')
        user_created = session.get('first_name')

        # Print field values for debugging
        print(f"Emp_id: {emp_id}")
        print(f"First Name: {first_name}")
        print(f"Last Name: {last_name}")
        print(f"Email: {email}")
        print(f"Role: {role}")
        print(f"Phone Number: {phone_number}")
        print(f"Photo File: {photo_file}")
        print(f"User created: {user_created}")

        # Validate required fields
        if not emp_id or not first_name or not last_name or not email or not role or not phone_number:
            raise ValueError("All fields are required")

        # Determine the photo filename
        if photo_file:
            photo_filename = photo_file.filename
        else:
            photo_filename = None

        # Connect to the database
        conn = get_db_connection()
        with conn.cursor() as cursor:
            sql_query = """
                INSERT INTO users (Emp_id, first_name, last_name, email, role, phone_number, photo_filename, user_created) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(sql_query, (emp_id, first_name, last_name, email, role, phone_number, photo_filename, user_created))
            conn.commit()

        # Save the photo file if it exists
        if photo_file:
            photo_file_path = os.path.join(app.root_path, 'static', 'uploads', photo_filename)
            photo_file.save(photo_file_path)

        return jsonify({'message': 'Account details saved successfully'})
    except Exception as e:
        error_message = f"Error saving account details: {str(e)}"
        print(error_message)
        return jsonify({'error': error_message})
    finally:
        if conn:
            conn.close()
            

@app.route('/delete-user/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    connection = get_db_connection()
    cursor = connection.cursor()

    try:
        # First, delete from the user_role table using user_id
        cursor.execute("DELETE FROM user_role WHERE user_id = %s", (user_id,))
        
        # Then, delete from the users table using user_id
        cursor.execute("DELETE FROM users WHERE user_id = %s", (user_id,))
        
        connection.commit()
        return jsonify({"message": "User deleted successfully"}), 200
    except Exception as e:
        connection.rollback()
        print(f"Error: {e}")  # Log the error to the console
        return jsonify({"message": str(e)}), 500
    finally:
        cursor.close()
        connection.close()



@app.route('/assign_projects', methods=['POST'])
def assign_projects():
    conn = None
    try:
        json_data = request.get_json()
        project_id = json_data.get('projectID')
        project_name = json_data.get('projectName')
        team_leader = json_data.get('teamLeader')
        status = json_data.get('status')
        assignedBy = session.get('first_name')

        # Print statements for debugging
        print("Received JSON Data:", json_data)
        print("Parsed Data: projectID -", project_id)
        print("Parsed Data: projectName -", project_name)
        print("Parsed Data: teamLeader -", team_leader)
        print("Parsed Data: status -", status)
        print("Parsed Data: assignedBy -", assignedBy)

        conn = get_db_connection()
        with conn.cursor() as cursor:
            sql_query = """
                INSERT INTO assignprojectstotl (project_id, project_name, team_leader, status, assigned_by)
                VALUES (%s, %s, %s, %s, %s)
            """
            cursor.execute(sql_query, (project_id, project_name, team_leader, status, assignedBy))
            conn.commit()

        return jsonify({'message': 'Project details saved successfully'})
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)})
    finally:
        if conn:
            conn.close()



@app.route('/get_project_details', methods=['GET'])
def get_project_details():
    conn = None
    try:
        first_name = session.get('first_name')
        print("First Name in get_assigned_projects:", first_name)
        
        conn = get_db_connection()
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM assignprojectstotl WHERE assigned_by =  %s", (first_name,))
            projects = cursor.fetchall()

        return jsonify({'projects': projects})
    except Exception as e:
        return jsonify({'error': str(e)})
    finally:
        if conn:
            conn.close()


@app.route('/get_assigned_projects', methods=['GET'])
def get_assigned_projects():
    conn = None
    try:
        first_name = session.get('first_name')
        print("First Name in get_assigned_projects:", first_name)

        conn = get_db_connection()
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM assignprojectstotl WHERE team_leader = %s", (first_name,))
            projects = cursor.fetchall()

        if projects:
            print("Projects for", first_name, ":", projects)
            return jsonify({'projects': projects})
        else:
            return jsonify({'message': f'No projects assigned for {first_name}'})
    except Exception as e:
        return jsonify({'error': str(e)})
    finally:
        if conn:
            conn.close()

@app.route('/assign_project_to_modeller', methods=['POST'])
def assign_project_to_modeller():
    conn = None
    try:
        # Retrieve form data (not JSON)
        project_id = request.form.get('ProjectID')
        project_name = request.form.get('ProjectName')
        file_name = request.form.get('fileName')
        task_description = request.form.get('task_description')
        modeller = request.form.get('modeller')
        deadline = request.form.get('deadline')
        assigned_by = session.get('first_name')
        status = request.form.get('projectStatus')

        # Retrieve file data
        file_checklist = request.files.get('file_checklist')
        upload_file = None

        if file_checklist:
            filename = secure_filename(file_checklist.filename)
            upload_path = os.path.join('uploads', filename)
            file_checklist.save(upload_path)
            upload_file = filename

        print("Form Data:", project_id, project_name, file_name, task_description, upload_file, modeller, deadline, assigned_by, status)

        # Check for missing fields
        if not all([project_id, project_name, file_name, task_description, upload_file, modeller, deadline, assigned_by, status]):
            print("Missing data fields")
            return jsonify({'error': 'All fields are required'}), 400

        conn = get_db_connection()
        with conn.cursor() as cursor:
            sql_query = """
                INSERT INTO assignprojectstomodellers (project_id, project_name, file_name, task_description, file_checklist, modeller, deadline, assigned_by, status)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            print("Executing SQL Query with:", (project_id, project_name, file_name, task_description, upload_file, modeller, deadline, assigned_by, status))
            cursor.execute(sql_query, (project_id, project_name, file_name, task_description, upload_file, modeller, deadline, assigned_by, status))
            conn.commit()

        return jsonify({'message': 'Project details saved successfully'})

    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': str(e)}), 500

    finally:
        if conn:
            conn.close()


@app.route('/file_checklist/<filename>')
def file_checklist(filename):
    try:
        # Ensure filename is safe and does not contain path traversal characters
        safe_filename = os.path.basename(filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], safe_filename)
        if os.path.isfile(file_path):
            return send_file(file_path)
        else:
            abort(404, description="File not found")
    except Exception as e:
        print(f"Error: {e}")
        abort(500)

@app.route('/fetch_assigned_projects', methods=['GET'])
def fetch_assigned_projects():
    conn = None
    try:
        first_name = session.get('first_name')
        print("First Name in get_assigned_projects:", first_name)

        conn = get_db_connection()
        with conn.cursor() as cursor:
            # Fetch data from the database
            cursor.execute("SELECT * FROM assignprojectstomodellers WHERE assigned_by = %s", (first_name,))
            data = cursor.fetchall()

        # Return the fetched data as JSON
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)})
    finally:
        if conn:
            conn.close()

@app.route('/get_assigned_projects_to_modeller', methods=['GET'])
def get_assigned_projects_to_modeller():
    conn = None
    try:
        first_name = session.get('first_name')
        print("First Name in get_assigned_projects:", first_name)

        conn = get_db_connection()
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM assignprojectstomodellers WHERE modeller = %s", (first_name,))
            projects = cursor.fetchall()

        if projects:
            print("Projects for", first_name, ":", projects)
            return jsonify({'projects': projects})
        else:
            return jsonify({'message': f'No projects assigned for {first_name}'})
    except Exception as e:
        return jsonify({'error': str(e)})
    finally:
        if conn:
            conn.close()
@app.route('/upload_completed_file', methods=['POST'])
def upload_completed_file():
    conn = None
    try:
        first_name = session.get('first_name')
        if 'file' not in request.files:
            return jsonify({'error': 'No file part in the request'}), 400
 
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected for uploading'}), 400
 
        if file:
            filename = secure_filename(file.filename)
            timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
            unique_filename = f"{timestamp}_{filename}"
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
            file.save(file_path)
 
            project_id = request.form['project_id']
            assigned_by = request.form['assigned_by']
            file_name = request.form['file_name']
 
            conn = get_db_connection()
            with conn.cursor() as cursor:
                # Update the existing record with new file path
                cursor.execute("""
                    UPDATE assignprojectstomodellers
                    SET status = %s, checklist = %s
                    WHERE project_id = %s AND file_name = %s
                """, ('Submitted', file_path, project_id, file_name))
                conn.commit()
 
            return jsonify({'message': 'File successfully uploaded'}), 200
 
    except Exception as e:
        import traceback
        error_message = traceback.format_exc()
        print(error_message)
        return jsonify({'error': str(e)}), 500
    finally:
        if conn:
            conn.close()
 

@app.route('/get_submitted_projects', methods=['GET'])
def get_submitted_projects():
    conn = None
    try:
        first_name = session.get('first_name')
        print("First Name in get_submitted_projects:", first_name)

        conn = get_db_connection()
        with conn.cursor() as cursor:
            cursor.execute("""
                SELECT * FROM assignprojectstomodellers 
                WHERE assigned_by = %s AND status = 'submitted'
            """, (first_name,))
            projects = cursor.fetchall()

        if projects:
            print("Submitted projects for", first_name, ":", projects)
            return jsonify({'projects': projects})
        else:
            return jsonify({'message': f'No submitted projects for {first_name}'})
    except Exception as e:
        return jsonify({'error': str(e)})
    finally:
        if conn:
            conn.close()

@app.route('/checklist/<filename>')
def checklist(filename):
    try:
        # Ensure filename is safe and does not contain path traversal characters
        safe_filename = os.path.basename(filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], safe_filename)
        if os.path.isfile(file_path):
            return send_file(file_path)
        else:
            abort(404, description="File not found")
    except Exception as e:
        print(f"Error: {e}")
        abort(500)


@app.route('/submit_files_to_qc', methods=['POST'])
def submit_files_to_qc():
    conn = None
    try:
        form = request.form
        proj_id = form.get('proj_ID')
        project = form.get('project')
        file = form.get('file')
        task_description = form.get('task_description')
        submitted_modeller = form.get('smodeller')
        qc_person = form.get('qc_person')
        assigned_by = session.get('first_name')
        manager = form.get('manager')
        additional_notes = form.get('additional_notes')

        # Handle file upload
        upload = request.files.get('upload')
        upload_file = None
        if upload:
            filename = secure_filename(upload.filename)
            upload_path = os.path.join('uploads', filename)
            upload.save(upload_path)
            upload_file = filename
        
        conn = get_db_connection()
        with conn.cursor() as cursor:
            sql_query = """
                INSERT INTO submitfilestoqc (proj_id, project, file, task_description, upload, submitted_modeller, qc_person, assigned_by, manager, additional_notes, submission_date, status)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, CURRENT_TIMESTAMP, 'QC')
            """
            cursor.execute(sql_query, (proj_id, project, file, task_description, upload_file, submitted_modeller, qc_person, assigned_by, manager, additional_notes))
            conn.commit()

        return jsonify({'message': 'Project details saved successfully'})
    except Exception as e:
        print('Error:', str(e))
        return jsonify({'error': str(e)})
    finally:
        if conn:
            conn.close()

@app.route('/upload/<filename>')
def upload(filename):
    try:
        # Ensure filename is safe and does not contain path traversal characters
        safe_filename = os.path.basename(filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], safe_filename)
        if os.path.isfile(file_path):
            return send_file(file_path)
        else:
            abort(404, description="File not found")
    except Exception as e:
        print(f"Error: {e}")
        abort(500)


            
@app.route('/get_qc_files', methods=['GET'])
def get_qc_files():
    try:
        first_name = session.get('first_name')
        print("First Name in get_qc_files:", first_name)

        conn = get_db_connection()
        with conn.cursor() as cursor:
            cursor.execute("""
                SELECT * FROM submitfilestoqc
                WHERE qc_person = %s
            """, (first_name,))
            files = cursor.fetchall()

        if files:
            print("Submitted files for", first_name, ":", files)
            return jsonify({'files': files})
        else:
            return jsonify({'message': f'No submitted files for {first_name}'})
    
    except Exception as e:
        return jsonify({'error': str(e)})
    
    finally:
        if conn:
            conn.close()


@app.route('/assign_score_and_qc_review/<int:submission_id>', methods=['POST'])
def assign_score_and_qc_review(submission_id):
    try:
        data = request.json
        score = data.get('score')
        qc_review = data.get('qc_review')

        conn = get_db_connection()
        with conn.cursor() as cursor:
            if score is not None:
                cursor.execute("""
                    UPDATE submitfilestoqc
                    SET score = %s
                    WHERE submission_id = %s
                """, (score, submission_id))

            if qc_review is not None:
                cursor.execute("""
                    UPDATE submitfilestoqc
                    SET QC_REVIEW = %s
                    WHERE submission_id = %s
                """, (qc_review, submission_id))

            conn.commit()

        return jsonify({'message': 'Score and QC review assigned successfully'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        conn.close()



@app.route('/upload_file', methods=['POST'])
def upload_photo():
    try:
        submission_id = request.form['submission_id']
        file = request.files['file']

        if file:
            filename = f"{submission_id}_{file.filename}"
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)

            conn = get_db_connection()
            with conn.cursor() as cursor:
                cursor.execute("""
                    UPDATE submitfilestoqc
                    SET upload_photo = %s
                    WHERE submission_id = %s
                """, (filename, submission_id))
                conn.commit()
            conn.close()

            return jsonify({'message': 'File uploaded successfully'})
        else:
            return jsonify({'error': 'No file uploaded'}), 400

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/qc_reports', methods=['GET'])  # Ensure the route matches the JS call
def get_qc_reports():
    conn = None
    try:
        first_name = session.get('first_name')
        print("First Name in get_qc_reports:", first_name)

        conn = get_db_connection()
        with conn.cursor() as cursor:
            cursor.execute("""
                SELECT * FROM submitfilestoqc
                WHERE assigned_by = %s
            """, (first_name,))
            result = cursor.fetchall()

        if result:
            print("QC reports for", first_name, ":", result)
            return jsonify({'files': result})
        else:
            return jsonify({'message': f'No QC reports for {first_name}'})
    
    except Exception as e:
        return jsonify({'error': str(e)})
    
    finally:
        if conn:
            conn.close()

            
            
@app.route('/submit_qc_report', methods=['POST'])
def submit_qc_report():
    request_data = request.get_json()
    selected_files = request_data.get('files', [])

    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            for file_details in selected_files:
                sql = """
                    INSERT INTO qc_reports (proj_id, project, file, task_description, submitted_modeller, qc_person, assigned_by, manager, additional_notes, score, qc_review, upload_photo, status)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,%s)
                """
                cursor.execute(sql, (
                    file_details['proj_id'],
                    file_details['project'],
                    file_details['file'],
                    file_details['task_description'],
                    file_details['submitted_modeller'],
                    file_details['qc_person'],
                    file_details['assigned_by'],
                    file_details['manager'],
                    file_details['additional_notes'],
                    file_details['score'],
                    file_details['qc_review'],
                    file_details['upload_photo'],
                    'submitted'
                ))
        connection.commit()
        return jsonify({'message': 'QC reports submitted successfully!'}), 200
    except Exception as e:
        connection.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        connection.close()

@app.route('/api/reports_data', methods=['GET'])
def get_reports_data():
    try:
        first_name = session.get('first_name')
        print("First Name in get_reports_data:", first_name)
 
        conn = get_db_connection()
        with conn.cursor() as cursor:
            query = "SELECT * FROM qc_reports WHERE manager = %s"
            cursor.execute(query, (first_name,))
            result = cursor.fetchall()
 
        if result:
            print("QC reports:", result)  # Optional: Debugging print
            return jsonify({'reports': result})
        else:
            return jsonify({'message': 'No QC reports found'})
 
    except Exception as e:
        return jsonify({'error': str(e)})
 
    finally:
        if conn:
            conn.close()
  
@app.route('/get_distinct_projects', methods=['GET'])
def get_distinct_projects():
    conn = None
    try:
        first_name = session.get('first_name')
        print("First Name in get_assigned_projects:", first_name)
        
        conn = get_db_connection()
        if conn is None:
            raise Exception("Failed to establish database connection")


        with conn.cursor() as cursor:
            query = """
                SELECT DISTINCT ProjectID, ProjectName, AssignedBy, TeamLeader, QCPerson
                FROM project_dashboard
                WHERE AssignedBy = %s
            """
            cursor.execute(query, (first_name,))
            projects = cursor.fetchall()
        return jsonify({'projects': projects}), 200

    except pymysql.Error as pymysql_err:
        print(f"PyMySQL Error: {pymysql_err}")
        return jsonify({'error': f"PyMySQL Error: {pymysql_err}"}), 500

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

    finally:
        if conn:
            conn.close()
            
@app.route('/get_status_details/<project_name>', methods=['GET'])
def get_status_details(project_name):
    conn = None
    try:
        conn = get_db_connection()
        if conn is None:
            raise Exception("Failed to establish database connection")

        with conn.cursor() as cursor:
            query = """
            SELECT 
    IFNULL(ProjectName, '-') AS ProjectName,
    IFNULL(Modeller, '-') AS Modeller,
    IFNULL(Filename, '-') AS Filename,
    IFNULL(Status, '-') AS Status,
    IFNULL(DateAssigned, '-') AS DateAssigned,
    IFNULL(SubmissionDate, '-') AS SubmissionDate,
    IFNULL(CompletionDate, '-') AS CompletionDate,
    IFNULL(Deadline, '-') AS Deadline,
    IFNULL(Score, '-') AS Score,
    IFNULL(QCReview, '-') AS QCReview,
    IFNULL(QCPerson, '-') AS QCPerson
FROM 
    project_status_view
WHERE 
    ProjectName = %s
ORDER BY 
    DateAssigned DESC;

            """
            cursor.execute(query, (project_name,))
            project_details = cursor.fetchall()

        return jsonify({'details': project_details}), 200

    except pymysql.Error as pymysql_err:
        print(f"PyMySQL Error: {pymysql_err}")
        return jsonify({'error': f"PyMySQL Error: {pymysql_err}"}), 500

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

    finally:
        if conn:
            conn.close()


@app.route('/get_tl_projects', methods=['GET'])
def get_tl_projects():
    conn = None
    try:
        conn = get_db_connection()
        if conn is None:
            raise Exception("Failed to establish database connection")

        # Get the logged-in user's first name from the session
        first_name = session.get('first_name')
        print("First Name in get_tl_projects:", first_name)

        with conn.cursor() as cursor:
            query = """
            SELECT DISTINCT ProjectID, ProjectName, AssignedBy, TeamLeader, QCPerson
            FROM project_dashboard
            WHERE TeamLeader = %s
            """
            cursor.execute(query, (first_name,))
            projects = cursor.fetchall()

        return jsonify({'projects': projects}), 200

    except pymysql.Error as pymysql_err:
        print(f"PyMySQL Error: {pymysql_err}")
        return jsonify({'error': f"PyMySQL Error: {pymysql_err}"}), 500

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

    finally:
        if conn:
            conn.close()

@app.route('/get_modeller_projects', methods=['GET'])
def get_modeller_projects():
    conn = None
    try:
        conn = get_db_connection()
        if conn is None:
            raise Exception("Failed to establish database connection")

        # Get the logged-in user's first name from the session
        first_name = session.get('first_name')
        print("First Name in get_tl_projects:", first_name)

        with conn.cursor() as cursor:
            query = """
            SELECT DISTINCT ProjectID, ProjectName, AssignedBy, TeamLeader, QCPerson
            FROM project_dashboard
            WHERE Modeller = %s
            """
            cursor.execute(query, (first_name,))
            projects = cursor.fetchall()

        return jsonify({'projects': projects}), 200

    except pymysql.Error as pymysql_err:
        print(f"PyMySQL Error: {pymysql_err}")
        return jsonify({'error': f"PyMySQL Error: {pymysql_err}"}), 500

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

    finally:
        if conn:
            conn.close()

@app.route('/get_qcdashboard_projects', methods=['GET'])
def get_qcdashboard_projects():
    conn = None
    try:
        conn = get_db_connection()
        if conn is None:
            raise Exception("Failed to establish database connection")

        # Get the logged-in user's first name from the session
        first_name = session.get('first_name')
        print("First Name in get_qcdashboard_projects:", first_name)

        with conn.cursor() as cursor:
            query = """
            SELECT DISTINCT ProjectID, ProjectName, AssignedBy, TeamLeader,QCPerson
            FROM project_dashboard
            WHERE QCPerson = %s
            """
            cursor.execute(query, (first_name,))
            projects = cursor.fetchall()

        return jsonify({'projects': projects}), 200

    except pymysql.Error as pymysql_err:
        print(f"PyMySQL Error: {pymysql_err}")
        return jsonify({'error': f"PyMySQL Error: {pymysql_err}"}), 500

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

    finally:
        if conn:
            conn.close()
            

@app.route('/modeller_performance_data', methods=['POST'])
def modeller_performance_data():
    full_name = request.json.get('ModellerFirstName')
    first_name = full_name.split(' ')[0]  # Extract the first name
    print(f"Received request for modeller: {first_name}")  # Log received first name
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            query = """
                SELECT ProjectName, Score, CompletionDate, ModellerFirstName
                FROM modeller_performance_view
                WHERE ModellerFirstName = %s
            """
            cursor.execute(query, (first_name,))
            data = cursor.fetchall()
            
            print(f"Fetched data: {data}")  # Log fetched data
            
            # Calculate additional performance metrics
            scores = [item['Score'] for item in data if item['Score'] is not None]
            avg_score = sum(scores) / len(scores) if scores else 0
            max_score = max(scores) if scores else 0
            min_score = min(scores) if scores else 0
            max_score_project = next((item['ProjectName'] for item in data if item['Score'] == max_score), "")
            min_score_project = next((item['ProjectName'] for item in data if item['Score'] == min_score), "")
            
            # Prepare data for chart
            chart_data = {
                'projects': [item['ProjectName'] for item in data],
                'scores': scores,
                'dates': [item['CompletionDate'] for item in data],
                'avg_score': avg_score,
                'max_score': max_score,
                'min_score': min_score,
                'max_score_project': max_score_project,
                'min_score_project': min_score_project

            }
            
            print(f"Chart data: {chart_data}")  # Log chart data
            
        return jsonify(chart_data)
    except Exception as e:
        print(f"Error: {str(e)}")  # Log error
        return str(e)
    finally:
        conn.close()
@app.route('/teamleader_performance_data', methods=['POST'])
def teamleader_performance_data():
    team_leader_name = request.json.get('TeamLeader')
    if not team_leader_name:
        return jsonify({'error': 'Missing or invalid Team Leader parameter'}), 400
    print("Team Leader Name:", team_leader_name)
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            query = """
                SELECT ProjectName, Score, ModellerName
                FROM teamleader_performance_view
                WHERE TeamLeader = %s;
            """
            print(f"Executing query: {query} with parameter: '{team_leader_name}'")
            cursor.execute(query, (team_leader_name,))
            data = cursor.fetchall()
            print(f"Fetched data: {data}")  # Log fetched data
 
            # Filter out any rows where Score is None
            filtered_data = [item for item in data if item['Score'] is not None]
 
            # Calculate additional performance metrics
            scores = [item['Score'] for item in filtered_data]
            max_score = max(scores) if scores else 0
            min_score = min(scores) if scores else 0
            max_score_project = next((item['ProjectName'] for item in filtered_data if item['Score'] == max_score), "")
            min_score_project = next((item['ProjectName'] for item in filtered_data if item['Score'] == min_score), "")
            max_score_modeller = next((item['ModellerName'] for item in filtered_data if item['Score'] == max_score), "")
            min_score_modeller = next((item['ModellerName'] for item in filtered_data if item['Score'] == min_score), "")
            # Prepare data for chart
            chart_data = {
                'projects': [f"{item['ProjectName']} - {item['ModellerName']}" for item in filtered_data],
                'scores': scores,
                'max_score': max_score,
                'min_score': min_score,
                'max_score_project': max_score_project,
                'min_score_project': min_score_project,
                'max_score_modeller': max_score_modeller,
                'min_score_modeller': min_score_modeller
            }
            print(f"Chart data: {chart_data}")  # Log chart data
        return jsonify(chart_data)
    except Exception as e:
        print(f"Error: {str(e)}")  # Log error
        return str(e), 500
    finally:
        conn.close()

#submit qc files get from project table
@app.route('/get-project-id', methods=['GET'])
def get_project_id():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT project_id FROM projects ORDER BY project_id ASC;")
    projects = cursor.fetchall()
    conn.close()
    return jsonify(projects)

@app.route('/get-manager', methods=['POST'])
def get_manager():
    proj_id = request.form.get('proj_ID')
    print(f'Received project ID: {proj_id}')  # Debug log
    if not proj_id:
        return jsonify({"error": "Project ID is required"}), 400

    try:
        # Connect to the database
        conn = get_db_connection()
        with conn.cursor() as cursor:  # Use dictionary=True to get results as dict
            query = "SELECT project_name, manager_name FROM projects WHERE project_id = %s"
            cursor.execute(query, (proj_id,))
            result = cursor.fetchone()
        
        print('Query result:', result)  # Debug log

        if result:
            return jsonify({"project_name": result['project_name'], "manager_name": result['manager_name']})
        else:
            return jsonify({"error": "No Manager Found"})
    except Exception as e:
        print(f"Database connection error: {e}")
        return jsonify({'error': str(e)})
    finally:
        if conn:
            conn.close()

@app.route('/get_team_leaders', methods=['GET'])
def get_team_leaders():
    try:
        conn = get_db_connection()
        with conn.cursor() as cursor:
            sql_query = """
                SELECT user_id, first_name FROM user_roles_view WHERE role_name = 'TeamLeader'  ORDER BY first_name ASC;
            """
            cursor.execute(sql_query)
            team_leaders = cursor.fetchall()
            return jsonify(team_leaders)
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)})
    finally:
        if conn:
            conn.close()


@app.route('/get-project-ids', methods=['GET'])
def get_project_ids():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='root',
            password='Hay49056',
            database='dec19'
        )
        cursor = connection.cursor()
        cursor.execute("SELECT project_id, project_name FROM projects ORDER BY project_id ASC;")
        projects = cursor.fetchall()
        cursor.close()
        connection.close()
        
        project_data = [{'id': row[0], 'name': row[1]} for row in projects]
        return jsonify({'projects': project_data})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/get-tlassignproject-ids', methods=['GET'])
def get_tlassignproject_ids():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='root',
            password='Hay49056',
            database='dec19'
        )
        cursor = connection.cursor()
        cursor.execute("SELECT project_id, project_name FROM projects ORDER BY project_id ASC;")
        projects = cursor.fetchall()
        
        project_data = [{'id': row[0], 'name': row[1]} for row in projects]

        cursor.close()
        connection.close()
        
        return jsonify({'projects': project_data})
    except Exception as e:
        return jsonify({'error': str(e)}), 500



@app.route('/Modellers', methods=['GET'])
def Modellers():
    try:
        conn = get_db_connection()
        with conn.cursor() as cursor:
            sql_query = """
                SELECT user_id, first_name FROM user_roles_view WHERE role_name = 'Modeller'  ORDER BY first_name ASC;
            """
            cursor.execute(sql_query)
            Modeller = cursor.fetchall()
            return jsonify(Modeller)
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)})
    finally:
        if conn:
            conn.close()


@app.route('/SubmitModellers', methods=['GET'])
def SubmitModellers():
    try:
        conn = get_db_connection()
        with conn.cursor() as cursor:
            sql_query = """
                SELECT user_id, first_name 
                FROM user_roles_view 
                WHERE role_name = 'Modeller'  
                ORDER BY first_name ASC;
            """
            cursor.execute(sql_query)
            modellers = cursor.fetchall()
            return jsonify(modellers)
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)})
    finally:
        if conn:
            conn.close()
@app.route('/get-qc-persons', methods=['GET'])
def get_qc_persons():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT first_name FROM user_roles_view WHERE role_name = 'QC'")
    qc_persons = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(qc_persons)          
@app.route('/logout') 
def logout():
   session.clear() 
   # Redirect to the login page 
   return redirect('/')



@app.route('/save', methods=['POST'])
def save_project():
    project_id = request.form['project_id']  # Project ID as string
    project_name = request.form['project_name']
    manager_name = request.form['manager_name']

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO projects (project_id, project_name, manager_name)
        VALUES (%s, %s, %s)
    """, (project_id, project_name, manager_name))
    conn.commit()
    cursor.close()
    conn.close()
   
# Route to delete a project using project_id (which is a string)
@app.route('/delete/<string:project_id>')
def delete_project(project_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM projects WHERE project_id = %s", (project_id,))
    conn.commit()
    cursor.close()
    conn.close()
    

@app.route('/view')
def view():
    return render_template('blank.html')

if __name__ == '__main__':
    # Run the app with debug mode enabled and dynamic port selection
    app.run(debug=True, port=9300)
