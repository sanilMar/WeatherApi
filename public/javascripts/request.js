// City List Data to make the API Call
var cityWeatherURL = ['http://api.wunderground.com/api/251b7f58724e2b87/geolookup/conditions/q/NE/Omaha.json',
                        'http://api.wunderground.com/api/251b7f58724e2b87/geolookup/conditions/q/CA/Campbell.json',
                        'http://api.wunderground.com/api/251b7f58724e2b87/geolookup/conditions/q/TX/Austin.json',
                        'http://api.wunderground.com/api/251b7f58724e2b87/geolookup/conditions/q/MD/Timonium.json'];
var weatherList = "";
// DOM Ready 
$(document).ready(function() {
    // Populate the weather Table on the load
    for (i=0;i<cityWeatherURL.length;i++) {
       populateWeatherTable(cityWeatherURL[i]);
    }
});

// Functions 

function populateWeatherTable(url) {

    // Empty content string
    var rowforCity = '';
    // jQuery AJAX call for JSON
     $.ajax({
         url : url,
         dataType : "jsonp",
        success : function(data) {
        // For each item in our JSON, add a table row and cells to the row for a city
            rowforCity += '<tr>';
            rowforCity += '<td>' + data['location']['city'] +  '</td>';
            rowforCity += '<td>' + data['location']['state'] + '</td>';
            rowforCity += '<td>'+  data['current_observation']['temp_f'] + '</td>';
            rowforCity += '<td>' + data['current_observation']['dewpoint_f'] +'-'+ data['current_observation']['heat_index_f'] +  '</td>';
            rowforCity += '<td><img src= "' + data['current_observation']['icon_url'] + '" alt="Current Weather"/></td>';
            rowforCity += '</tr>';
            weatherList+=rowforCity;
            // Inject the whole content string into our existing HTML table
            $('#cityListajax table tbody').html(weatherList);
    }
    });

};
