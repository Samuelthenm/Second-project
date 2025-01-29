// public/js/logout.js

const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      // Redirect to homepage or login
      document.location.replace('/');
    } else {
      alert('Failed to log out.');
    }
  };
  
  // If you have a logout button or link with the ID "logout-btn"
  document
    .querySelector('#logout-btn')
    ?.addEventListener('click', logout);
  