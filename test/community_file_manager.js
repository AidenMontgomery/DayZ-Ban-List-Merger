var should = require('should');
var fs = require('fs');
var rimraf = require('rimraf');
var community_file_manager = require('../communityfilemanager');

describe('Community File Manager', function(){
	var path = './dayz-community-banlist/';

	describe('Update', function(){
		it('Should download the files from git', function(done){
			var manager = new community_file_manager(path);
			manager.update(function(err){
				fs.existsSync(path).should.be.true;
				done();
			});
		});
	});

	after(function(){
		if (fs.existsSync(path)){
			rimraf(path, function(err){});
		}
	});
});