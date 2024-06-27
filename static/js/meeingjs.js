//  // Assume user's name is stored in a variable called `username`
//  document.getElementById('username').textContent = username;
//  function showPage(pageName) {
//      document.getElementById('content').innerHTML = '<h1>' + pageName + '</h1>';
//  }
 // Toggle the visibility of the notifications panel when the notifications icon is clicked
 document.querySelector('.notifications-icon').addEventListener('click', function() {
     document.querySelector('.notifications').style.display = (document.querySelector('.notifications').style.display === 'block') ? 'none' : 'block';
 });

 // Assume user's name is stored in a variable called `username`
//  document.getElementById('username').textContent = username;
//  function showPage(pageName) {
//      document.getElementById('content').innerHTML = '<h1>' + pageName + '</h1>';
//  }
 async function fetchNotifications() {
     try {
         const response = await fetch('/notifications');
         const notifications = await response.json();

         // Display notifications

         const notificationsElement = document.querySelector('.notifications');
         notificationsElement.innerHTML = notifications.map(notification =>
             `<div>${notification.message}</div>`
         ).join('');
     } catch (error) {
         console.error('Error fetching notifications:', error);
     }
 }
 // Example function to toggle the notification dot
 function toggleNotificationDot(show) {
     var dot = document.querySelector('.notification-dot');
     if (show) {
         dot.style.display = 'block';
     } else {
         dot.style.display = 'none';
     }
 }
 // Get the modal element
 var modal = document.getElementById('logoutModal');

 // Get the <span> element that closes the modal
 var closeBtn = document.querySelector('.close');

 // Get the Yes and No buttons
 var confirmBtn = document.getElementById('confirmLogout');
 var cancelBtn = document.getElementById('cancelLogout');

 // Function to open the modal
 function openLogoutModal() {
     modal.style.display = 'block';
 }

 // Function to close the modal
 function closeLogoutModal() {
     modal.style.display = 'none';
 }

 // Close the modal if the user clicks on the close button or outside the modal
 window.onclick = function(event) {
     if (event.target == modal) {
         modal.style.display = 'none';
     }
 };

 // Close the modal if the user clicks on the close button
 closeBtn.onclick = function() {
     closeLogoutModal();
 };

 // Close the modal if the user clicks on the No button
 cancelBtn.onclick = function() {
     closeLogoutModal();
 };

 // Perform logout action if the user clicks on the Yes button
 confirmBtn.onclick = function() {
     // Perform logout action here, such as redirecting to the logout page
     window.location.href = 'home';
 };


 // Example: Show the dot (you would call this when receiving a new notification)
 toggleNotificationDot(true);

 // Example: Hide the dot (you would call this when the user dismisses the notification)
 toggleNotificationDot(false);
 const elements = document.querySelectorAll('.js');

 // Add event listeners to each element
 elements.forEach(element => {
     // Show the element on mouse enter
     element.addEventListener('mouseenter', () => {
         element.style.opacity = 1;
     });

     // Hide the element on mouse leave
     element.addEventListener('mouseleave', () => {
         element.style.opacity = 0.2;
     });
 });
 const joinMeetingMenu = document.getElementById('joinMeetingMenu');

 // Get the image element
 const image = document.querySelector('.image');

 // Function to open the join meeting menu
 function openJoinMeetingMenu() {
     joinMeetingMenu.style.display = 'block';
 }

 // Function to close the join meeting menu
 function closeJoinMeetingMenu() {
     joinMeetingMenu.style.display = 'none';
 }

 // Add event listener to the image to open the menu on click
 image.addEventListener('click', openJoinMeetingMenu);

// FUNC that to join meeting by id and password
     document.getElementById('meetingForm').addEventListener('submit', function (event) {
         event.preventDefault();
     // Get the meeting ID and password from the form fields
     const meetingId = document.getElementById('meetingId').value.trim();
     const meetingPassword = document.getElementById('meetingPassword').value.trim();

     if ( meetingId=== '123@!' && meetingPassword === '123!') {
         alert('join successful');
         // Redirect to another page
         window.location.href = 'brodecast';
     } else {
         document.getElementById('errorMessage').textContent = 'Invalid ID or password';
     }

 });
 // Add event listener to the form submission
 document.getElementById('meetingForm').addEventListener('submit', joinMeeting);



//  document.getElementById('meetingsJoinedCount').textContent = meetingsJoinedCount;
//  document.getElementById('meetingsCreatedCount').textContent = meetingsCreatedCount;


// .........


// .
// .
// .
// .
// .
// .
// .
// .







// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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

    const image = canvas.toBlob(async (blob) => {
        const faceVerified = await verifyFace(blob);

        if (faceVerified) {
            if (meetingId !== '' && meetingPassword !== '') {
                // Add your code here to process the meeting join request
                alert('Meeting joined successfully!');
            } else {
                alert('Please enter both meeting ID and password.');
            }
        } else {
            alert('Face verification failed!');
        }
    }, 'image/jpeg');
}

document.getElementById('joinMeetingForm').addEventListener('submit', joinMeeting);