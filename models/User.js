const { Schema, model } = require('mongoose');

//User schema setup with relevant fields
const UserSchema = new Schema({

    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      //Validate that the email is in an email format
      validate: {
        validator: function(i) {
          return /.+\@.+\..+/.test(i)
        },
        message: email => `${email.value} is not a valid email!`
      },
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
        }],
    thoughts: [
        {
        type: String,
        ref: 'Thought'
        }
    ]
},
//Set up vitrtuals and getters/seters to be used
  {
    toJSON: {
      virtuals: true,
      getters: true,
      setters: true
    },
    id: false,
  }
);

//User schema virtual to count number of friends in the friends array
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

//Name the model and identify its source variable
const User = model('User', UserSchema);

//export the model
module.exports = User;