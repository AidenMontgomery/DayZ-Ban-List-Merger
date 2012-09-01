var should = require('should');
var fs = require('fs');
var guid_checker = require('../guidchecker');
var events = require('events');
var util = require('util');
var banentry = require('../banentry.js')

describe('GUID Checker', function(){
	var fake_loader = function(){
		var that = this;
		this.loaded_path = '';
		this.load = function(file_path){
			that.loaded_path = file_path;
			that.emit('end');
		}
		this.bans = new Array();
	};
	util.inherits(fake_loader, events.EventEmitter);


	it('Should load up both files', function(done){
		var path1 = 'path1';
		var path2 = 'path2';
		var checker = new guid_checker(path1, path2);
		checker.localloader = new fake_loader();
		checker.communityloader = new fake_loader();

		checker.load(function(){
			checker.localloader.loaded_path.should.equal(path1);
			checker.communityloader.loaded_path.should.equal(path2);
			done();
		});
	});

	it('Should detect bans existing in both files', function(done){
		var path1 = 'path1';
		var path2 = 'path2';
		var checker = new guid_checker(path1, path2);
		checker.localloader = new fake_loader();
		checker.localloader.bans.push(new banentry('testing'));
		checker.localloader.bans.push(new banentry('testing1'));
		checker.localloader.bans.push(new banentry('testing2'));
		checker.localloader.bans.push(new banentry('testing3'));

		checker.communityloader = new fake_loader();

		checker.communityloader.bans.push(new banentry('testing'));
		checker.communityloader.bans.push(new banentry('testing1'));
		checker.communityloader.bans.push(new banentry('testing2'));
		checker.communityloader.bans.push(new banentry('testing3'));
		checker.communityloader.bans.push(new banentry('testing4'));
		checker.communityloader.bans.push(new banentry('testing5'));
		checker.communityloader.bans.push(new banentry('testing6'));

		checker.load(function(){
			checker.localloader.loaded_path.should.equal(path1);
			checker.communityloader.loaded_path.should.equal(path2);
			
			checker.detect(function(duplicates){
				duplicates.should.have.length(4);
				done();
			});
		});
	});

	it('Should merge two lists', function(done){
				var path1 = 'path1';
		var path2 = 'path2';
		var checker = new guid_checker(path1, path2);
		checker.localloader = new fake_loader();
		checker.localloader.bans.push(new banentry('testing'));
		checker.localloader.bans.push(new banentry('testing1'));
		checker.localloader.bans.push(new banentry('testing2'));
		checker.localloader.bans.push(new banentry('testing3'));
		checker.localloader.bans.push(new banentry('testing11'));
		checker.localloader.bans.push(new banentry('testing21'));
		checker.localloader.bans.push(new banentry('testing31'));

		checker.communityloader = new fake_loader();

		checker.communityloader.bans.push(new banentry('testing'));
		checker.communityloader.bans.push(new banentry('testing1'));
		checker.communityloader.bans.push(new banentry('testing2'));
		checker.communityloader.bans.push(new banentry('testing3'));
		checker.communityloader.bans.push(new banentry('testing4'));
		checker.communityloader.bans.push(new banentry('testing5'));
		checker.communityloader.bans.push(new banentry('testing6'));

		checker.load(function(){
			checker.localloader.loaded_path.should.equal(path1);
			checker.communityloader.loaded_path.should.equal(path2);
			
			checker.merge(function(merged){
				merged.should.have.length(10);
				done();
			});
		});
	});

});