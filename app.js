const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const apiRoutes = require('./app/routes/routes.js');
const port = process.env.PORT || 3000;
const app = express();

// const bodyParser  = require('body-parser');
// const config      = require('./app/config/config');
// const expressLayouts = require('express-ejs-layouts');

app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');
app.set('layout', 'app/layout');
app.use(express.static('public'));
app.use(expressLayouts);
app.use(apiRoutes);
app.listen(port, function() {
    console.log('Example app listening on port 3000!');
});
