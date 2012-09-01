var ban_entry = require('../banentry');
var should = require('should');

describe('GUID', function(){
	it('Should parse a ban file line', function(done){
		var line = 'guid -1 this is the reason';
		var ban = new ban_entry(line);

		ban.guid.should.equal('guid');
		ban.reason.should.equal('this is the reason');

		done();
	});
});