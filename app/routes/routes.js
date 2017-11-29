const express = require('express');
const router = express.Router();

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//     console.log('Time: ', Date.now());
//     next();
// });

// SITE
router.get('/', function(req, res) {
    res.render('site/index', { layout: false });
});

// APP
router.get('/app/', function(req, res) {
    res.render('app/dashboard');
});

module.exports = router;
