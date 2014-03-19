'use strict';
// Copyright 2012 Mark Cavage, Inc.  All rights reserved.

function formatJSONP(request, response, body) {
  var formattedResponse;
  try {
    formattedResponse = formatResponse(request, body);
  } catch (e) {
    formattedResponse = null;
  }
  setContentLength(formattedResponse, response);
  return formattedResponse;
}

function formatResponse(request, body) {
  body = validateBody(body);
  return wrapJSONP(request, body);
}

function validateBody(body) {
  if (!body) {
    throw new Error('body is null');
  }
  body = body instanceof Error ? error2body(body) : body;
  body = Buffer.isBuffer(body) ? body.toString('base64') : body;
  return body;
}

function error2body(body) {
  return ((body.restCode || body.httpCode) && body.body) ?
    body.body :
    {
      message: body.message
    };
}

function wrapJSONP(req, body) {
  var jsonpCallback;
  body = JSON.stringify(body);
  jsonpCallback = req.query.callback || req.query.jsonp;
  return jsonpCallback ?
    jsonpCallback + '(' + body + ');' : body;
}

function setContentLength(data, response) {
  var length = data ? Buffer.byteLength(data) : 0;
  response.setHeader('Content-Length', length);
}

module.exports = formatJSONP;

