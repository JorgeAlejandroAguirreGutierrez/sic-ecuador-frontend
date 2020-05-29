var express = require('express');
var app = express();
app.use(express.static('./dist/sic-ecuador-frontend'));
app.get('/*', function(req, res) {
    res.sendFile('index.html', { root: 'dist/sic-ecuador-frontend/' });
});
app.listen(process.env.PORT || 8080);