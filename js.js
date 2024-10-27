document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    const commentsList = document.getElementById('commentsList');
    const newComment = document.createElement('li');
    newComment.innerHTML = `<strong>${name}</strong>: ${comment}`;
    commentsList.appendChild(newComment);

    document.getElementById('feedbackForm').reset();
});
