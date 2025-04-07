document.addEventListener('DOMContentLoaded', () => {
    // Contact Form Validation Logic
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
            if (validateForm()) {
                submissionMessage.textContent = 'Sending message...';
                submissionMessage.classList.remove('error', 'success'); // Clear previous messages
                // Let the default form submission to Formspree happen
                contactForm.submit();
            }
        });

        function validateForm() {
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();

            return isNameValid && isEmailValid && isMessageValid;
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

    // Search Functionality Logic (remains the same)
    const searchInput = document.getElementById('search-input');
    const searchResultsContainer = document.getElementById('search-results');
    let index;
    let documents = [];

    if (searchInput && searchResultsContainer) {
        // Fetch search data
        fetch('search-data.js')
            .then(response => response.json())
            .then(data => {
                documents = data;
                buildIndex();
            })
            .catch(error => {
                console.error('Error fetching search data:', error);
            });

        // Function to build the Lunr index
        function buildIndex() {
            index = lunr(function() {
                this.ref('id');
                this.field('title');
                this.field('body');

                documents.forEach(function(doc) {
                    this.add(doc);
                }, this);
            });
        }

        // Function to display search results
        function displayResults(results) {
            searchResultsContainer.innerHTML = ''; // Clear previous results
            if (results.length > 0) {
                results.forEach(result => {
                    const doc = documents.find(d => d.id === result.ref);
                    if (doc) {
                        const li = document.createElement('li');
                        const a = document.createElement('a');
                        a.href = doc.url;
                        a.textContent = doc.title;
                        li.appendChild(a);
                        searchResultsContainer.appendChild(li);
                    }
                });
                searchResultsContainer.style.display = 'block';
            } else {
                const li = document.createElement('li');
                li.textContent = 'No results found.';
                searchResultsContainer.appendChild(li);
                searchResultsContainer.style.display = 'block';
            }
        }

        // Event listener for the search input
        searchInput.addEventListener('keyup', function() {
            const query = this.value.toLowerCase();
            if (query) {
                const results = index.search(query);
                displayResults(results);
            } else {
                searchResultsContainer.style.display = 'none'; // Hide results when input is empty
            }
        });
    }
});