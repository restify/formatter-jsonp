// Copyright 2012 Mark Cavage, Inc.  All rights reserved.


///--- Exports

function formatJSONP(req, res, body) {
  var jsonp_callback;
  var data;
  if (!body) {
    res.setHeader('Content-Length', 0);
    return (null);
  }

  if (body instanceof Error) {
    if ((body.restCode || body.httpCode) && body.body) {
      body = body.body;
    } else {
      body = {
        message: body.message
      };
    }
  }

  if (Buffer.isBuffer(body)) {
    body = body.toString('base64');
  }

  jsonp_callback = req.query.callback || req.query.jsonp;
  if (jsonp_callback) {
    data = jsonp_callback + '(' + JSON.stringify(body) + ');';
  } else {
    data = JSON.stringify(body);
  }

  res.setHeader('Content-Length', Buffer.byteLength(data));
  return (data);
}

module.exports = formatJSONP;
