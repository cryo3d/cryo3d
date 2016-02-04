
var request = require('./request')

function urthecast( api_key, api_secret ){

  var apis = request.bind( null, api_key, api_secret, 'https://api.urthecast.com' )
  apis.v1 = apis.bind( null, '/v1' )
  apis.v1.satellite_tracker = apis.bind( null, '/v1/satellite_tracker' )
  apis.v1.event_streams = apis.bind( null, '/v1/event_streams' )
  apis.v1.consumers = apis.bind( null, '/v1/consumers' )
  apis.v1.archive = apis.bind( null, '/v1/archive' )

  return apis
}

module.exports = urthecast;
