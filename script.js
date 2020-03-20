$(document).ready(function () {

    // DOM elements
    var cityInputEl = $("#cityInput");
    var searchButton = $("button");
    var cityHistoryDiv = $(".city-history-div");
    var cityNameDisplay = $("#cityDisplay");
    var dateDisplay = $("#dateDisplay");
    var weatherIcon = $("#weatherIcon");

    // Event function
    var searchCity = function () {
        event.preventDefault();

        // Query URL variables
        var apiKey = "2b3fd2d1da58a021b07a4c6c75acd193";
        var cityName;
        var queryURL;

        // Moment.js
        var today = moment().format("l");
        var tomorrow = moment().add(1, "days").format("l");
        var twoDays = moment().add(2, "days").format("l");
        var threeDays = moment().add(3, "days").format("l");
        var fourDays = moment().add(4, "days").format("l");
        var fiveDays = moment().add(5, "days").format("l");

        // redefine query variables to match city input
        cityName = cityInputEl.val().trim();
        queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

        // AJAX call
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

            // populate DOM
            cityNameDisplay.text(cityName + " ");
            dateDisplay.text(" (" + today + ") ");
            weatherIcon.attr("src", iconURL);

            // create search history button
            var cityHistory = $("<p>").text(cityName).attr("class", "city-history");
            cityHistoryDiv.append(cityHistory);


        });
    };

    // Event listener
    searchButton.on("click", searchCity);

});




