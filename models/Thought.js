const { Schema, model, Types } = require('mongoose');

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
    default: Date.now()
    }

});


const ThoughtSchema = new Schema ({

    thoughtText: {
         type: String,
         required: true,
         minlength: 1,
         maxlength: 280
    },
    createdAt: {
    type: Date,
    default: Date.now()
    },
    username: {
       type: String,
       required: true,
       ref: 'User'
    },
    reactions: [ReactionSchema]
});


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;



