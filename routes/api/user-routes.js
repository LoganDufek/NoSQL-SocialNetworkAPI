const router = require('express').Router();

//import all of the methods from user-controller path
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  unFriend

} = require('../../controllers/user-controller');

//set up each of these methods with the appropriate routes
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

//set up specific route for adding and removing friends
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(unFriend);


module.exports = router;