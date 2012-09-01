var banentry = function(line){
	var parts = line.split('-1');
	this.guid = parts[0].trim();
	if (parts.length > 1){
		this.reason = parts[1].trim();
	}
}

module.exports = banentry;