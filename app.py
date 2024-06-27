from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import cv2
import numpy as np
import subprocess
# import logging
# import face_recognition as fr





app = Flask(__name__)
app.secret_key = 'your_secret_key'

users = {'Mohamed': '123', 'abdokhodary': '123123'}

@app.route('/')
def home():
    return render_template('home.html')



@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if username in users:
            error = 'Username already exists!'
            return render_template('signup.html', error=error)
        users[username] = password
        session['username'] = username
        
        # Run the Python script
        try:
            result = subprocess.check_output(['python', 'face_and_train.py'], stderr=subprocess.STDOUT, universal_newlines=True)
        except subprocess.CalledProcessError as e:
            result = e.output
        return render_template('result.html', result=result)
    
    return render_template('signup.html')





@app.route('/signin', methods=['GET', 'POST'])
def signin():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if username not in users or users[username] != password:
            error = 'Invalid credentials!'
            return render_template('signin.html', error=error)
        session['username'] = username
        return redirect(url_for('user_page'))
    return render_template('signin.html')




@app.route('/reset_password', methods=['GET', 'POST'])
def reset_password():
    if request.method == 'POST':
        username = request.form.get('username')
        new_password = request.form.get('new_password')
        if username not in users:
            error = 'Username does not exist!'
            return render_template('reset_password.html', error=error)
        users[username] = new_password
        return redirect(url_for('signin'))
    return render_template('reset_password.html')

@app.route('/user', methods=['GET', 'POST'])
def user_page():
    if 'username' not in session:
        return redirect(url_for('signin'))
    username = session['username']
    return render_template('user.html', username=username)

@app.route('/settings', methods=['GET', 'POST'])
def settings():
    if 'username' not in session:
        return redirect(url_for('signin'))
    username = session['username']
    return render_template('settings.html', username=username)

@app.route('/meetings', methods=['GET', 'POST'])
def meetings():
    if 'username' not in session:
        return redirect(url_for('signin'))
    username = session['username']
    return render_template('meetings.html', username=username)



@app.route('/account', methods=['GET', 'POST'])
def account():
    if 'username' not in session:
        return redirect(url_for('signin'))
    username = session['username']
    return render_template('account.html', username=username)




@app.route('/creat_meeting', methods=['GET', 'POST'])
def creat_meeting():
    if 'username' not in session:
        return redirect(url_for('signin'))
    return render_template('creat_meeting.html')

@app.route('/uploading_meeting', methods=['GET', 'POST'])
def uploading_meeting():
    if 'username' not in session:
        return redirect(url_for('signin'))
    return render_template('uploading_meeting.html')

@app.route('/previous', methods=['GET', 'POST'])
def previous():
    if 'username' not in session:
        return redirect(url_for('signin'))
    return render_template('previous.html')

@app.route('/brodecast', methods=['GET', 'POST'])
def brodecast():
    if 'username' not in session:
        return redirect(url_for('signin'))
    return render_template('brodecast.html')

@app.route('/schdual', methods=['GET', 'POST'])
def schdual():
    if 'username' not in session:
        return redirect(url_for('signin'))
    username = session['username']
    return render_template('schdual.html', username=username)



@app.route('/join', methods=['GET', 'POST'])
def join():
    if 'username' not in session:
        return redirect(url_for('signin'))
    username = session['username']
    return render_template('join.html', username=username)
        



@app.route('/face_recognition')
def face_recognition():
    try:
        result = subprocess.check_output(['python', 'face_recognition.py'], stderr=subprocess.STDOUT, universal_newlines=True)
    except subprocess.CalledProcessError as e:
        result = e.output
    return jsonify({'result': result})

@app.route('/example')
def example():
    try:
        result = subprocess.check_output(['python', 'example.py'], stderr=subprocess.STDOUT, universal_newlines=True)
    except subprocess.CalledProcessError as e:
        result = e.output
    return jsonify({'result': result})

@app.route('/mouth_open_detect')
def mouth_open_detect():
    try:
        result = subprocess.check_output(['python', 'mouth_open_detect.py'], stderr=subprocess.STDOUT, universal_newlines=True)
    except subprocess.CalledProcessError as e:
        result = e.output
    return jsonify({'result': result})

