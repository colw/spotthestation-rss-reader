var parseString = require('xml2js').parseString;

var ISS = function() {}

ISS.prototype.parseRSS = function(contents, callback) {
	parseString(contents, function(err, result) {
		if(err) throw err;
		var feedObj = rssSightingsToJSON(result.rss.channel[0]);
		if (callback)
			callback(feedObj);
	});
}

function parseTitle(s) {
	// e.g. "2015-01-08 ISS Sighting"
	var re = /[0-9]{4}-[0-9]{2}-[0-9]{2} (.*$)/g;
	var t = s.replace(re, "$1");
	return t;
}

function getFields(desc) {
	// e.g.
	// Date: Tuesday Jan 6, 2015 &lt;br/&gt;
	// Time: 7:21 AM &lt;br/&gt;
	// Duration: 1 minute &lt;br/&gt;
	// Maximum Elevation: 14 &#176; &lt;br/&gt;
	// Approach: 11 &#176; above S &lt;br/&gt;
	// Departure: 14 &#176; above SSE &lt;br/&gt;
	var fields = ["Date",
				  "Time",
				  "Duration",
				  "Maximum Elevation",
				  "Approach",
				  "Departure"];
	var ret = {};
	fields.forEach(function(s) {
		var rgx = new RegExp(s + ": (.*) <br\/>")
		var matches = rgx.exec(desc);
		if (matches.length > 1) {
			ret[s] = matches[1]
		}
	});
	return ret;
}

function getElapsedTime(oldDate, elapsed) {
	var dur = elapsed.match('[0-9]+')[0];
	return new Date(oldDate.getTime() + 1000 * 60 * parseInt(dur));
}

function makeSighting(title, data, guid) {
	var ret = {}
	ret.Title = title;
	ret.Start = new Date(data.Date + ' ' + data.Time);
	ret.Finish = getElapsedTime(ret.Start, data['Duration']);
	ret.Duration = data['Duration'];
	ret.MaxElevation = data['Maximum Elevation'];
	ret.Approach = data['Approach'];
	ret.Departure = data['Departure'];
	ret.guid = guid;
	return ret;
}

function rssSightingsToJSON(data) {
	var result = {}
	result.title = data.title[0];
	result.desc = data.description[0];
	result.uri = data.link[0];
	result.sightings = [];
	data.item.forEach(function(item) {
		var sightingFields = getFields(item.description[0]);
		var sightingTitle = parseTitle(item.title[0]);
		var sightingDetails = makeSighting(sightingTitle, sightingFields, item.guid[0]);
		result.sightings.push(sightingDetails);
	});
	return result;
}

module.exports = ISS;
