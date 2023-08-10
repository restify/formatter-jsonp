# Deprecated!

This now lives in the main restify repository. To use the restify formatters, please use:

```js
require('restify').formatters
```

formatter-jsonp
===============
[![Build Status](https://travis-ci.org/restify/formatter-jsonp.svg)](https://travis-ci.org/restify/formatter-jsonp)

Installation
============

`npm install restify-formatter-jsonp`

Usage
=======

```
var restify = require('restify');
var server = restify.createServer();
var jsonpFormatter = require('restify-formatter-jsonp');

server.use(jsonpFormatter);
server.listen(8080)
```

License
=======

MIT
