const API_BASE_URL = 'https://portfoliobackend-k2gr.onrender.com'; // Base URL for the backend

// Handle form submission to post a new comment
document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    // Send the new comment to the backend
    fetch(`${API_BASE_URL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message: comment })  // Adjust to match the backend schema
    })
    .then(response => response.json())
    .then(data => {
        console.log('Comment saved:', data);

        // Display the new comment on the page
        const commentsList = document.getElementById('commentsList');
        const newComment = document.createElement('li');
        newComment.innerHTML = `<strong>${data.name}</strong>: ${data.message}`;
        commentsList.appendChild(newComment);

        // Clear the form
        document.getElementById('feedbackForm').reset();
    })
    .catch(error => console.error('Error saving comment:', error));
});

// Fetch and display all comments from the backend
function loadComments() {
    fetch(`${API_BASE_URL}/comments`)
        .then(response => response.json())
        .then(data => {
            const commentsList = document.getElementById('commentsList');
            commentsList.innerHTML = ''; // Clear the list before adding comments

            data.forEach(comment => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<strong>${comment.name}</strong>: ${comment.message}`;
                commentsList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error loading comments:', error));
}

// Load comments when the page loads
document.addEventListener('DOMContentLoaded', loadComments);

// Optional scroll effect
document.addEventListener('scroll', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('in-view');
        }
    });
});
