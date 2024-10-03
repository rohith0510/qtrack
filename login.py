from flask import Flask, render_template, request, redirect, url_for,jsonify
from datetime import datetime
import os
import pymysql

app = Flask(__name__)

# MySQL configuration
DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = 'Hay49056'
DB_NAME = 'dec19'

# Connect to MySQL database
conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, database=DB_NAME,
                       cursorclass=pymysql.cursors.DictCursor)
# Configure upload folder
app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, 'uploads')

# Ensure upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
# Route for displaying user list
# Route for displaying user list
# Route for processing form submission

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')  # Retrieve email from the form
        password = request.form.get('password')

        print("Email entered:", email)  # Add this line for debugging

        # Query the database to fetch username, role, and photo_filename based on email
        with conn.cursor() as cursor:
            cursor.execute("SELECT first_name, role, photo_filename FROM users WHERE email = %s", (email,))
            user = cursor.fetchone()


        print("User found:", user)  # Add this line for debugging

        if user:
            role = user['role']
            first_name = user['first_name']
            photo_filename = user['photo_filename']  # Retrieve photo filename
            # Assuming you have an authentication mechanism for password validation
            # Add authentication logic here if needed

            # Redirect to user_list route after successful login, passing the username, role, and photo_filename as query parameters
            return redirect(url_for('user_list', first_name=first_name, role=role, photo_filename=photo_filename))
        else:
            # Handle case when user is not found
            return "User not found!"

    # If request method is GET, render the login form
    return render_template('login.html')


@app.route('/user_list')
def user_list():
    try:
        # Fetch sorting parameter from request (if any)
        sort_by = request.args.get('sort_by', 'user_id')  # Default sorting by user_id

        # Construct SQL query to fetch sorted data from the user table
        with conn.cursor() as cursor:
            cursor.execute(f"SELECT * FROM users ORDER BY {sort_by}")
            users = cursor.fetchall()

        # Count the number of users for each role
        role_counts = {}
        for user in users:
            role_name = user['role']  # Assuming 'role' is the column name for role in the users table
            if role_name in role_counts:
                role_counts[role_name] += 1
            else:
                role_counts[role_name] = 1

        # Get first_name and role from the query parameters
        first_name = request.args.get('first_name')
        role = request.args.get('role')
        photo_filename = request.args.get('photo_filename')

        # Render HTML template with sorted data, role counts, first_name, and role
        return render_template('admin.html', users=users, role_counts=role_counts, first_name=first_name, role=role, photo_filename=photo_filename)
    except Exception as e:
        # Handle exceptions (e.g., database connection error)
        return jsonify({'error': str(e)})

new_user_added = False  # Initialize flag



@app.route('/accountsettings', methods=['POST'])
def account_settings():
    try:
        # Get form data
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        email = request.form.get('email')
        role = request.form.get('Role')
        phone_number = request.form.get('phone_number')
        project = request.form.get('project')
        status = request.form.get('Status')  # Retrieve 'Status' dropdown value
        state_file = request.files['state_file']
        photo_file = request.files['photo']

        # Check if status field is provided
        if status is None or status.strip() == '':
            raise ValueError("Status field is required")

        # Print form data for debugging
        print("Form Data:", first_name, last_name, email, role, phone_number, project, status, state_file.filename, photo_file.filename)

        # Save form data to database
        with conn.cursor() as cursor:
            sql_query = "INSERT INTO users (first_name, last_name, email, role, phone_number, project, status, state_file, photo_filename) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"

            cursor.execute(sql_query, (first_name, last_name, email, role, phone_number, project, status, state_file.filename, photo_file.filename))
            conn.commit()

        # Save state file to server in the static folder
        state_file_path = os.path.join(app.root_path, 'static', 'uploads', state_file.filename)
        state_file.save(state_file_path)

        # Save photo file to server in the static folder
        photo_file_path = os.path.join(app.root_path, 'static', 'uploads', photo_file.filename)
        photo_file.save(photo_file_path)

        # Return success message
        return jsonify({'message': 'Account details saved successfully'})
    except Exception as e:
        error_message = "Error saving account details: {}".format(str(e))
        print(error_message)
        return jsonify({'error': error_message})


@app.route('/view')
def view():
    return render_template('admin.html')


if __name__ == '__main__':
    # Run the app with debug mode enabled and dynamic port selection
    port = app.run(debug=True, port=0)
    print(f"Server running on port {port}")
