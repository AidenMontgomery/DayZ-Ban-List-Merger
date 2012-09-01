var fs = require('fs');
var events = require('events');
var util = require('util');

function Filewriter(path){
	var that = this;
	this.output = function(banlist){
		var output = fs.createWriteStream(path);

		output.on('close', function(){
			that.emit('end');
		});

		for (var banentry in banlist) {
			var ban = banlist[banentry];
			if (ban.guid == '984fdf8e80ff94c36f158713fac94954') {
				console.log(ban);
			}
			output.write(ban.guid + ' -1 ' + ban.reason + '\n');
		}
		output.end();
	}
}

util.inherits(Filewriter, events.EventEmitter);

module.exports = Filewriter;