const UserRecord = require('../models/user-record.model');

module.exports.addUserRecord = (req, res, next) => {
  let userRecord = UserRecord();
  userRecord.name = req.body.name;
  userRecord.contactNo = req.body.contactNo;
  userRecord.address = req.body.address;
  userRecord.email = req.body.email;
  userRecord.isSubscribed = req.body.isSubscribed;
  userRecord.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      if (err.code == 11000) {
        res.status(422).send(['Duplicate email address found.']);
      } else return next(err);
    }
  });
};

module.exports.getUserRecords = async (req, res, next) => {
  const records = await UserRecord.find({}).sort({ _id: -1 });
  if (!records) {
    return res
      .status(404)
      .json({ status: false, message: 'No record not found.' });
  } else {
    return res.status(200).json({ status: true, records });
  }
};

module.exports.removeUserRecord = (req, res, next) => {
  UserRecord.findByIdAndDelete({ _id: req.params.id }, (err, doc) => {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({ success: true });
      next();
    }
  });
};

module.exports.updateUserRecord = async (req, res, next) => {
  const { _id, name, email, address, contactNo, isSubscribed } = req.body;

  console.log(req.body);

  const filter = { _id };
  const update = { name, email, address, contactNo, isSubscribed };

  try {
    await UserRecord.findOneAndUpdate(filter, update, {
      new: true,
    }).then((data) => {
      res.json({ success: true });
      next();
    });
  } catch (err) {
    console.log(err);
  }
};
