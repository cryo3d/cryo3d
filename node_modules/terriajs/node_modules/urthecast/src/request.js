'use strict';

var superagent = require('superagent')

function request(api_key, api_secret, host, prefix, path, params, cb){

  if( !host ) host = 'https://api.urthecast.com'
  if( !prefix ) prefix = '/v1'
  if( !path ) path = ''
  if( !params ) params = {}
  if( api_key ) params.api_key = api_key
  if( api_secret ) params.api_secret = api_secret

  superagent
    .get(host+prefix+path)
    .query(params)
    .set('Accept', 'application/json')
    .end(cb)
}

module.exports = request
