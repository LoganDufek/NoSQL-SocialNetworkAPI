const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//Reaction schema setup with relevant fields
let ReactionSchema = new Schema({
  reactionId: {
        type: Schema.Types.ObjectId,
        default: () => Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
     username: {
       type: String,
       required: true,
    },
     createdAt: {
    type: Date,
    default: Date.now(),
     get: (createdAtVal) => dateFormat(createdAtVal)
    }

},
//Set up vitrtuals and getters to be used
{
    toJSON: {
      virtuals: true,
      getters: true
    },
    
  });

//Thought schema setup with relevant fields
const ThoughtSchema = new Schema ({

    thoughtText: {
         type: String,
         required: true,
         minlength: 1,
         maxlength: 280
    },
    createdAt: {
    type: Date,
    default: Date.now(),
    get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
       type: String,
       required: true,
       ref: 'User'
    },
    reactions: [ReactionSchema]
},
//Set up vitrtuals and getters to be used
{
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  });

//ThoughtSchema Virtual to get the length of the reactions array and display it
  ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

//Name the model and identify its source variable
const Thought = model('Thought', ThoughtSchema);

//export the model
module.exports = Thought;



