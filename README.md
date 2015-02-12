# SpotTheStation RSS Reader
Converts a SpotTheStation RSS file to a javascript object.

Data can be obtained from NASA's [Spot The Station](http://spotthestation.nasa.gov/home.cfm).

Simply lookup a city and then download the RSS file linked from that page:

    http://spotthestation.nasa.gov/sightings/view.cfm?country=Germany&region=None&city=Berlin

## Example
```Javascript
var request = require("request");
var IssReader = require('spotthestation-rss-reader');
 
var issReader = new IssReader();
 
var RSS_URI = 'http://spotthestation.nasa.gov/sightings/indexrss.cfm?'
           + 'country=Germany&region=None&city=Berlin';
 
request(RSS_URI, function(error, response, body) {
    if (!error && response.statusCode == 200)
        issReader.parseRSS(body, function(err, data) {
          console.log(data)
        });
});
```
