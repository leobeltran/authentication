const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

// Create schema
const UserSchema = mongoose.Schema({
  local:{
    email: {type: String},
    password: {type: String},
  }
});

// Generate hash
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Checking for valid password
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
}

// Export the model
module.exports = mongoose.model('user', UserSchema);
