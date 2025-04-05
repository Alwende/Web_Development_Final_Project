document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');
        const submissionMessage = document.getElementById('submissionMessage');

        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            validateForm();
        });

        function validateForm() {
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();

            if (isNameValid && isEmailValid && isMessageValid) {
                submissionMessage.textContent = 'Message sent successfully! (This is a demo)';
                submissionMessage.classList.add('success');
                contactForm.reset();
                setTimeout(() => {
                    submissionMessage.textContent = '';
                    submissionMessage.classList.remove('success');
                }, 3000);
            } else {
                submissionMessage.textContent = '';
            }
        }

        function validateName() {
            if (nameInput.value.trim() === '') {
                displayError(nameError, 'Name is required.');
                return false;
            } else {
                clearError(nameError);
                return true;
            }
        }

        function validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '') {
                displayError(emailError, 'Email is required.');
                return false;
            } else if (!emailRegex.test(emailInput.value)) {
                displayError(emailError, 'Invalid email format.');
                return false;
            } else {
                clearError(emailError);
                return true;
            }
        }

        function validateMessage() {
            if (messageInput.value.trim() === '') {
                displayError(messageError, 'Message is required.');
                return false;
            } else {
                clearError(messageError);
                return true;
            }
        }

        function displayError(element, message) {
            element.textContent = message;
        }

        function clearError(element) {
            element.textContent = '';
        }
    }
});