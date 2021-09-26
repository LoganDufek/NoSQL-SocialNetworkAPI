const { Schema, model } = require('mongoose');


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
      validate: {
        validator: function(i) {
          return /.+\@.+\..+/.test(i)
        },
        message: email => `${email.value} is not a valid email!`
      },
      //OR
      match: [/.+\@.+\..+/, 'invalid email'] 
    },
    thoughts: [
        {
        type: String,
        ref: 'Thought'
        }
    ],
    friends: [
        {
        type: String,
        ref: 'User'
        }
    ]


},
 {
    toJSON: {
      virtuals: true
    },
    id: false,
  });



const User = model('User', UserSchema);

module.exports = User;