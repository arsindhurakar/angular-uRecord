const mongoose = require('mongoose');

let addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: 'Street cant be empty.',
  },
  city: {
    type: String,
    required: 'City cant be empty.',
  },
});

let userRecordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name cant be empty.',
  },
  contactNo: {
    type: String,
  },

  address: addressSchema,
  email: {
    type: String,
    required: 'Email cant be empty.',
    unique: true,
  },
  isSubscribed: {
    type: Boolean,
  },
});

//custom validation for email
userRecordSchema.path('email').validate((val) => {
  emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, 'Invalid email');

module.exports = mongoose.model('UserRecord', userRecordSchema);
