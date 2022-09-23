const express = require('express');
const router= express.Router();
const {getInbox} = require('../controller/inboxController');
const responseHtml = require('../middleware/common/responseHtml')

//login page
router.get('/', responseHtml("inbox"), getInbox,)
module.exports = router;