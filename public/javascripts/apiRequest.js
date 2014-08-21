module.exports = function(url,callback){

var http = require('http');
  var optionsget = {
    host : 'api.wunderground.com', //  domain name
    path : '/api/251b7f58724e2b87/geolookup/conditions/q/'+url, // the rest of the url with parameters
    method : 'GET' // do GET
};

var weatherData = ""; 
 
// do the GET request
var reqGet = http.request(optionsget, function(response) {
    console.log("statusCode: ", response.statusCode);
    response.on('data', function(chunk) {
       weatherData += chunk;
    });
    response.on('end', function(chunk) {
      var obj = JSON.parse(weatherData);
      if(typeof(obj.response.error) === 'undefined')
        callback(null,obj);
      else
        callback(null,null);
    });
 
});
// timeout of 5 seconds
reqGet.setTimeout(5000, function(){
  console.log("Connection Timeout");
  callback(null,null);
}); 
//End of the Request/Response
reqGet.end();
// on Error
reqGet.on('error', function(e) {
    console.error(e);
    callback(null,null);
    //callback(e,null);
});
}