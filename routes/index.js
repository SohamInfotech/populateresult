var express = require('express');
var router = express.Router();
const ar = require("../controler/Name")

router.post('/createdata', ar.createdata);
// router.get('/showdata', ar.showdata);



module.exports = router;
