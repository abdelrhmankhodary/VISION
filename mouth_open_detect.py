import cv2
import numpy as np
import dlib
import time

# Load the pre-trained facial landmark detector
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("C:\\Users\\Mohmed Abo Maden\\shape_predictor_68_face_landmarks.dat")  # Path to the pre-trained model

# Function to compute the Euclidean distance between two points
def euclidean_distance(point1, point2):
    return np.linalg.norm(point1 - point2)

# Function to detect mouth opening
def detect_mouth_open(face_landmarks, d_outer, d_inner):
    # Define the indices of the mouth landmarks
    outer_points = [[49, 59], [50, 58], [51, 57], [52, 56], [53, 55]]
    inner_points = [[61, 67], [62, 66], [63, 65]]
    
    cnt_outer = 0
    cnt_inner = 0
    
    for i, (p1, p2) in enumerate(outer_points):
        if d_outer[i] + 3 < face_landmarks.part(p2).y - face_landmarks.part(p1).y:
            cnt_outer += 1 
    for i, (p1, p2) in enumerate(inner_points):
        if d_inner[i] + 2 < face_landmarks.part(p2).y - face_landmarks.part(p1).y:
            cnt_inner += 1
    
    return cnt_outer > 3 and cnt_inner > 2

# Function to get mouth distances
def get_mouth_distances(face_landmarks):
    outer_points = [[49, 59], [50, 58], [51, 57], [52, 56], [53, 55]]
    inner_points = [[61, 67], [62, 66], [63, 65]]
    
    d_outer = [0]*5
    d_inner = [0]*3
    
    for i, (p1, p2) in enumerate(outer_points):
        d_outer[i] += face_landmarks.part(p2).y - face_landmarks.part(p1).y
    for i, (p1, p2) in enumerate(inner_points):
        d_inner[i] += face_landmarks.part(p2).y - face_landmarks.part(p1).y
    
    return d_outer, d_inner

# Main function
def main():
    # Wait for 3 seconds
    time.sleep(3)
    
    # Open the webcam
    cap = cv2.VideoCapture(0)
    d_outer = None
    d_inner = None
    font = cv2.FONT_HERSHEY_SIMPLEX

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = detector(gray)

        for face in faces:
            landmarks = predictor(gray, face)
            if d_outer is None or d_inner is None:
                cv2.putText(frame, 'Press R to record Mouth distances', (30, 30), font, 1, (0, 255, 255), 2)
            else:
                mouth_open = detect_mouth_open(landmarks, d_outer, d_inner)
                if mouth_open:
                    cv2.putText(frame, 'Mouth Open', (30, 30), font, 1, (0, 255, 255), 2)
                else:
                    cv2.putText(frame, 'Mouth Closed', (30, 30), font, 1, (0, 255, 255), 2)

            # Draw the landmarks on the face
            for i in range(48, 68):
                x, y = landmarks.part(i).x, landmarks.part(i).y
                cv2.circle(frame, (x, y), 1, (0, 255, 0), -1)

        cv2.imshow('Face Landmarks Detection', frame)

        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break
        elif len(faces) > 0:
            if d_outer is None or d_inner is None:
                # Set the baseline distance for the mouth closed state
                d_outer, d_inner = get_mouth_distances(landmarks)
                d_outer[:] = [x / 100 for x in d_outer]
                d_inner[:] = [x / 100 for x in d_inner]

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()



#E:\\yoan\\yoan\\\shape_predictor_68_face_landmarks.dat