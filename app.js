var argv = require('optimist')
	.usage('Usage: $0 -l [local] -c [community] -d -m [output]')
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