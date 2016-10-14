var assert = require('assert');
var IssReader = require('../main.js');

describe('IssReader', function() {
	describe('#formatRSSLink()', function() {
		it('Should not return an empty string when given empty parameters', function() {
			var issReader = new IssReader();
			var result = issReader.formatRSSLink('', '', '');
			assert.notEqual('', result);
		});
		it('Should return the correct string when supplied integer parameters', function() {
			var issReader = new IssReader();
			var result = issReader.formatRSSLink(1, 2, 3);
			var expected = 'http://spotthestation.nasa.gov/sightings/view.cfm?country=1&region=2&city=3';
			assert.equal(expected, result);
		});
		it('Should return correct string from location parameters', function() {
			var issReader = new IssReader();
			var result = issReader.formatRSSLink('Australia', 'New_South_Wales', 'Sydney');
			var expected = 'http://spotthestation.nasa.gov/sightings/view.cfm?country=Australia&region=New_South_Wales&city=Sydney';
			assert.equal(expected, result);
		});
	});
});
