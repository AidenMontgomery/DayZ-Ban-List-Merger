var should = require('should');
var fs = require('fs');
var file_writer = require('../filewriter');
var ban_entry = require('../banentry');

describe('File Writer', function(){
	it('Should write a file', function(done){
		var path = 'output.txt';
		var bans = new Array();
		bans.push(new ban_entry('guid1 -1 reason1'));
		bans.push(new ban_entry('guid2 -1 reason2'));
		bans.push(new ban_entry('guid3 -1 reason3'));
		bans.push(new ban_entry('guid4 -1 reason4'));

		var writer = new file_writer(path);
		writer.on('end', function(){
			fs.unlink(path);
			done();
		});
		writer.output(bans);
	});
});