@app.route('/faceSmileEyeDetection')
def faceSmileEyeDetection():
    try:
        result = subprocess.check_output(['python', 'faceSmileEyeDetection.py'], stderr=subprocess.STDOUT, universal_newlines=True)
    except subprocess.CalledProcessError as e:
        result = e.output
    return jsonify({'result': result})


@app.route('/home', methods=['GET', 'POST'])
def home1():
    if 'username' not in session:
        return redirect(url_for('signin'))
    return render_template('home.html')

# Add a new route for face verification
@app.route('/verify_face', methods=['POST'])
def verify_face():
    username = session.get('username')
    if not username:
        return jsonify({'success': False, 'message': 'User not logged in'}), 401

    try:
        # Capture the image from the request
        file = request.files['image']
        img_array = np.frombuffer(file.read(), np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

        # Convert the image to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        # Load the recognizer and face cascade
        recognizer = cv2.face.LBPHFaceRecognizer_create()
        recognizer.read('C:\\Users\\Mohmed Abo Maden\\output yml\\trainer.yml')
        faceCascade = cv2.CascadeClassifier('C:\\Users\\Mohmed Abo Maden\\haarcascade_frontalface_alt2.xml')

        # Detect faces
        faces = faceCascade.detectMultiScale(gray, scaleFactor=1.2, minNeighbors=5)

        for (x, y, w, h) in faces:
            id, confidence = recognizer.predict(gray[y:y+h, x:x+w])
            if confidence < 100:
                return jsonify({'success': True})

        return jsonify({'success': False, 'message': 'Face not recognized'}), 401

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500
    
#     # >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



# MEETING_ID = '12345'
# MEETING_PASSWORD = '123!'

# @app.route('/verify_face', methods=['POST'])
# def verify_face():
#     username = session.get('username')
#     if not username:
#         return jsonify({'success': False, 'message': 'User not logged in'}), 401

#     try:
#         # Capture the image from the request
#         file = request.files['image']
#         img_array = np.frombuffer(file.read(), np.uint8)
#         img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
        
#         if img is None:
#             raise ValueError("Invalid image format")

#         # Load the face encodings of the stored image
#         stored_image_path = 'E:/test/static/images/User.3.29.jpg'  # Update this with the correct path
#         stored_image = face_recognition.load_image_file(stored_image_path)
#         stored_image_encodings = face_recognition.face_encodings(stored_image)

#         if len(stored_image_encodings) == 0:
#             raise ValueError(f"No faces found in the stored image: {stored_image_path}")

#         stored_image_encoding = stored_image_encodings[0]
#         print(f"Stored image encoding: {stored_image_encoding}")

#         # Process the current image
#         current_image = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#         current_image_encodings = face_recognition.face_encodings(current_image)

#         if len(current_image_encodings) == 0:
#             return jsonify({'success': False, 'message': 'No face detected in the image'}), 400

#         current_image_encoding = current_image_encodings[0]
#         print(f"Current image encoding: {current_image_encoding}")

#         # Compare the face encodings
#         results = face_recognition.compare_faces([stored_image_encoding], current_image_encoding)
#         distance = face_recognition.face_distance([stored_image_encoding], current_image_encoding)[0]
#         print(f"Face distance: {distance}")

#         if results[0]:
#             session['face_verified'] = True
#             print("Face verification successful")
#             return jsonify({'success': True, 'message': 'Face recognized'})
#         else:
#             print("Face verification failed")
#             return jsonify({'success': False, 'message': 'Face not recognized'}), 401

#     except Exception as e:
#         print(f"Error: {e}")
#         return jsonify({'success': False, 'message': str(e)}), 500

# @app.route('/verify_meeting', methods=['POST'])
# def verify_meeting():
#     data = request.json
#     meeting_id = data.get('meeting_id')
#     meeting_password = data.get('meeting_password')

#     if meeting_id == MEETING_ID and meeting_password == MEETING_PASSWORD:
#         session['meeting_verified'] = True
#         return jsonify({'success': True, 'message': 'Meeting credentials verified'})
#     else:
#         return jsonify({'success': False, 'message': 'Invalid meeting ID or password'}), 401
#     <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

if __name__ == '__main__':
    app.run(debug=True)
