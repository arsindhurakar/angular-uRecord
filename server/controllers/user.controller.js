const passport = require('passport');
const lodash = require('lodash');
// const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

// module.exports.register = async (req, res, next) => {
//   const data = await User.find({})
//     .then((res) => {
//       console.log(res);
//       return res;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   res.json(data);
// };

// module.exports.register = function (req, res) {
//   User.find({}, function (err, data) {
//     if (err) {
//       return next(err);
//     }
//     res.json(data);
//   });
// };

module.exports.register = (req, res, next) => {
  var user = new User();
  user.fullName = req.body.fullName;
  user.email = req.body.email;
  user.password = req.body.password;
  user.save((err, doc) => {
    if (!err) res.send(doc);
    else {
      if (err.code == 11000)
        res.status(422).send(['Duplicate email address found.']);
      else return next(err);
    }
  });
};

module.exports.authenticate = (req, res, next) => {
  // call for passport authentication
  passport.authenticate('local', (err, user, info) => {
    // error from passport middleware
    if (err) return res.status(400).json(err);
    // registered user
    else if (user) return res.status(200).json({ token: user.generateJwt() });
    // unknown user or wrong password
    else return res.status(404).json(info);
  })(req, res);
};

module.exports.userProfile = (req, res, next) => {
  User.findOne({ _id: req._id }, (err, user) => {
    if (!user)
      return res
        .status(404)
        .json({ status: false, message: 'User record not found.' });
    else
      return res
        .status(200)
        .json({ status: true, user: lodash.pick(user, ['fullName', 'email']) });
  });
};
