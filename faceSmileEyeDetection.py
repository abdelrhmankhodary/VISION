import numpy as np
import cv2

# Load Haar Cascade classifiers
faceCascade = cv2.CascadeClassifier("C:\\Users\\Mohmed Abo Maden\\Cascades\\haarcascade_frontalface_default.xml")
eyeCascade = cv2.CascadeClassifier("C:\\Users\\Mohmed Abo Maden\\Cascades\\haarcascade_eye_tree_eyeglasses.xml")
smileCascade = cv2.CascadeClassifier("C:\\Users\\Mohmed Abo Maden\\Cascades\\haarcascade_smile.xml")

cap = cv2.VideoCapture(0)
cap.set(3, 1280)  # set Width
cap.set(4, 720)   # set Height22
while True:
    ret, img = cap.read()
    img = cv2.flip(img, 1)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    faces = faceCascade.detectMultiScale(
        gray,
        scaleFactor=1.3,
        minNeighbors=5,
        minSize=(30, 30)
    )

    for (x, y, w, h) in faces:
        cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)
        roi_gray = gray[y:y+h, x:x+w]
        roi_color = img[y:y+h, x:x+w]

        smiles = smileCascade.detectMultiScale(
            roi_gray,
            scaleFactor=1.8,
            minNeighbors=20,
            minSize=(25, 25),
        )

        for (xx, yy, ww, hh) in smiles:
            cv2.rectangle(roi_color, (xx, yy), (xx + ww, yy + hh), (0, 255, 0), 2)
            # Display "Smile Detected" message
            cv2.putText(roi_color, 'Smile', (xx, yy - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

        # Display "Face Detected" message

    cv2.imshow('video', img)

    k = cv2.waitKey(30) & 0xff
    if k == 27:  # press 'ESC' to quit
        break

cap.release()
cv2.destroyAllWindows()
