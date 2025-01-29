// public/js/signup.js

const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the user to their dashboard or home
        document.location.replace('/dashboard');
      } else {
        alert('Failed to sign up.');
      }
    }
  };
  
  document
    .querySelector('#signup-form')
    ?.addEventListener('submit', signupFormHandler);
  