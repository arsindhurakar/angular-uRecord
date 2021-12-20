const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');
const ctrlUserRecord = require('../controllers/user-record.controller');

router.post('/register', ctrlUser.register);

router.post('/authenticate', ctrlUser.authenticate);

router.get('/', jwtHelper.verifyJwtToken, ctrlUser.userProfile);

router.post('/add-record', ctrlUserRecord.addUserRecord);

router.get('/get-records', ctrlUserRecord.getUserRecords);

router.delete('/remove-record/:id', ctrlUserRecord.removeUserRecord); //id as params

router.put('/update-record', ctrlUserRecord.updateUserRecord);

module.exports = router;
