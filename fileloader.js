var fs = require('fs');
var events = require('events');
var util = require('util');
var ban_entry = require('./banentry');
var linereader = require('line-reader');

function Records(){
	this.bans = new Array();
	this.load = function(file){
		var that = this;

		if (!fs.existsSync(file)){
			that.emit('error', new Error('File does not exist'));
		} else {
			linereader.eachLine(file, function(line, last){
				var ban = new ban_entry(line);
				that.bans.push(ban);
				if (last) {
					that.emit('end');	
				}
			});
		}
	}
}

util.inherits(Records, events.EventEmitter);
module.exports = Records;