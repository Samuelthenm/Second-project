const withAuth = (req, res, next) => {
    // If user isn't logged in, redirect them to login page
    if (!req.session.logged_in) {
      return res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
  