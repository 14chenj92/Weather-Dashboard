var APIkey = "9bd853fdb52d1e3a072cf6f27f45a6b6"

var searchbtn = $("#searchbutton");

var historylist = [];

function currentweather() {
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
        var iconEl = $('<img>');
        iconEl.attr("src", `https://openweathermap.org/img/wn/${icon}.png`);

        var currenttemp = data.main.temp;
        var tempEl = $('<p>');
        tempEl.text("Temp: " + currenttemp + "°F");

        var currentwind = data.wind.speed;
        var windEl = $('<p>');
        windEl.text("Wind: " + currentwind + "MPH");

        var currenthum = data.main.humidity;
        var humEl = $('<p>');
        humEl.text("Humidity: " + currenthum + "%");

        citynameEl.text(cityinput + " " + rightNow);
        current.append(citynameEl);
        current.append(iconEl);
        current.append(tempEl);
        current.append(windEl);
        current.append(humEl);
    
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey + "&units=imperial";
    fetch(forecastURL)
    .then(response => response.json())
    .then(function(response) {
        console.log(response);
        for(var i=0; i<5; i++){
            date = moment().add(i+1, "d").format("MM/DD/YYYY");
            var templateString = '<article class="card"><p>' + date + '</p><p>' + iconEl + '</p><p>'
            + "Temp: " + response.list[i].main.temp + "°F" + '</p><p>' 
            + "Wind: " + response.list[i].wind.speed + "MPH" + '</p><p>' 
            + "Humidity: " + response.list[i].main.humidity + "%" + '</p></article>';
            $('#forecast').append(templateString);
        }})})
   
}

var cityinput = $("#searchinput").val();

function savehistory() {
        
        if (historylist.includes(cityinput.value) === false) {
            historylist.push(cityinput.value);
        var cityEl;
    localStorage.setItem("city", historylist);
    var searchedcity = $(`<button type="button" class="list-group-item">${cityinput}</button></li>`);
    $("#history").append(searchedcity);
    } }



// https://api.openweathermap.org/data/2.5/forecast?lat=39.7392&lon=-104.9847&appid=9bd853fdb52d1e3a072cf6f27f45a6b6

searchbtn.on("click", (event) => {
    event.preventDefault();
    currentweather();
    savehistory();
})

