const router = require('express').Router();
const { Post, User } = require('../models');

router.get('/', async (req, res) => {
  try {
    // Fetch all posts
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    // Render homepage with posts
    res.render('home', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/dashboard');
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/dashboard');
  }
  res.render('signup');
});

router.get('/dashboard', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      return res.redirect('/login');
    }

    // Optionally fetch the user’s posts here
    // ...
    res.render('dashboard', { logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
