const express = require('express');
const router= express.Router();
const {getLogin} = require('../controller/loginController');
const responseHtml = require('../middleware/common/responseHtml')
//login page
router.get('/', responseHtml("login"), getLogin,)
module.exports = router;