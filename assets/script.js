var APIkey = "9bd853fdb52d1e3a072cf6f27f45a6b6"

var searchbtn = $("#searchbutton");

var historylist = [];

var cityinput = "";

cityinput = $("#searchinput").val();

function currentweather() {
    // gets the data from open weather api to display the current weather
    var current = $("#currentweather");
    var rightNow = dayjs().format("(MM/DD/YYYY)");
    var cityinput = $("#searchinput").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityinput + "&appid=" + APIkey + "&units=imperial";
    fetch(queryURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var citynameEl = $('<h2>');
        // need to display icon
        var icon = data.weather[0].icon;
        var img = $("<img>");
        img.attr("src", "https://openweathermap.org/img/wn/" + icon + ".png");
        img.addClass("icon");
    
        var currenttemp = data.main.temp;
        var tempEl = $('<p>');
        tempEl.text("Temp: " + currenttemp + "°F");

        var currentwind = data.wind.speed;
        var windEl = $('<p>');
        windEl.text("Wind: " + currentwind + "MPH");

        var currenthum = data.main.humidity;
        var humEl = $('<p>');
        humEl.text("Humidity: " + currenthum + "%");

        citynameEl.append(cityinput + " " + rightNow, img);
        current.append(citynameEl);
        current.append(tempEl);
        current.append(windEl);
        current.append(humEl);
    
    var lat = data.coord.lat;
    var lon = data.coord.lon;

    // gets the data from open weather api to display the 5 day forecast
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey + "&units=imperial";
    fetch(forecastURL)
    .then(response => response.json())
    .then(function(response) {
        console.log(response);
        for(var i=0; i<5; i++){
            var iconi = response.list[i].weather[0].icon;
            var img2 = $("<img>");
            img2.attr("src", "https://openweathermap.org/img/wn/" + iconi + ".png");
            img2.addClass("icon");
            date = moment().add(i+1, "d").format("MM/DD/YYYY");
            var templateString = '<article class="card"><p>' + date + '</p><p>'
            + "Temp: " + response.list[i].main.temp + "°F" + '</p><p>' 
            + "Wind: " + response.list[i].wind.speed + "MPH" + '</p><p>' 
            + "Humidity: " + response.list[i].main.humidity + "%" + '</p></article>';
            $('#forecast').append(templateString);
            $('#forecast').append(img2);
        }})})
   
}


// stores city info
var savecity = () => {
    localStorage.setItem('city' + localStorage.length, $("#searchinput").val());
}

// appends new searches to previous locations tab
var pastcity = () => {
    $('#history').empty();
        let lastCityKey="city"+(localStorage.length-1);
        lastCity=localStorage.getItem(lastCityKey);
        for (let i = 0; i < localStorage.length; i++) {
            let city = localStorage.getItem("city" + i);
            var newcity;
            if (cityinput===""){
                cityinput=lastCity;
            }
            if (city === cityinput) {
                newcity = `<button type="button" class="list-group-item list-group-item-action btn">${city}</button></li>`;
            } else {
                newcity = `<button type="button" class="list-group-item list-group-item-action btn">${city}</button></li>`;
            } 
            $('#history').append(newcity);
        }
}


// sample url: https://api.openweathermap.org/data/2.5/forecast?lat=39.7392&lon=-104.9847&appid=9bd853fdb52d1e3a072cf6f27f45a6b6

// displays the forecast on search click
searchbtn.on("click", (event) => {
    event.preventDefault();
    $("#currentweather").empty();
    $("#forecast").empty();
    currentweather();
    savecity();
    pastcity();
})

// displays forecast for the search history buttons
$("#history").on("click", (event) => {
    event.preventDefault();
    nextcity=$("#history").val();
    $("#currentweather").empty();
    $("#forecast").empty();
    currentweather(nextcity);
})
