const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

//create schema
const UserSchema = mongoose.Schema({
  local:{
    email: {type: String},
    password: {type: String},
  }
});

// generating a hash
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking for valid password
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
}

// export the model
module.exports = mongoose.model('user', UserSchema);
