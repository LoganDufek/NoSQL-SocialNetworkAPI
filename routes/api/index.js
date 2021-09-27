const router = require('express').Router();

//assign routes to specific variables
const userRoutes = require('./user-routes')
const thoughtRoutes = require('./thought-routes')

//setup user and thought routes to be used with router
router.use('/user', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;