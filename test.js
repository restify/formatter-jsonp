var formatter = require('./');
var expect = require('chai').expect;

describe('JSONP formatter', function () {

  function testWrap(query) {
    it('wraps the body with ' + JSON.stringify(query), function () {
      var request = {
        query: query
      };
      var response = {
        setHeader: function() {}
      };
      var body = {};
      var data = formatter(request, response, body);
      expect(data).to.eql('callback({});')
    });
  }

  testWrap({
    callback: 'callback'
  });
  testWrap({
    jsonp: 'callback'
  });




});
