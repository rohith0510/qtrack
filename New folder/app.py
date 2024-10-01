from flask import Flask, request, render_template, redirect, url_for, session
import random
import string
import win32com.client as win32
import pythoncom

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Change this to a secure key

def generate_otp(length=6):
    """Generate a random OTP of specified length."""
    characters = string.digits
    otp = ''.join(random.choice(characters) for _ in range(length))
    return otp

def get_outlook_application():
    """Get the Outlook application instance."""
    try:
        outlook = win32.Dispatch('outlook.application')
        return outlook
    except Exception as e:
        print(f"Failed to get Outlook application: {e}")
        return None

def send_otp_via_outlook(outlook, sender_email, receiver_email, otp):
    """Send the OTP via Outlook."""
    try:
        pythoncom.CoInitialize()  # Initialize the COM library
        mail = outlook.CreateItem(0)  # Create a new email item
        mail.Subject = 'Your One-Time Password (OTP)'
        mail.Body = f'Your OTP is: {otp}'
        mail.To = receiver_email
        mail.Send()  # Send the email
        print(f'OTP sent to {receiver_email} from {sender_email}')
    except Exception as e:
        print(f"Failed to send OTP: {e}")
    finally:
        pythoncom.CoUninitialize()  # Uninitialize the COM library

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/send_otp', methods=['POST'])
def send_otp():
    user_email = request.form['email']
    otp = generate_otp()

    # Store OTP in session with expiration time
    session['otp'] = otp
    session['otp_expiry'] = time.time() + 300  # OTP valid for 5 minutes

    # Send OTP via Outlook
    outlook = get_outlook_application()
    if outlook:
        send_otp_via_outlook(outlook, 'your_email@example.com', user_email, otp)
    else:
        return "Failed to initialize Outlook application."

    return redirect(url_for('verify_otp'))

@app.route('/verify_otp', methods=['GET', 'POST'])
def verify_otp():
    if request.method == 'POST':
        user_otp = request.form['otp']
        stored_otp = session.get('otp')
        expiry = session.get('otp_expiry')

        if stored_otp and time.time() < expiry and user_otp == stored_otp:
            return "OTP Verified Successfully!"
        else:
            return "Invalid or Expired OTP"

    return render_template('verify_otp.html')

if __name__ == '__main__':
    app.run(debug=True)
