const video = document.querySelector('.vid video');
    const toggleCameraButton = document.querySelector('.toggle-camera');
    const toggleMicrophoneButton = document.querySelector('.toggle-microphone');
    const toggleMuteButton = document.querySelector('.toggle-mute'); // Added
    const screenShareButton = document.querySelector('.screen-share'); // Added
    let stream;
    let isMuted = false;
    let isCameraMuted = false; // Added
    let isScreenSharing = false; // Added

    const shoutoutButton = document.querySelector('.shoutout'); // Modified
    const chatBox = document.querySelector('.chat-box');
    const toggleChatboxButton = document.querySelector('.toggle-chatbox');
    const chatMessages = document.querySelector('.chat-messages');
    const messageInput = document.querySelector('.message-input');
    const sendMessageButton = document.querySelector('.send-message');
    const handEmoji = document.getElementById('handEmoji');
    const yourName = 'You'; // Set your name here

    let cameraEnabled = true; // Track camera state
    let microphoneEnabled = true; // Track microphone state

    // Toggle visibility of the #app div when the "Toggle Camera" button is clicked
    toggleCameraButton.addEventListener('click', () => {
        const appDiv = document.getElementById('app');
        appDiv.style.display = appDiv.style.display === 'none' ? 'block' : 'none';
        isCameraMuted = !isCameraMuted;
        toggleCameraButton.innerHTML = isCameraMuted ? '<i class="fas fa-video-slash"></i>' : '<i class="fas fa-video"></i>';
    });

    // Mute/unmute user's microphone
    async function getMicrophoneStream() {
        if (!stream) {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            } catch (err) {
                console.error('Error accessing microphone:', err);
                alert('Error accessing microphone. Please check your permissions.');
            }
        }
        return stream;
    }

    toggleMicrophoneButton.addEventListener('click', async () => {
        if (!stream) {
            stream = await getMicrophoneStream();
        }
        if (stream) {
            stream.getAudioTracks().forEach(track => {
                track.enabled = !isMuted;
            });
            isMuted = !isMuted;
            toggleMicrophoneButton.innerHTML = isMuted ? '<i class="fas fa-microphone-slash"></i>' : '<i class="fas fa-microphone"></i>';
        }
    });

    // Toggle mute/unmute video
    toggleMuteButton.addEventListener('click', () => {
        video.muted = !video.muted;
        toggleMuteButton.innerHTML = video.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
    });

    // Toggle chat box visibility
    toggleChatboxButton.addEventListener('click', () => {
        chatBox.style.display = chatBox.style.display === 'none' ? 'block' : 'none';
    });

    // Send message
    sendMessageButton.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message !== '') {
            const messageElement = document.createElement('div');
            messageElement.textContent = `${yourName}: ${message}`; // Include sender's name
            chatMessages.appendChild(messageElement);
            messageInput.value = '';
        }
    });

    // Send message on Enter key press
    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessageButton.click();
        }
    });

    // Display hand emoji on shoutout button click for 3 seconds
    shoutoutButton.addEventListener('click', () => {
        handEmoji.style.display = 'block';
        setTimeout(() => {
            handEmoji.style.display = 'none';
        }, 3000);
    });

    // Toggle screen sharing
    screenShareButton.addEventListener('click', async () => {
        if (!isScreenSharing) {
            try {
                const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
                video.srcObject = stream;
                isScreenSharing = true;
                screenShareButton.innerHTML = '<i class="fas fa-desktop"></i>'; // Change icon to indicate active screen sharing
            } catch (err) {
                console.error('Error accessing screen sharing:', err);
                alert('Error accessing screen sharing. Please check your permissions.');
            }
        } else {
            const tracks = video.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            video.srcObject = null;
            isScreenSharing = false;
            screenShareButton.innerHTML = '<i class="fas fa-desktop"></i>'; // Reset icon to default
        }
    });

    // Settings menu functionality
    const settingsMenu = document.getElementById('settingsMenu');
    const settingsButton = document.querySelector('.settings');

    settingsButton.addEventListener('click', () => {
        if (settingsMenu.style.display === 'none') {
            settingsMenu.style.display = 'flex';
        } else {
            settingsMenu.style.display = 'none';
        }
    });

    // Volume control
    const volumeDownBtn = document.getElementById('volumeDownBtn');
    const volumeUpBtn = document.getElementById('volumeUpBtn');

    volumeDownBtn.addEventListener('click', () => {
        if (video.volume > 0) {
            video.volume -= 0.1;
        }
    });

    volumeUpBtn.addEventListener('click', () => {
        if (video.volume < 1) {
            video.volume += 0.1;
        }
    });

    // Theme toggle
    const toggleThemeBtn = document.getElementById('toggleThemeBtn');
    let darkMode = false;

    toggleThemeBtn.addEventListener('click', () => {
        darkMode = !darkMode;
        if (darkMode) {
            document.body.style.backgroundColor = '#222';
            document.body.style.color = '#fff';
        } else {
            document.body.style.backgroundColor = '#f9f9f9';
            document.body.style.color = '#333';
        }
    });

    // async function startCamera() {
    //     const video = document.getElementById('video');
    //     try {
    //         const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    //         video.srcObject = stream;
    //     } catch (err) {
    //         console.error('Error accessing camera or microphone:', err);
    //         alert('Error accessing camera or microphone. Please check your permissions.');
    //     }
    // }

    // Start the camera when the page loads
    window.addEventListener('DOMContentLoaded', startCamera);


    function runAlgorithm(url) {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            alert(data.result);
        })
        .catch(error => console.error('Error:', error));
    }