var fs = require('fs');
var events = require('events');
var util = require('util');
var ban_entry = require('./banentry');
var linereader = require('line-reader');


function Records(){
	this.bans = new Array();
	this.load = function(file){
		var that = this;

		linereader.eachLine(file, function(line, last){
			var ban = new ban_entry(line);
			that.bans.push(ban);
			if (last) {
				that.emit('end');	
			}
		});

		// new lazy(fs.createReadStream(file))
		// 	.lines
		// 	.forEach(function(line){
		// 		var ban = new ban_entry(line.toString());
		// 		that.bans.push(ban);
		// 		console.log(line.toString());
		// 	}).on('pipe', that.emit('end'));

		// var input = fs.createReadStream(file);

		// var that = this;
		// var remaining = '';
		// var partialLine = '';
		// input.on('data', function(data) {

		// 	var stringData = data.toString();
		// 	var lines = stringData.split('\n');
		// 	for (var line in lines) {
		// 		if (lines[line].indexOf('\n') == -1){
		// 			console.log('NO END OF LINE');
		// 		}
		// 		var ban = new ban_entry(lines[line]);
		// 		that.bans.push(ban);
		// 	}
		// });

		// input.on('end', function() {
		// 	that.emit('end');
		// });
	}
}

util.inherits(Records, events.EventEmitter);
module.exports = Records;