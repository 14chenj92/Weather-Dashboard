var APIkey = "9bd853fdb52d1e3a072cf6f27f45a6b6"


var searchbtn = $("#searchbutton");



var city;

function getweather() {
    var current = $("#currentweather");
    var rightNow = dayjs().format("dddd, MMMM D");
    var cityinput = $("#searchinput").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityinput + "&appid=" + APIkey + "&units=imperial";
    fetch(queryURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var currenttemp = data.main.temp;
        var tempEl = $('<p>');
        tempEl.text("Temp: " + currenttemp + "°F");

        var currentwind = data.wind.speed;
        var windEl = $('<p>');
        windEl.text("Wind: " + currentwind + "MPH");

        var currenthum = data.main.humidity;
        var humEl = $('<p>');
        humEl.text("Humidity: " + currenthum + "%");

        var cityNameEl = $('<p>');
        cityNameEl.text(cityinput + " " + rightNow);
        current.append(cityNameEl);
        current.append(tempEl);
        current.append(windEl);
        current.append(humEl);
})
}

searchbtn.on("click", getweather);
