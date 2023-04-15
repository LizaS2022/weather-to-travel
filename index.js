
var CurrentDateEl = $("#current-date");
var UserCityChoiceEl = $("#user-input");

var formEl = $("#user-form");
var searchBtnEl = $("#search-btn");

// // dynamic date component for the header
CurrentDateEl.text(dayjs().format("MM/DD/YYYY"));

// // taking user input and extracting the data for the city weather


searchBtnEl.on("click", function(event){
  event.preventDefault()
  var cityInputEl = UserCityChoiceEl.val().toLowerCase().trim();
  var currentWeatherAPIKey = "https://api.openweathermap.org/data/2.5/weather?q="+ cityInputEl +"&appid=db39f54408315ce8f4c7ba5f7fcc11fb";
  fetch(currentWeatherAPIKey)
  .then(function (response) {
    return response.json();
  })
  .then (function(data){
    console.log(data.main.temp);
    console.log(data.main.humidity);
    console.log(data.wind.speed);
  }) 
    
  });












  