
// What do I need to grab? I need to grab the search button, the input field
var searchBtn = $("#search-btn");
var currentDate = dayjs().format("MM/DD/YYYY");



// what do I need to do? I need to extract information from the API weather. its done when
// I use the API key to access the current weather conditions

searchBtn.on("click", function(event){
  event.preventDefault();
  WeatherConditionApiCall();
});

function WeatherConditionApiCall() {
  var userInput = $("#user-input").val().toLowerCase().trim();
  var currentWeatherApiKey = "http://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=db39f54408315ce8f4c7ba5f7fcc11fb&units=imperial&speed=miles/hour";
  fetch(currentWeatherApiKey).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        CurrentWeather(data);
    });
  } else {
      alert("404 Error: Could not found");
  }
});

var fiveDayWeatherApiKey = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=698b706d240fcf2ea1163a991d280698&units=imperial&speed=miles/hour";
  fetch(fiveDayWeatherApiKey).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        fiveDayDisplay(data);
        
    });
  } else {
      alert("404 Error: Could not found");
  }
});

}

function CurrentWeather(data){
  var userInput = $("#user-input").val().toLowerCase().trim();
  var mainDiv = $("#main-div");
  mainDiv.text("");
  var divEl = $("<div>").attr("class", "container col card mb-4 rounded-3 shadow-sm");
  mainDiv.append(divEl);
  var innerDivEl = $("<div>").attr("class","card-body");
  divEl.append(innerDivEl);
  var titleEl = $("<h4>").attr("class","my-0 fw-normal");
  titleEl.text(userInput +" " + currentDate);
  innerDivEl.append(titleEl);
  var listEl = $("<ul>").attr("class","list-unstyled mt-3 mb-4");
  innerDivEl.append(listEl);
  var li1El = $("<li>").text("Temperature: " + data.main.temp);
  listEl.append(li1El);
  var li2El = $("<li>").text("Humidity: " + data.main.humidity);
  listEl.append(li2El);
  var li3El = $("<li>").text("Wind: " + data.wind.speed);
  listEl.append(li3El);

}

// Now I need to display a forecast for five days in 5 cards
// how its done? Its done when I create an api key,fetch, return data, manipulate it and disoplay on the screen

function fiveDayDisplay(data) {
  var userInput = $("#user-input").val().toLowerCase().trim();
  var cardsDivEl = $("#cards-div");
  cardsDivEl.text("");
  for (var i=1; i<data.list.length; i+=8) {
    var dateEl = data.list[i].dt_txt.split(" ")[0];
    var tempEl = data.list[i].main.temp;
    var humidityEl = data.list[i].main.humidity;
    var windEl = data.list[i].wind.speed;
    var divEl = $("<div>").attr("class", "container col card mb-4 rounded-3 shadow-sm");
    cardsDivEl.append(divEl);
    var innerDivEl = $("<div>").attr("class","card-body");
    divEl.append(innerDivEl);
    var titleEl = $("<h4>").attr("class","my-0 fw-normal");
    titleEl.text(userInput + " " + dateEl);
    innerDivEl.append(titleEl);
    var listEl = $("<ul>").attr("class","list-unstyled mt-3 mb-4");
    innerDivEl.append(listEl);
    var li1El = $("<li>").text("Temperature: " + tempEl);
    listEl.append(li1El);
    var li2El = $("<li>").text("Humidity: " + humidityEl);
    listEl.append(li2El);
    var li3El = $("<li>").text("Wind: " + windEl);
    listEl.append(li3El);
  
  }
}

// what noew? I need to create a list where previous search cities will appear.
// how: storing the input in the local storage and getting them


  

