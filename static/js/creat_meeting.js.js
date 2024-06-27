function copyMeetingId() {
    var meetingIdInput = document.getElementById("meeting_id");
    meetingIdInput.select();
    document.execCommand("copy");
    alert("Meeting ID copied to clipboard: " + meetingIdInput.value);
}