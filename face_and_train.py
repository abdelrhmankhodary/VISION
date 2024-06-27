import cv2
import os
import numpy as np
from PIL import Image

# Paths and constants
cascade_path = "C:\\Users\\Mohmed Abo Maden\\haarcascade_frontalface_alt2.xml"
last_user_id_file = "C:\\Users\\Mohmed Abo Maden\\last_user_id.txt"
output_directory = "C:\\Users\\Mohmed Abo Maden\\output"
captured_faces_txt_path = os.path.join(output_directory, "captured_faces.txt")
training_output_path = 'C:\\Users\\Mohmed Abo Maden\\output yml\\trainer.yml'
training_cascade_path = "C:\\Users\\Mohmed Abo Maden\\haarcascade_frontalface_alt2.xml"

# Initialize the cascade classifier for face detection
face_detector = cv2.CascadeClassifier(cascade_path)
training_detector = cv2.CascadeClassifier(training_cascade_path)

# Function to get the next user ID
def get_next_user_id():
    if os.path.exists(last_user_id_file):
        with open(last_user_id_file, 'r') as file:
            content = file.read().strip()
            if content:  # Check if the file is not empty
                last_user_id = int(content)
            else:
                last_user_id = -1  # Initialize to -1 so first ID is 0
    else:
        last_user_id = -1  # Initialize to -1 so first ID is 0

    next_user_id = last_user_id + 1

    with open(last_user_id_file, 'w') as file:
        file.write(str(next_user_id))

    return next_user_id

# Capture faces and save them
def capture_faces():
    face_id = get_next_user_id()
    cam = cv2.VideoCapture(0)
    cam.set(3, 640)  # set video width
    cam.set(4, 480)  # set video height

    print("\n [INFO] Initializing face capture. Look at the camera and wait ...")
    count = 0

    with open(captured_faces_txt_path, "a") as captured_faces_file:
        while True:
            ret, img = cam.read()
            if not ret:
                print("[ERROR] Failed to capture image from camera.")
                break
            img = cv2.flip(img, 1)  # flip video image vertically
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            faces = face_detector.detectMultiScale(gray, 1.3, 5)

            for (x, y, w, h) in faces:
                cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)
                count += 1

                # Save the captured image
                img_path = os.path.join(output_directory, f"User.{face_id}.{count}.jpg")
                cv2.imwrite(img_path, gray[y:y+h, x:x+w])

                # Write the image path to the captured_faces.txt file
                captured_faces_file.write(img_path + "\n")
                print(f"[INFO] Captured {count} images for user ID {face_id}")

                cv2.imshow('image', img)

            k = cv2.waitKey(100) & 0xff  # Press 'ESC' for exiting video
            if k == 27:
                break
            elif count >= 30:  # Take 30 face samples and stop video
                break

    print("\n [INFO] Exiting Program and cleanup stuff")
    cam.release()
    cv2.destroyAllWindows()

# Train the face recognizer model
def train_model():
    recognizer = cv2.face.LBPHFaceRecognizer_create()

    # Function to get the images and label data
    def getImagesAndLabels(file_path):
        with open(file_path, 'r') as file:
            lines = file.readlines()

        faceSamples = []
        ids = []

        for line in lines:
            img_path = line.strip()  # remove leading/trailing whitespaces
            if not os.path.exists(img_path):
                print(f"[ERROR] Image path {img_path} does not exist.")
                continue
            PIL_img = Image.open(img_path).convert('L')  # convert it to grayscale
            img_numpy = np.array(PIL_img, 'uint8')

            faces = training_detector.detectMultiScale(img_numpy)

            for (x, y, w, h) in faces:
                faceSamples.append(img_numpy[y:y + h, x:x + w])
                ids.append(int(os.path.split(img_path)[-1].split(".")[1]))

        return faceSamples, ids

    print("\n [INFO] Training faces. It will take a few seconds. Wait ...")
    faces, ids = getImagesAndLabels(captured_faces_txt_path)

    # Print information about the loaded faces and IDs
    print(f"Faces: {len(faces)}, Unique IDs: {len(np.unique(ids))}")

    # Check if there are enough samples for training
    if len(np.unique(ids)) < 1:
        print("Error: Not enough unique IDs to train the model. You need at least one user.")
    else:
        # Train the model
        recognizer.train(faces, np.array(ids))
        recognizer.write(training_output_path)  # Save the model

        print("\n [INFO] Model trained successfully. Exiting Program")

    # Close all OpenCV windows
    cv2.destroyAllWindows()

# Main function to run the entire process
def main():
    print("\n [INFO] Starting face capture process...")
    capture_faces()
    print("\n [INFO] Starting training process...")
    train_model()

if __name__ == "__main__":
    main()