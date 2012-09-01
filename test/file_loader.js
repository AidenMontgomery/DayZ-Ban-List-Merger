var should = require('should');
var fs = require('fs');
var file_loader = require('../fileloader');

describe('File Loader', function(){
	var path = 'sample.txt';
	before(function(){
		fs.writeFileSync(path, '1234567890 -1 reason\nqwertyuiop\nasdfghjkl');
	});

	it('Should error if there is no file to load', function(done){
		var loader = new file_loader();
		loader.on('error', function(err){
			err.should.exist;
			done();
		})

		loader.load('.......');
	});
	
	it('Should read all lines', function(done){
		var loader = new file_loader();
		loader.on('end', function(){
			loader.bans.should.have.length(3);
			done();
		});
		loader.load(path);
	});

	it('Should parse out guids', function(done){
		var loader = new file_loader();
		loader.on('end', function(){
			loader.bans[0].guid.should.equal('1234567890');
			done();
		});
		loader.load(path);
	});

	it('Should maintain separate lists', function(done){
		var second_path = 'sapmle2.txt';
		fs.writeFileSync(second_path, 'data');
		var loader1 = new file_loader();
		var loader2 = new file_loader();
		var loader_count = 2;

		var func = function(){
			if (loader_count == 0){
				fs.unlinkSync(second_path);
				done();
			}
		}

		loader1.on('end', function(){
			loader_count--;
			this.bans.should.have.length(3);
			func();
		});

		loader2.on('end', function(){
			loader_count--;
			this.bans.should.have.length(1);
			func();
		});

		loader1.load(path);
		loader2.load(second_path);
	});

	after(function(){
		fs.unlinkSync(path);
	});
});