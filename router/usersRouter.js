const express = require('express');
const router= express.Router();
const {getUsers} = require('../controller/usersController');
const responseHtml = require('../middleware/common/responseHtml')

//users page
router.get('/', responseHtml("users"), getUsers,)
module.exports = router;