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
    // 5-Day forecast DOM
    var day1 = $("#day1");
    var day2 = $("#day2");
    var day3 = $("#day3");
    var day4 = $("#day4");
    var day5 = $("#day5");
    var temp1 = $("#temp1");
    var temp2 = $("#temp2");
    var temp3 = $("#temp3");
    var temp4 = $("#temp4");
    var temp5 = $("#temp5");
    var humid1 = $("#humid1");
    var humid2 = $("#humid2");
    var humid3 = $("#humid3");
    var humid4 = $("#humid4");
    var humid5 = $("#humid5");
    var icon1 = $("#foreIcon1");
    var icon2 = $("#foreIcon2");
    var icon3 = $("#foreIcon3");
    var icon4 = $("#foreIcon4");
    var icon5 = $("#foreIcon5");

    // Moment.js
    var today = moment().format("l");
    var tomorrow = moment().add(1, "days").format("l");
    var twoDays = moment().add(2, "days").format("l");
    var threeDays = moment().add(3, "days").format("l");
    var fourDays = moment().add(4, "days").format("l");
    var fiveDays = moment().add(5, "days").format("l");

    // Display times
    dateDisplay.text(" (" + today + ") ");
    day1.text(tomorrow);
    day2.text(twoDays);
    day3.text(threeDays);
    day4.text(fourDays);
    day5.text(fiveDays);

    // function AJAX 0.5 (for using local storage instead of input for renderLastCity function)
    var ajaxOneHalf = function () {

        // query variables AJAX call 0.5
        var apiKey = "2b3fd2d1da58a021b07a4c6c75acd193";
        var cityName = localStorage.getItem("city");
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

        // AJAX call 0.5
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
            weatherIcon.attr("src", iconURL);
            tempDisplay.text("Temperature: " + tempF.toFixed(1) + " \xB0F");
            humidDisplay.text("Humidity: " + humidity + "%");
            windDisplay.text("Wind Speed: " + windMPH + "mph");

            // create search history button
            var cityHistory = $("<p>").text(cityName).attr("class", "city-history");
            cityHistoryDiv.append(cityHistory);
            // TO DO: conditionals for limiting number of renders and repeats

            ajaxTwo();
        });
    };

    // function AJAX call 1, with AJAX call 2 inside
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

    // function AJAX call 2, with AJAX 3 nested inside
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
        }).then(function (response3) {

            // arrays, keeping DOM elements together by index number
            var icons = [icon1, icon2, icon3, icon4, icon5];
            var temps = [temp1, temp2, temp3, temp4, temp5];
            var humids = [humid1, humid2, humid3, humid4, humid5];
            // array, collecting only the response3 indexes needed for the 5-day forecast, index mathes its DOM element
            var day = [response3.list[0], response3.list[8], response3.list[16], response3.list[24], response3.list[32]];
            console.log(day);

            for (var i = 0; i < 5; i++) {
                // getting icon ID from each forecast in day array, and assigning its icon url to matching image in DOM
                var iconCode = day[i].weather[0].icon;
                var iconAddress = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
                icons[i].attr("src", iconAddress);
                
                // getting temp from each forecast of day array, assigning to matching temp text in DOM
                var tK = day[i].main.temp;
                var tF = (1.8 * (tK - 271.15)) + 32;
                temps[i].text("Temp: " + tF.toFixed(1) + " \xB0F");
                console.log(tF.toFixed(1));

                // getting humidity from each forecast of day array, assigning to matching humidity text in DOM
                var hum = day[i].main.humidity;
                humids[i].text("Humidity: " + hum + "%");
                console.log(hum);
            }
        });
    };

    // Function to render last city search at beginning of page refresh
    // won't render anythign is local storage is empty
    var renderLastCity = function () {
        ajaxOneHalf();
    };

    // Event function
    var searchCity = function () {
        event.preventDefault();
        ajaxOne();
    };

    // EXECUTING FUNCTIONS
    // __________________________________________________________________________________________________________________________

    // Render last search on refresh
    renderLastCity();

    // Event listener executes searchCity, and its nested ajax call functions
    searchButton.on("click", searchCity);

});




