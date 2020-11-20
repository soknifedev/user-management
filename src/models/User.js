import { Schema, model } from 'mongoose';

import bcrypt from "bcrypt";

export const userSchema = new Schema({
  email: {
    required: true,
    unique: `This email is already registered. Log in now!`,
    type: String
  },
  password: {
    required: true,
    type: String
  }
});

userSchema.statics.findByEmail = async function(email) {
  return this.findOne({
    email: email
  });
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  return next();
});

userSchema.post('save', function(doc) {
  console.log('%s has been saved', doc._id);
});

userSchema.methods.testPassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default model('User', userSchema);