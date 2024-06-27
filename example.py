import cv2
from gaze_tracking import GazeTracking

# Initialize the GazeTracking object
gaze = GazeTracking()

# Open the webcam and set higher resolution
webcam = cv2.VideoCapture(0)
webcam.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
webcam.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

# Check if the webcam is opened correctly
if not webcam.isOpened():
    print("Error: Could not open webcam.")
    exit()

while True:
    # Capture frame-by-frame
    ret, frame = webcam.read()
    
    if not ret:
        print("Error: Failed to capture image.")
        break

    # Send the frame to GazeTracking to analyze it
    gaze.refresh(frame)
    
    # Get the annotated frame
    frame = gaze.annotated_frame()
    text = ""

    if gaze.is_blinking():
        text = "Blinking"
    elif gaze.is_right():
        text = "Looking right"
    elif gaze.is_left():
        text = "Looking left"
    elif gaze.is_center():
        text = "Looking center"

    # Add the text on the frame
    cv2.putText(frame, text, (90, 60), cv2.FONT_HERSHEY_DUPLEX, 1.6, (147, 58, 31), 2)

    # Get pupil coordinates
    left_pupil = gaze.pupil_left_coords()
    right_pupil = gaze.pupil_right_coords()

    # Add the pupil coordinates on the frame
    cv2.putText(frame, "Left pupil:  " + str(left_pupil), (90, 130), cv2.FONT_HERSHEY_DUPLEX, 0.9, (147, 58, 31), 1)
    cv2.putText(frame, "Right pupil: " + str(right_pupil), (90, 165), cv2.FONT_HERSHEY_DUPLEX, 0.9, (147, 58, 31), 1)

    # Display the resulting frame
    cv2.imshow("Demo", frame)

    # Exit the loop when 'ESC' key is pressed
    if cv2.waitKey(1) == 27:
        break

# Release the webcam and close windows
webcam.release()
cv2.destroyAllWindows()
