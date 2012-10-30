DayZ Ban List Merger
====================

Merges two ban list together.

Primarily used to ensure that our server bans are appended to the http://code.google.com/p/dayz-community-banlist/ every time we update.

However this could be used to merge any two ban lists together.

Requirements
------------

NodeJS is required to run the scripts
Git is required to get the latest version of the community files

Install
-------

_Clone the repository_

git clone https://github.com/AidenMontgomery/DayZ-Ban-List-Merger.git

_Install the required modules_

npm install

Usage
-----

	node ./app.js -r <root> -l <local> -c <community> [-d] [-m <output>] [-u] [-U] 
	Examples:
		node ./app.js -r ./files/ -l server_bans.txt -c dayz-community-banlist/bans/bans.txt -u -d
		node ./app.js -r ./files/ -l server_bans.txt -c dayz-community-banlist/bans/bans.txt -m /merged/bans.txt -u 

	Options:
	  -r, --rootdir     Root directory for files                               [required]
	  -l, --local       Local or server ban list path                          [required]
	  -c, --community   Community ban list path                                [required]
	  -m, --merge       Perform a merge and write to <output>                
	  -d, --detect      Output detected duplicate GUIDS                      
	  -u, --update      Updates the community ban file from the internet     
	  -U, --update-all  Updates filters as well as ban file from the internet