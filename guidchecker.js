var loader = require('./fileloader');

function banlists(localfile, communityfile){
	var that = this;
	this.localloader = new loader();
	this.communityloader = new loader();
	this.load = function(callback){
		var files = 2;
		var fileloaded = function(){
			files--;
			if (files == 0){
				callback();
			}
		}
		that.localloader.on('end', function(){
			fileloaded();
		});

		that.communityloader.on('end', function(){
			fileloaded();
		});

		that.localloader.load(localfile);
		that.communityloader.load(communityfile);
	}

	this.detect = function(callback){
		var duplicates = new Array();
		for(var ban in that.localloader.bans){
			var entry = that.localloader.bans[ban];

			for(var cban in that.communityloader.bans){
				var centry = that.communityloader.bans[cban];
				if (centry.guid === entry.guid){
					duplicates.push(entry.guid);
					continue;
				}
			}
				
		}
		callback(duplicates);
	}

	this.merge = function(callback){
		var merged = new Array();
		var processed = {};

		for(var cban in that.communityloader.bans){
			var centry = that.communityloader.bans[cban];
			merged.push(centry);
			processed[centry.guid] = 1;
		}

		for(var ban in that.localloader.bans){
			var entry = that.localloader.bans[ban];
			if (processed[entry.guid] !== 1){
				merged.push(entry);
				processed[entry.guid] = 1;
			}
		}

		callback(merged);
	}
}

module.exports = banlists;