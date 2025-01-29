const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.logged_in = true;
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: { username: req.body.username }
    });

    if (!dbUserData) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.logged_in = true;
      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGOUT
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
