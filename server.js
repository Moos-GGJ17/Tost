var express = require('express');
var app = express();

app.use(express.static(__dirname + '/'));

app.listen(process.env.PORT || 8080, function() {
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});