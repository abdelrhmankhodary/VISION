import numpy as np
import cv2


class Pupil:
    """
    This class detects the iris of an eye and estimates
    the position of the pupil
    """

    def __init__(self, eye_frame, threshold=30):
        self.iris_frame = None
        self.threshold = threshold
        self.x = None
        self.y = None

        self.detect_iris(eye_frame)

    @staticmethod
    def image_processing(eye_frame, threshold):
        """Performs operations on the eye frame to isolate the iris

        Arguments:
            eye_frame (numpy.ndarray): Frame containing an eye and nothing else
            threshold (int): Threshold value used to binarize the eye frame

        Returns:
            A frame with a single element representing the iris
        """
        kernel = np.ones((3, 3), np.uint8)
        
        # Step 1: Noise reduction using bilateral filter
        processed_frame = cv2.bilateralFilter(eye_frame, 10, 15, 15)
        
        # Step 2: Use adaptive thresholding for better performance under varying lighting
        processed_frame = cv2.adaptiveThreshold(processed_frame, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)
        
        # Step 3: Morphological operations to clean up the image
        processed_frame = cv2.erode(processed_frame, kernel, iterations=2)
        processed_frame = cv2.dilate(processed_frame, kernel, iterations=2)
        
        return processed_frame

    def detect_iris(self, eye_frame):
        """Detects the iris and estimates the position of the iris by
        calculating the centroid.

        Arguments:
            eye_frame (numpy.ndarray): Frame containing an eye and nothing else
        """
        self.iris_frame = self.image_processing(eye_frame, self.threshold)

        contours, _ = cv2.findContours(self.iris_frame, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)[-2:]
        
        # Filter out small contours
        min_contour_area = 100
        contours = [contour for contour in contours if cv2.contourArea(contour) > min_contour_area]
        contours = sorted(contours, key=cv2.contourArea, reverse=True)

        if len(contours) >= 1:
            try:
                # Select the largest contour
                largest_contour = contours[0]
                moments = cv2.moments(largest_contour)
                self.x = int(moments['m10'] / moments['m00'])
                self.y = int(moments['m01'] / moments['m00'])
            except (IndexError, ZeroDivisionError):
                self.x = None
                self.y = None
        else:
            self.x = None
            self.y = None


def main():
    webcam = cv2.VideoCapture(0)
    webcam.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
    webcam.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

    if not webcam.isOpened():
        print("Error: Could not open webcam.")
        return

    while True:
        ret, frame = webcam.read()
        
        if not ret:
            print("Error: Failed to capture image.")
            break

        # Convert the frame to grayscale
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Define the region of interest (ROI) for the eye
        eye_frame = gray_frame[200:400, 500:800]  # This is an example, adjust as necessary

        pupil = Pupil(eye_frame, threshold=30)

        if pupil.x is not None and pupil.y is not None:
            eye_center_x = (eye_frame.shape[1] // 2)
            
            if pupil.x < eye_center_x - 30:
                gaze_direction = "Looking left"
            elif pupil.x > eye_center_x + 30:
                gaze_direction = "Looking right"
            else:
                gaze_direction = "Looking center"

            cv2.putText(frame, gaze_direction, (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
        
        # Display the original frame with the gaze direction
        cv2.imshow("Gaze Tracking", frame)

        if cv2.waitKey(1) == 27:
            break

    webcam.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()
