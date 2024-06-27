// // Assume user's name is stored in a variable called `username`
// document.getElementById('username').textContent = username;
// function showPage(pageName) {
//     document.getElementById('content').innerHTML = '<h1>' + pageName + '</h1>';
// }
// Toggle the visibility of the notifications panel when the notifications icon is clicked
document.querySelector('.notifications-icon').addEventListener('click', function() {
    document.querySelector('.notifications').style.display = (document.querySelector('.notifications').style.display === 'block') ? 'none' : 'block';
});

// // Assume user's name is stored in a variable called `username`
// document.getElementById('username').textContent = username;
// function showPage(pageName) {
//     document.getElementById('content').innerHTML = '<h1>' + pageName + '</h1>';
// }
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

// //
// schdual meetings
document.getElementById('scheduleForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const meetingName = document.getElementById('meetingName').value.trim();
    const meetingDate = document.getElementById('meetingDate').value.trim();

    // Here you can send the meeting details to your server for further processing
    console.log('Meeting Name:', meetingName);
    console.log('Meeting Date:', meetingDate);

    // Example: Reset the form after submission
    document.getElementById('scheduleForm').reset();

    // Example: Update the list of scheduled meetings
    const meetingList = document.getElementById('meetingList');
    const noMeetingsMsg = document.getElementById('noMeetingsMsg');

    const listItem = document.createElement('li');
    listItem.textContent = meetingName + ' - ' + meetingDate;
    meetingList.appendChild(listItem);

    noMeetingsMsg.style.display = 'none';
});
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



// document.getElementById('meetingsJoinedCount').textContent = meetingsJoinedCount;
// document.getElementById('meetingsCreatedCount').textContent = meetingsCreatedCount;