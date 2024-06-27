const togglePassword = document.getElementById('togglePassword');
const passwordField = document.getElementById('password');
const signinForm = document.getElementById('signinForm');
const usernameField = document.getElementById('username');
const errorMessage = document.getElementById('errorMessage');

togglePassword.addEventListener('click', function () {
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

signinForm.addEventListener('submit', function (event) {
    const username = usernameField.value.trim();
    const password = passwordField.value.trim();

    if (!username || !password) {
        event.preventDefault(); // Prevent form submission
        errorMessage.classList.add('show');
    } else {
        errorMessage.classList.remove('show');
    }
});