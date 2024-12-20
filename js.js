const API_BASE_URL = 'https://portfoliobackend-k2gr.onrender.com'; // Ensure this is correct

// Utility Functions
function displayErrorMessage(message) {
    const errorContainer = document.getElementById('errorContainer');
    if (errorContainer) {
        errorContainer.textContent = message;
        errorContainer.style.display = message ? 'block' : 'none';
    }
}

function displaySuccessMessage(message) {
    const successContainer = document.getElementById('successContainer');
    if (successContainer) {
        successContainer.textContent = message;
        successContainer.style.display = message ? 'block' : 'none';
        if (message) {
            setTimeout(() => { successContainer.style.display = 'none'; }, 3000);
        }
    }
}

function clearMessages() {
    displayErrorMessage('');
    displaySuccessMessage('');
}

function createCommentElement(comment) {
    const listItem = document.createElement('li');

    // Sanitize the text to prevent XSS
    const strong = document.createElement('strong');
    strong.textContent = comment.name;

    listItem.appendChild(strong);
    listItem.appendChild(document.createTextNode(`: ${comment.message}`));
    return listItem;
}

function validateForm(name, comment) {
    const errors = [];
    if (!name.trim()) errors.push('Name is required.');
    if (!comment.trim()) errors.push('Comment cannot be empty.');
    return errors;
}

function showLoading(isLoading) {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = isLoading ? 'block' : 'none';
    }
}

// Event Handlers
document.getElementById('feedbackForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    clearMessages();

    const nameInput = document.getElementById('name');
    const commentInput = document.getElementById('comment');

    if (!nameInput || !commentInput) {
        console.error('Form elements not found.');
        displayErrorMessage('Form elements are missing.');
        return;
    }

    const name = nameInput.value;
    const comment = commentInput.value;

    const errors = validateForm(name, comment);
    if (errors.length > 0) {
        displayErrorMessage(errors.join(' '));
        return;
    }

    try {
        showLoading(true);
        const response = await fetch(`${API_BASE_URL}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, message: comment })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to save comment.');
        }

        const commentsList = document.getElementById('commentsList');
        if (commentsList) {
            commentsList.appendChild(createCommentElement(data));
        } else {
            console.error('Comments list element not found.');
        }

        if (nameInput && commentInput) {
            nameInput.value = '';
            commentInput.value = '';
        }

        displaySuccessMessage('Comment successfully added!');
    } catch (error) {
        console.error('Error saving comment:', error);
        displayErrorMessage('Failed to save your comment. Please try again later.');
    } finally {
        showLoading(false);
    }
});

async function loadComments() {
    try {
        showLoading(true);
        const response = await fetch(`${API_BASE_URL}/comments`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to load comments.');
        }

        const commentsList = document.getElementById('commentsList');
        if (commentsList) {
            commentsList.innerHTML = '';

            data.forEach(comment => {
                commentsList.appendChild(createCommentElement(comment));
            });
        } else {
            console.error('Comments list element not found.');
            displayErrorMessage('Comments section is missing.');
        }
    } catch (error) {
        console.error('Error loading comments:', error);
        displayErrorMessage('Failed to load comments.');
    } finally {
        showLoading(false);
    }
}

document.addEventListener('DOMContentLoaded', loadComments);

// Optional Scroll Effect with Debouncing
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function(...args) {
        const context = this;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

document.addEventListener('scroll', debounce(function () {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('in-view');
        }
    });
}, 100));
