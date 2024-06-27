  document.getElementById('uploadButton').addEventListener('click', function() {
        var fileInput = document.getElementById('fileInput');
        var file = fileInput.files[0];
        if (file) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'upload.php', true);
            xhr.upload.onprogress = function(event) {
                if (event.lengthComputable) {
                    var percentComplete = (event.loaded / event.total) * 100;
                    document.getElementById('progressPercentage').textContent = percentComplete.toFixed(0) + '%';
                    document.getElementById('progressBarFill').style.width = percentComplete + '%';
                }
            };
            xhr.onload = function() {
                if (xhr.status === 200) {
                    document.getElementById('uploadMessage').textContent = 'Upload successful!';
                    fileInput.value = ''; // Clear file input
                } else {
                    document.getElementById('uploadMessage').textContent = 'Upload failed!';
                }
                document.getElementById('uploadProgress').style.display = 'none';
            };
            xhr.onerror = function() {
                document.getElementById('uploadMessage').textContent = 'Upload failed!';
                document.getElementById('uploadProgress').style.display = 'none';
            };
            xhr.upload.onerror = function() {
                document.getElementById('uploadMessage').textContent = 'Upload failed!';
                document.getElementById('uploadProgress').style.display = 'none';
            };
            var formData = new FormData();
            formData.append('meetingFile', file);
            xhr.send(formData);
            document.getElementById('uploadProgress').style.display = 'block';
        } else {
            document.getElementById('uploadMessage').textContent = 'Please select a file.';
        }
    });