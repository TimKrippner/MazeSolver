var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var bfs = require('./node_modules/bfs.js');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/upload', function(req, res){

	var fileName = '';
	var form = new formidable.IncomingForm();

	form.multiples = true;

	form.uploadDir = path.join(__dirname, '/uploads');

	form.on('file', function(field, file) {
		fs.rename(file.path, path.join(form.uploadDir, file.name));
		fileName = file.name;
	});

	form.on('error', function(err) {
		console.log('An error has occured: \n' + err);
	});

	form.on('end', function() {
		var fs = require('fs');
		mazeArray = [[],[]];

		for(i = 0; i < 2000; i++){
			// waiting to for file to finish uploading.
			console.log('Loading...')
		}

		var lines = fs.readFileSync('uploads/' + fileName).toString().split("\n");

		for (var i = 0; i < lines.length; i++)
		{
			mazeArray[i] = lines[i].split("");
		}

		var grid = bfs.solveMaze(mazeArray);

		res.end(JSON.stringify(grid));
	});

	form.parse(req);


});
var server = app.listen(10000, function(){
	console.log('Server listening on port 10000');

});
