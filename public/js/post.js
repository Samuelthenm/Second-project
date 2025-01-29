// public/js/post.js

const newPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const body = document.querySelector('#post-body').value.trim();
  
    if (title && body) {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, body }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // Reload the page or redirect to see the new post
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create a post.');
      }
    }
  };
  
  document
    .querySelector('#new-post-form')
    ?.addEventListener('submit', newPostHandler);
  