var Git = require('git-wrapper');
var Path = require('path');
var async = require('async');
var argv = require('optimist')
	.usage('Usage:\t$0 -r <root> -l <local> -c <community> [-d] [-m <output>] [-u] [-U] \nExamples:\n\tnode ./app.js -r ./files/ -l server_bans.txt -c dayz-community-banlist/bans/bans.txt -u -d\n\tnode ./app.js -r ./files/ -l server_bans.txt -c dayz-community-banlist/bans/bans.txt -m /merged/bans.txt -u ')
	.alias('r', 'rootdir')
	.alias('l', 'local')
	.alias('c', 'community')
	.alias('d', 'detect')
	.alias('m', 'merge')
	.alias('u', 'update')
	.alias('U', 'update-all')
	.describe('r', 'Root directory for files')
	.describe('l', 'Local or server ban list path')
	.describe('c', 'Community ban list path')
	.describe('m', 'Perform a merge and write to <output>')
	.describe('d', 'Output detected duplicate GUIDS')
	.describe('u', 'Updates the community ban file from the internet')
	.describe('U', 'Updates filters as well as ban file from the internet')
    .demand(['r', 'l', 'c'])
    .argv;

var guidchecker = require('./guidchecker');
var file_writer = require('./filewriter');
var community_file_manager = require('./communityfilemanager');

var community_path = '/dayz-community-banlist/';
community_path = Path.join(argv.r, community_path);

var community_manager = new community_file_manager(community_path);
var checker;
async.series([
	function clean(callback){
		if (argv.u || argv.U){
			community_manager.update(function(err){
				callback(err, 'Cleaned');
			});
		} else {
			callback(null, 'Cleaned');
		}
	}
	,function load(callback){
		checker = new guidchecker(Path.join(argv.r, argv.l), Path.join(argv.r, argv.c));
		checker.load(function(err){
			callback(err);
		});
	}
	,function detect(callback){
		if (argv.d){
			checker.detect(function(err, dupes){
				console.log(dupes);
				callback(null, 'DuplicatesDetected');
			});
		} else {
			callback(null, 'Detected');
		}
	}
	,function merge(callback){
		if (argv.m) {
			checker.merge(function(err, merged){
				var writer = new file_writer(Path.join(argv.r, argv.m));
				writer.output(merged);
				callback(null, merged);
			});
		} else {
			callback(null, 'Not Merging');
		}
	}]
);