const router = require('express').Router();

//identify the path for the API routes and assign it to a variable 
const apiRoutes = require('./api');

//use that variable with the /api endpoint
router.use('/api', apiRoutes);

//Error message displayed if incorrect endpoint is used
router.use((req, res) => {
  res.status(404).send('<h1> 404 Error!</h1>');
});

module.exports = router;