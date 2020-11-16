const express = require('express');
const damsCtrl = require('../../controllers/dams.controller');

const router = express.Router();

router.get('/', damsCtrl.getDams);

module.exports = router;
