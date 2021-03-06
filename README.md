# Weather-Dashboard

An app that runs in the browser, and features dynamically updated HTML and CSS. It allows the user to retrieve weather data for multiple cities.

https://emijoha.github.io/Weather-Dashboard/

## APIs and Libraries

This application uses:
```
Skeleton.css
Font Awesome
jQuery
Moment.js
OpenWeather API: Current Weather
OpenWeather API: UV Index
OpenWeather API: 5-Day Forecast
```

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Functionality

```
GIVEN a clear weather dashboard with search inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
    WHEN I reach the max search history of 5
    THEN the oldest search history is cleared to accomadate the newest
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
    WHEN I view the UV index
    THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
AND I am also presented with previous search history
```

## Upcoming Features

When searching for a city that already exists in the search history,  a new search history button will not render. This will elimate repeated search history buttons.
