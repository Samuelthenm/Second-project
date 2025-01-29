// middleware/errorHandler.js

module.exports = (err, req, res, next) => {
    // Log the detailed error to the server console
    console.error('Global Error Handler:', err);
  
    // If this is an AJAX/JSON request
    if (req.xhr || req.headers.accept.includes('json')) {
      return res.status(err.status || 500).json({
        message: err.userMessage || 'An unexpected error occurred.',
        error: process.env.NODE_ENV === 'production' ? {} : err
      });
    }
  
    // Otherwise, render an error page with a friendly message
    res.status(err.status || 500).render('error', {
      message: err.userMessage || 'An unexpected error occurred.',
      error: process.env.NODE_ENV === 'production' ? {} : err
    });
  };
  