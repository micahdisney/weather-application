(function () {


var weather_info = $('.w_divcontent');
var h3 = $('h3');


///-----------------------------------------------------------------------------------//


    var requestedInfo = $.get("https://api.openweathermap.org/data/2.5/forecast/daily", {
    APPID: "8e215085dd374a78155aa7bdb365e857",
    lat: 29.423017,
    lon: -98.48527,
    cnt: 3,   //set to 3 day forecast
    units: "imperial"
});


    requestedInfo.done(function (data) {
    var days = data.list;
    $(h3).html(data.city.name);
    for (i = 0; i < data.list.length; i++) {
        var dayNumber = days[i];
        var temperature = dayNumber.temp;
        var icon = dayNumber.weather[0].icon;
        var description = dayNumber.weather[0].main;
        var subDescription = dayNumber.weather[0].description;
        var humidity = dayNumber.humidity;
        var wind = dayNumber.speed;
        var pressure = dayNumber.pressure;
        $(weather_info[i]).append("<p id='temp'>" + Math.round(temperature.max) + "°/" + Math.round(temperature.min) + "°" + "</p>");
        $(weather_info[i]).append("<img src='http://openweathermap.org/img/w/" + icon + ".png'>");
        $(weather_info[i]).append("<p>" + description + ": " + subDescription + "</p>");
        $(weather_info[i]).append("<p>Humidity: " + humidity + "</p>");
        $(weather_info[i]).append("<p>Wind: " + wind + "</p>");
        $(weather_info[i]).append("<p>Pressure: " + pressure + "</p>");
    }
    });


var mapOptions = {
    zoom: 4,
    center: {
        lat: 29.423017,    //San Antonio
        lng: -98.48527
    }
};


var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
var marker = new google.maps.Marker({
    draggable: true,
    position: mapOptions.center,
    map: map,
    title: "Your location"
});


google.maps.event.addListener(marker, 'dragend', function (event) {
    document.getElementById("lat").value = event.latLng.lat();
    document.getElementById("lon").value = event.latLng.lng();
    var lat = parseFloat($('#lat').val());
    var lon = parseFloat($('#lon').val());


    var requestedInfo = $.get("https://api.openweathermap.org/data/2.5/forecast/daily", {
        APPID: "8e215085dd374a78155aa7bdb365e857",
        lat: lat,
        lon: lon,
        cnt: 3,   //set to 3 day forecast
        units: "imperial"
    });



    requestedInfo.done(function (data) {
        var days = data.list;
        $(h3).html(data.city.name);
        $(weather_info).html('');
        for (i = 0; i < data.list.length; i++) {
            var dayNumber = days[i];
            var temperature = dayNumber.temp;
            var icon = dayNumber.weather[0].icon;
            var description = dayNumber.weather[0].main;
            var subDescription = dayNumber.weather[0].description;
            var humidity = dayNumber.humidity;
            var wind = dayNumber.speed;
            var pressure = dayNumber.pressure;
            $(weather_info[i]).append("<p id='temp'>" + Math.round(temperature.max) + "°/" + Math.round(temperature.min) + "°" + "</p>");
            $(weather_info[i]).append("<img src='http://openweathermap.org/img/w/" + icon + ".png'>");
            $(weather_info[i]).append("<p>" + description + ": " + subDescription + "</p>");
            $(weather_info[i]).append("<p>Humidity " + humidity + "</p>");
            $(weather_info[i]).append("<p>Wind: " + wind + "</p>");
            $(weather_info[i]).append("<p>Pressure: " + pressure + "</p>");
        }


    });
});




})();

