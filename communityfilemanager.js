var fs = require('fs');
var rimraf = require('rimraf');
var Git = require('git-wrapper');

var remote_path = 'http://code.google.com/p/dayz-community-banlist/';

function CommunityFileManager(path){
	var that = this;
	this.path = path;

	this.clean = function(cb){
		if (fs.existsSync(that.path)){
			rimraf(that.path, cb);
		} else {
			cb(null);
		}
	}

	this.update = function(cb){
		that.clean(function(error){	
			var git = new Git();
			git.exec('clone', [remote_path, that.path], function(err, msg){
				cb(err);
			});
		});
	}
}

module.exports = CommunityFileManager;