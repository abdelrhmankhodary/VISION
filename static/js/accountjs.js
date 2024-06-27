
 // Assume user's name is stored in a variable called `username`
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



 document.getElementById('changePicButton').addEventListener('click', function() {
     document.getElementById('profilePicInput').click();
 });

 document.getElementById('profilePicInput').addEventListener('change', function() {
     const file = this.files[0];
     if (file) {
         const reader = new FileReader();
         reader.onload = function() {
             document.getElementById('profilePic').src = reader.result;
         }
         reader.readAsDataURL(file);
     }
 });

 document.getElementById('editButton').addEventListener('click', function() {
     const editableFields = document.querySelectorAll('.editable');
     editableFields.forEach(field => {
         field.removeAttribute('readonly');
     });

     document.getElementById('editButton').style.display = 'none';
     document.getElementById('saveButton').style.display = 'block';
 });

 document.getElementById('saveButton').addEventListener('click', function() {
     const userId = document.getElementById('userId');
     const fullName = document.getElementById('fullName');
     const username2 = document.getElementById('username2');
     const email = document.getElementById('email');
     const gender = document.getElementById('gender');
     const location = document.getElementById('location');

     // Save changes to the server (you may replace this with your own logic)
     // For demonstration purposes, we'll just log the updated values
     console.log('Updated User Information:');
     console.log('ID:', userId.innerText);
     console.log('Full Name:', fullName.value);
     console.log('Username2:', username2.value);
     console.log('Email:', email.value);
     console.log('Gender:', gender.value);
     console.log('Location:', location.value);

     // Disable editing and update the UI
     toggleEditMode();
 });

 function toggleEditMode() {
     const editableFields = document.querySelectorAll('.editable');
     editableFields.forEach(field => {
         field.readOnly = true;
     });

     document.getElementById('editButton').style.display = 'block';
     document.getElementById('saveButton').style.display = 'none';
 }
 
//  document.getElementById('meetingsJoinedCount').textContent = meetingsJoinedCount;
//     document.getElementById('meetingsCreatedCount').textContent = meetingsCreatedCount;