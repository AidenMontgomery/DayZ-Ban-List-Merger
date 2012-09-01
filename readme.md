DayZ Ban List Merger
====================

Merges two ban list together

Install
-------

git clone https://github.com/AidenMontgomery/DayZ-Ban-List-Merger.git

Usage
-----

    node ./app.js -l [local] -c [community] [-d | --m [output]]
    Examples:
      node ./app.js -l /server/bans.txt -c /community/bans/bans.txt -d
      node ./app.js -l /server/bans.txt -c /community/bans/bans.txt --m /merged/bans.txt

    Options:
      -l, --local                     Local or server ban list location      [required]
      -c, --community                 Community ban list location            [required]
      --m [output], --merge [output]  Perform a merge and write to [output]
      -d, --detect                    Output detected duplicate GUIDS  