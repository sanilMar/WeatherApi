var express = require('express');
var router = express.Router();
var apiRequest = require('../public/javascripts/apiRequest');
var cityList = require('../public/javascripts/cityList');
var async = require('async');
// middleware to capture all incoming requests
router.use(function(req, res, next) {
	//  logging
	console.log('The Request URL hit is %s', req.url);
	console.log('THe Query Parms passed are : %s', JSON.stringify(req.query));
	console.log('The post params passed are : %j' , req.body);
	next(); //go to the next routes and don't stop here
});

/* GET the Weather for the cities */
router.get('/getweatherajax', function(req, res) {
    res.render('currentweatherajax', { title: 'Wunderground Weather' })
});


router.get('/getweather',function read(req, res) {
	async.map(cityList, apiRequest, function (err, weatherResults) {
		  if(!err) {
		  	weatherResults.clean(null); // clean for null values
		    res.render('currentweather',{ title: 'Wunderground Weather' , results : weatherResults});
		  } else {
		    console.log('Error: ' + err);
		  }

	});

});

module.exports = router;
