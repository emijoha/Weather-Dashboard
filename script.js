$(document).ready(function () {

    // DEFINING VARIABLES AND FUNCTIONS
    // __________________________________________________________________________________________________________________________

    // DOM elements
    var weatherResults = $(".eight");
    var cityInputEl = $("#cityInput");
    var searchButton = $("button");
    var cityHistoryDiv = $(".city-history-div");
    var cityNameDisplay = $("#cityDisplay");
    var dateDisplay = $("#dateDisplay");
    var weatherIcon = $("#weatherIcon");
    var tempDisplay = $("#temp");
    var humidDisplay = $("#humid");
    var windDisplay = $("#wind");
    var uvDisplay = $("#uv");
    var uvIndex = $("#uvIndex");

    // Moment.js
    var today = moment().format("l");
    var tomorrow = moment().add(1, "days").format("l");
    var twoDays = moment().add(2, "days").format("l");
    var threeDays = moment().add(3, "days").format("l");
    var fourDays = moment().add(4, "days").format("l");
    var fiveDays = moment().add(5, "days").format("l");

    // Render latest city search
    var renderLastCity = function () {

        // query variables AJAX call 1
        var apiKey = "2b3fd2d1da58a021b07a4c6c75acd193";
        var cityName = localStorage.getItem("city");
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

        // AJAX call 1
        $.ajax({

            url: queryURL,
            method: "GET"

        }).then(function (response) {

            console.log(response);

            // API variables
            var cityName = response.name;
            var tempK = response.main.temp;
            var tempF = (1.8 * (tempK - 271.15)) + 32;
            var humidity = response.main.humidity;
            var windMPH = response.wind.speed;
            var iconID = response.weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + iconID + "@2x.png";

            // display in HTML
            weatherResults.removeClass("hidden");
            cityNameDisplay.text(cityName + " ");
            dateDisplay.text(" (" + today + ") ");
            weatherIcon.attr("src", iconURL);
            tempDisplay.text("Temperature: " + tempF.toFixed(1) + " \xB0F");
            humidDisplay.text("Humidity: " + humidity + "%");
            windDisplay.text("Wind Speed: " + windMPH + "mph");

            // create search history button
            var cityHistory = $("<p>").text(cityName).attr("class", "city-history");
            cityHistoryDiv.append(cityHistory);
            // TO DO: conditionals for limiting number of renders and repeats

            // query URL variables (2nd AJAX call)
            var lat = localStorage.getItem("lat");
            var lon = localStorage.getItem("lon");
            var uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;

            $.ajax({

                url: uvQueryURL,
                method: "GET"

            }).then(function (response2) {

                console.log(response2);

                // API variables
                var uv = response2.value;

                // display in HTML
                uvDisplay.text("UV Index: ");
                uvIndex.text(uv);
                // TO DO: conditionals for color coding uv index display background

            });
        });
    };

    // Event function
    var searchCity = function () {

        event.preventDefault();

        // execute first ajax call, with second an d third nested within
        ajaxOne();

    };

    // function AJAX call 1
    var ajaxOne = function () {

        // Query URL variables
        var apiKey = "2b3fd2d1da58a021b07a4c6c75acd193";
        var cityName = cityInputEl.val().trim();
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

        // store city: 
        localStorage.setItem("city", cityName);

        // AJAX call 1
        $.ajax({

            url: queryURL,
            method: "GET"

        }).then(function (response) {

            console.log(response);

            // API variables
            var cityName = response.name;
            var tempK = response.main.temp;
            var tempF = (1.8 * (tempK - 271.15)) + 32;
            var humidity = response.main.humidity;
            var windMPH = response.wind.speed;
            var iconID = response.weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + iconID + "@2x.png";

            // city's coordinates needed for UV index (ajax call 2)
            localStorage.setItem("lat", response.coord.lat);
            localStorage.setItem("lon", response.coord.lon);

            // display in HTML
            weatherResults.removeClass("hidden");
            cityNameDisplay.text(cityName + " ");
            dateDisplay.text(" (" + today + ") ");
            weatherIcon.attr("src", iconURL);
            tempDisplay.text("Temperature: " + tempF.toFixed(1) + " \xB0F");
            humidDisplay.text("Humidity: " + humidity + "%");
            windDisplay.text("Wind Speed: " + windMPH + "mph");

            // create search history button
            var cityHistory = $("<p>").text(cityName).attr("class", "city-history");
            cityHistoryDiv.append(cityHistory);
            // TO DO: conditionals for limiting number of renders and repeats

            // execute second AJAX call
            ajaxTwo();

        });
    };

    // function AJAX call 2
    var ajaxTwo = function () {

        // query URL variables (2nd AJAX call)
        var apiKey = "2b3fd2d1da58a021b07a4c6c75acd193";
        var lat = localStorage.getItem("lat");
        var lon = localStorage.getItem("lon");
        var uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;

        $.ajax({

            url: uvQueryURL,
            method: "GET"

        }).then(function (response2) {

            console.log(response2);

            // API variables
            var uv = response2.value;

            // display in HTML
            uvDisplay.text("UV Index: ");
            uvIndex.text(uv);
            // TO DO: conditionals for color coding uv index display background

        });

        ajaxThree();
    };

    // function ajax call 3
    var ajaxThree = function () {

        // Query URL variables
        var apiKey = "2b3fd2d1da58a021b07a4c6c75acd193";
        var cityName = localStorage.getItem("city");
        var fiveQueryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;
        
        $.ajax({

            url: fiveQueryURL,
            method: "GET"

        }).then(function(response3) {

            console.log(response3);

        });

    };

    // EXECUTING FUNCTIONS
    // __________________________________________________________________________________________________________________________

    // Render last search on refresh
    renderLastCity();

    // Event listener executes searchCity, and its nested ajax call functions
    searchButton.on("click", searchCity);

});




