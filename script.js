// DOM elements
var cityInputEl = $("#cityInput");
var searchButton = $("button");
var searchHistoryDiv = $(".city-history-div");
var cityNameDisplay = $("#cityDisplay");
var dateDisplay = $("#dateDisplay");
var weatherIcon = $("#weatherIcon");

// Query URL variables
var apiKey = "2b3fd2d1da58a021b07a4c6c75acd193";
var cityName;
var queryURL;

// Event function
var searchCity = function () {
    event.preventDefault();

    // redefine query variables to match city input
    cityName = cityInputEl.val().trim();
    queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
   
    // AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
};

// Event listener
searchButton.on("click", searchCity);



