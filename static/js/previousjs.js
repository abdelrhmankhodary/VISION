fetch('/meetings')
        .then(response => response.json())
        .then(meetings => {
            const meetingList = document.getElementById('meetingList');
            const noMeetingsMessage = document.getElementById('noMeetingsMessage');

            if (meetings.length === 0) {
                noMeetingsMessage.style.display = 'block';
            } else {
                meetings.forEach(meeting => {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = meeting.url;
                    link.textContent = meeting.name;
                    listItem.appendChild(link);
                    meetingList.appendChild(listItem);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching meetings:', error);
            const noMeetingsMessage = document.getElementById('noMeetingsMessage');
            noMeetingsMessage.textContent = 'Failed to fetch meetings. Please try again later or there is no meeting yet .';
            noMeetingsMessage.style.display = 'block';
        });