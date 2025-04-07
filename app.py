from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/submit_contact', methods=['POST'])
def submit_contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')

        print(f"Name: {name}")
        print(f"Email: {email}")
        print(f"Message: {message}")

        # In a real application, you would process the data here,
        # for example, by sending an email.

        return jsonify({'status': 'success', 'message': 'Message received!'})
    else:
        return jsonify({'status': 'error', 'message': 'Invalid request method.'})

if __name__ == '__main__':
    app.run(debug=True) # Only use debug=True during development