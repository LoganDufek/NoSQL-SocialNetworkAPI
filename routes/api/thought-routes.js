const router = require('express').Router();

//import all of the methods from thought-controller path
const { getAllThoughts, getThoughtById, addNewThought,
  updateThought, deleteThought,addReaction, removeReaction  } = require('../../controllers/thought-controller');

  //set up each of these methods with the appropriate routes
  router
  .route('/')
  .get(getAllThoughts)
  .post(addNewThought);

  router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

  //set up specific routes for adding and removing reactions
  router
  .route('/:thoughtId/reactions')
  .post(addReaction)
  
  router.route('/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;