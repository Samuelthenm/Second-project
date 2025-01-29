const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const uploadRoutes = require('./uploadRoutes');

router.use('/upload', uploadRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;
