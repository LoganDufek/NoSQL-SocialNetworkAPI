//require the User and Thought Models
const { Thought } = require('../models');
const { User } = require('../models');

//Sets up thoughtController methods
const thoughtController = {

    //method to get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
    },

// method to get specific thought by its generated ID
    getThoughtById({ params }, res) {
        Thought.findOne({_id: params.id})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
    },
//method to create thought with body content and add it to the specified user's thoughts array
    addNewThought({ params, body}, res) {
        Thought.create (body)
        .then(({ thoughtText }) => {
            return User.findOneAndUpdate(
                { _id: body.userId},
                { $push: { thoughts: thoughtText } },
                { new: true, runValidators: true }
            );

        })
        .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
    },

  // method to update a specific thought by its generated ID
    updateThought({ params, body}, res) {

        Thought.findOneAndUpdate({ _id: params.id}, 
        body, 
        {new: true, runValidators: true })
        
        .then(dbThoughtData => {
        if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
        res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
    },

    // method to delete a specific thought by its generated ID
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
        },

    // method to add a reaction to a thought's reaction array using the thought's ID
    addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // method to pull a reaction from a thought's reaction array by its ID
  removeReaction({ params }, res) {
  Thought.findOneAndUpdate(
    { _id: params.thoughtId },
    { $pull: { reactions: { reactionId: params.reactionId } } },
    { new: true }
  )
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(err => res.json(err));
}
    
}

//exports module for later use
module.exports = thoughtController;