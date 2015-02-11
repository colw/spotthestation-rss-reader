# SpotTheStationRSSParser
Converts a SpotTheStation RSS file to a javascript object.

Data can be obtained from NASA's [Spot The Station](http://spotthestation.nasa.gov/home.cfm).

Simply lookup a city and then download the RSS file linked from that page:

    http://spotthestation.nasa.gov/sightings/view.cfm?country=Germany&region=None&city=Berlin

## Example
```Javascript
var request = require("request");
var IssParser = require('./spotthestationRSS.js');

var issParser = new IssParser();

var RSSURI = 'http://spotthestation.nasa.gov/sightings/indexrss.cfm?'
           + 'country=Germany&region=None&city=Berlin';

request(RSSURI, function(error, response, body) {
	if (!error && response.statusCode == 200)
		issParser.parseRSS(body, console.log);
});
```

## Todo
 - Error handling
