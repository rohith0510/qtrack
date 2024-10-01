from flask import Flask
from login import login_blueprint

app = Flask(__name__)

# Register the login blueprint
app.register_blueprint(login_blueprint)

if __name__ == '__main__':
    app.run(debug=True)