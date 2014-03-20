'use strict';

describe('JSONP formatter', function () {
  describe('JSONP wrapper', function() {
    function mockRequest(query) {
      return {
        query: query
      };
    }

    it('should get callback name from request callback property', function () {
      expect({
        body: {},
        request: mockRequest({callback: 'callback'})
      }).to.be.formattedOut('callback({});');
    });

    it('should get callback name from request callback property', function () {
      expect({
        body: {},
        request: mockRequest({jsonp: 'callback'})
      }).to.be.formattedOut('callback({});');
    });

    it('should not wrap if no callback specified', function () {
      expect({
        body: {},
        request: mockRequest({})
      }).to.be.formattedOut('{}');
    });
  });

  describe('Content-Length', function() {
    it('should set Content-Length to 2 if body is {}', function() {
      expect({
        body: {}
      }).to.have.contentLength(2);
    });

    it('should set Content-Length to 0 if body is undefined', function() {
      expect({
        body: undefined
      }).to.have.contentLength(0);
    });
  });

  describe('body', function() {
    describe('normal', function() {
      it('should return null if body is undefined', function() {
        expect({
          body: undefined
        }).to.be.formattedOut(null);
      });

      it('should return decoded string if body is buffer', function() {
        expect({
          body: new Buffer('test', 'base64')
        }).to.be.formattedOut('"test"');
      });

      it('should json encode body', function() {
        var body = {propery: 'value'};
        expect({
          body: body
        }).to.be.formattedOut(JSON.stringify(body));
      });
    });

    describe('error', function() {
      it('should return JSON error if body is simple error', function() {
        expect({
          body: new Error('error')
        }).to.be.formattedOut('{"message":"error"}');
      });

      it('should return error body if has restCode', function() {
        var error = new Error('error');
        error.restCode = 404;
        error.body = 'errorBody';
        expect({
          body: error
        }).to.be.formattedOut('"errorBody"');
      });

      it('should return error body if has restCode', function() {
        var error = new Error('error');
        error.httpCode = 404;
        error.body = 'errorBody';
        expect({
          body: error
        }).to.be.formattedOut('"errorBody"');
      });
    });
  });
});

