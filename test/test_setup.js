'use strict';

global.chai = require('chai');
global.expect = chai.expect;

var formatter = require('../.');

global.chai.use(function(_chai, utils) {
  function applyFormatter(assertionThis, responseMock) {
    var assertionObject = utils.flag(assertionThis, 'object');
    assertionObject.response = responseMock || {
      setHeader: function() {}
    };
    assertionObject.request = assertionObject.request || {query: {}};
    return formatter(assertionObject.request,
                     assertionObject.response,
                     assertionObject.body);
  }

  utils.addMethod(chai.Assertion.prototype, 'formattedOut',
                  function (output) {
    new chai.Assertion(applyFormatter(this)).to.be.eql(output);
  });

  utils.addMethod(chai.Assertion.prototype, 'contentLength',
                  function (expectedLength) {
    var contentLength;
    applyFormatter(this, {
      setHeader: function(name, value) {
        contentLength = value;
      }
    });
    new chai.Assertion(contentLength).to.be.eql(expectedLength);
  });
});

