// // Assume user's name is stored in a variable called `username`
// document.getElementById('username').textContent = username;
// function showPage(pageName) {
//   document.getElementById('content').innerHTML = '<h1>' + pageName + '</h1>';
// }
// Toggle the visibility of the notifications panel when the notifications icon is clicked
document.querySelector('.notifications-icon').addEventListener('click', function() {
  document.querySelector('.notifications').style.display = (document.querySelector('.notifications').style.display === 'block') ? 'none' : 'block';
});

// // Assume user's name is stored in a variable called `username`
// document.getElementById('username').textContent = username;
// function showPage(pageName) {
//   document.getElementById('content').innerHTML = '<h1>' + pageName + '</h1>';
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
// Load default settings
document.addEventListener('DOMContentLoaded', function () {
  loadSettings();
  applySettings();
});

// Function to load settings from localStorage
function loadSettings() {
  const theme = localStorage.getItem('theme');
  if (theme) document.getElementById('theme').value = theme;
}

// Function to save settings to localStorage
function saveSettings() {
  const theme = document.getElementById('theme').value;
  localStorage.setItem('theme', theme);
  alert('Settings saved successfully!');
}

// Function to apply settings
function applySettings() {
  changeTheme();
}

// Function to change theme
function changeTheme() {
  const theme = document.getElementById('theme').value;
  const frame = document.getElementById('frame');
  const body = document.getElementById('body');
  frame.className = 'frame';
  body.className = theme + '-mode';
  frame.classList.add(theme + '-mode');
}

// Function to toggle notifications
function toggleNotifications() {
  const notifications = document.getElementById('notifications').checked;
  const message = notifications ? 'Notifications are ON' : 'Notifications are OFF';
  alert(message);
}

// Function to change font size
function changeFontSize() {
  const fontSize = document.getElementById('fontSize').value;
  document.body.style.fontSize = fontSize;
}




// document.getElementById('meetingsJoinedCount').textContent = meetingsJoinedCount;
// document.getElementById('meetingsCreatedCount').textContent = meetingsCreatedCount;
