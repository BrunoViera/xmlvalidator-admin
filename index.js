var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
// var bodyParser  = require('body-parser');
// var config      = require('./app/config/config');
var apiRoutes = require('./app/routes/routes.js');
// var expressLayouts = require('express-ejs-layouts');

app.use(express.static('public'));
app.use(apiRoutes);
app.listen(port, function() {
    console.log('Example app listening on port 3000!');
});
