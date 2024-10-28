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
document.addEventListener('scroll', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('in-view');
      }
    });
  });
 // Get comments
fetch('https://portfoliobackend-k2gr.onrender.com')
.then(response => response.json())
.then(data => {
    data.forEach(comment => {
        // Display each comment on the webpage
        console.log(comment.content);
    });
});

// Post a comment
fetch('https://portfoliobackend-k2gr.onrender.com', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ content: 'Your comment here' })
})
.then(response => response.json())
.then(data => {
console.log('Comment saved:', data);
});


