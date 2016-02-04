# urthecast

urthecast is a simple nodejs client library for the services provided by https://developers.urthecast.com

# installation

```bash
$ npm i urthecast --save
```

[![NPM](https://nodei.co/npm/urthecast.png?downloads=true&stars=true)](https://nodei.co/npm/urthecast)

Note: you will need `node` and `npm` installed first.

The easiest way to install `node.js` is with [nave.sh](https://github.com/isaacs/nave) by executing `[sudo] ./nave.sh usemain stable`

# getting started

create an instance of the `urthecast` client with your `api_key` and `api_secret` copied from https://developers.urthecast.com/apps

```javascript
var urthecast = require('urthecast')(MY_KEY, MY_SECRET)
```

# satellite_tracker api

you can execute the `urthecast.v1.satellite_tracker()` function with the following arguments:

- `path`: the uri path eg. "/satellites/iss/orbit_points", defaults to ""
- `params`: a js object of the query string params
- `cb`: a callback function which accepts the arguments `(err, res)`

```javascript
urthecast.v1.satellite_tracker( "/satellites/iss/orbit_points", {}, function( err, res ){
  console.log( err, res.body )
})
```

# archive api

you can execute the `urthecast.v1.archive()` function with the following arguments:

- `path`: the uri path eg. "/scenes", defaults to ""
- `params`: a js object of the query string params
- `cb`: a callback function which accepts the arguments `(err, res)`

```javascript
urthecast.v1.archive( "/scenes", {}, function( err, res ){
  console.log( err, res.body )
})
```

# AOI api

you can execute the `urthecast.v1.consumers()` function with the following arguments:

- `path`: the uri path eg. "/apps/me/aois", defaults to ""
- `params`: a js object of the query string params
- `cb`: a callback function which accepts the arguments `(err, res)`

```javascript
urthecast.v1.consumers( "/apps/me/aois", {}, function( err, res ){
  console.log( err, res.body )
})
```

# events api

you can execute the `urthecast.v1.event_streams()` function with the following arguments:

- `path`: the uri path eg. "/events", defaults to ""
- `params`: a js object of the query string params
- `cb`: a callback function which accepts the arguments `(err, res)`

```javascript
urthecast.v1.event_streams( "/events", {}, function( err, res ){
  console.log( err, res.body )
})
```

# low level v1 api

you can execute the `urthecast.v1()` function with the following arguments:

- `path`: the uri path eg. "/satellite_tracker/satellites/iss/orbit_points", defaults to ""
- `params`: a js object of the query string params
- `cb`: a callback function which accepts the arguments `(err, res)`

```javascript
urthecast.v1( "/satellite_tracker/satellites/iss/orbit_points", {}, function( err, res ){
  console.log( err, res.body )
})
```

# super low level api

you can execute the `urthecast()` function directly with the following arguments:

- `prefix`: this gets prefixed to the `path`, defaults to "/v1"
- `path`: the uri path eg. "/v1/satellite_tracker/satellites/iss/orbit_points", defaults to ""
- `params`: a js object of the query string params
- `cb`: a callback function which accepts the arguments `(err, res)`

```javascript
urthecast( "/v1", "/satellite_tracker/satellites/iss/orbit_points", {}, function( err, res ){
  console.log( err, res.body )
})
```

## npm module

The `urthecast` npm module can be found here:
[https://npmjs.org/package/urthecast](https://npmjs.org/package/urthecast)

## contributing

Please fork and pull request against upstream master on a feature branch.
