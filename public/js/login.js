// public/js/login.js

const loginFormHandler = async (event) => {
  event.preventDefault();
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      // Show a Bootstrap alert
      document.querySelector('#alert-container').innerHTML = `
        <div class="alert alert-danger" role="alert">
          ${result.message || 'Login failed. Please try again.'}
        </div>
      `;
      return;
    }
    // If success:
    document.location.replace('/dashboard');
  } catch (error) {
    console.error(error);
  }
};

document
  .querySelector('#login-form')
  ?.addEventListener('submit', loginFormHandler);

  