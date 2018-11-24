const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_I = 10;
const Jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
    index: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100
  },
  cart: {
    type: Array,
    default: []
  },
  history: {
    type: Array,
    default: []
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  }
});

userSchema.pre("save", function(next) {
  let user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(SALT_I, function(err, Salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, Salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function() {};
const User = mongoose.model("User", userSchema);
module.exports = { User };
