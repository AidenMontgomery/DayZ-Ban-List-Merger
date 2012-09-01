var argv = require('optimist')
	.usage('Usage:\t$0 -l [local] -c [community] [-d | --m [output]]\nExamples:\n\tnode ./app.js -l /server/bans.txt -c /community/bans/bans.txt -d\n\tnode ./app.js -l /server/bans.txt -c /community/bans/bans.txt --m /merged/bans.txt')
	.alias('l', 'local')
	.alias('c', 'community')
	.alias('d', 'detect')
	.alias('m [output]', 'merge [output]')
	.describe('l', 'Local or server ban list location')
	.describe('c', 'Community ban list location')
	.describe('m [output]', 'Perform a merge and write to [output]')
	.describe('d', 'Output detected duplicate GUIDS')
    .demand(['l','c'])
    .argv;

var guidchecker = require('./guidchecker');
var file_writer = require('./filewriter');

var checker = new guidchecker(argv.l, argv.c);

checker.load(function(){
	if (argv.d) {
		checker.detect(function(dupes){
			console.log(dupes);
		});
	} else if (argv.m) {
		checker.merge(function(merged){
			// console.log(merged);
			var writer = new file_writer(argv.m);
			writer.output(merged);
		});
	}
});