
var key = ''
var secret = ''
var urthecast = require('./src/urthecast')( key, secret )

// urthecast('/v1/satellite_tracker/satellites/iss/orbit_points', '', null, function(err, res){
//   console.log( err, res.body )
// })

// urthecast.v1('/satellite_tracker/satellites/iss/orbit_points', null, function(err, res){
//   console.log( err, res.body )
// })
//
// urthecast.v1.satellite_tracker('/satellites/iss/orbit_points', null, function(err, res){
//   console.log( err, res.body )
// })
//
// urthecast.v1.archive( "/scenes", {}, function( err, res ){
//   console.log( err, res.body )
// })

// urthecast.v1.consumers( "/apps/me/aois", {}, function( err, res ){
//   console.log( err, res.body )
// })

urthecast.v1.event_streams( "/events", {}, function( err, res ){
  console.log( err, res.body )
})
