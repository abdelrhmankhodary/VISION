const predefinedMeetingId = "12345";
        const predefinedMeetingPassword = "password";

        // Function to verify face
        async function verifyFace(image) {
            const formData = new FormData();
            formData.append('image', image);

            const response = await fetch('/verify_face', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            return result.success;
        }

        // Function to join meeting by ID and password
        async function joinMeeting(event) {
            event.preventDefault();

            const meetingId = document.getElementById('meetingId').value.trim();
            const meetingPassword = document.getElementById('meetingPassword').value.trim();

            // Verify meeting ID and password
            if (meetingId !== predefinedMeetingId || meetingPassword !== predefinedMeetingPassword) {
                alert('Invalid meeting ID or password');
                return;
            }

            // Capture an image from the user's webcam for face verification
            const video = document.createElement('video');
            video.width = 640;
            video.height = 480;

            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;

            await new Promise((resolve) => {
                video.onloadedmetadata = () => {
                    video.play();
                    resolve();
                };
            });

            const canvas = document.createElement('canvas');
            canvas.width = video.width;
            canvas.height = video.height;

            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, video.width, video.height);

            stream.getTracks().forEach(track => track.stop());

            canvas.toBlob(async (blob) => {
                const faceVerified = await verifyFace(blob);

                if (faceVerified) {
                    console.log('Face verified successfully');
                    // Redirect to the broadcast page
                    window.location.href = '/brodecast';
                } else {
                    console.error('Face verification failed');
                    alert('Face verification failed');
                    // Redirect to the signup page
                    window.location.href = '/home';
                }
            }, 'image/jpeg');
        }

        document.getElementById('joinMeetingForm').addEventListener('submit', joinMeeting);