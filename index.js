
var searchBtn = $("#search-btn");
var currentDate = dayjs().format("MM/DD/YYYY");
var wraperDivEl = $("#wrapper-div");
var city = $("#user-input").val().toLowerCase().trim();

localStorage.clear();

searchBtn.on("click", function(event){
  event.preventDefault();
  WeatherConditionApiCall();  
});

function WeatherConditionApiCall() {
  var city = $("#user-input").val().toLowerCase().trim();
  var currentWeatherApiKey = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=db39f54408315ce8f4c7ba5f7fcc11fb&units=imperial&speed=miles/hour";
  fetch(currentWeatherApiKey).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        CurrentWeather(data);
    });
  } else {
      alert("404 Error: Could not found");
  }
  });

  var fiveDayWeatherApiKey = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=698b706d240fcf2ea1163a991d280698&units=imperial&speed=miles/hour";
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

    var city = $("#user-input").val().toLowerCase().trim();
    var mainDiv = $("#main-div");
    mainDiv.text("");
    var divEl = $("<div>").attr("class", "container col card mb-4 rounded-3 shadow-sm");
    mainDiv.append(divEl);
    var innerDivEl = $("<div>").attr("class","card-body");
    divEl.append(innerDivEl);
    var titleEl = $("<h4>").attr("class","my-0 fw-normal").attr("id","title-"+1);
    titleEl.text(city +" " + currentDate);
    innerDivEl.append(titleEl);
    var listEl = $("<ul>").attr("class","list-unstyled mt-3 mb-4");
    innerDivEl.append(listEl);
    
    var li1El = $("<li>").attr("id","temp-"+1).text("Temperature: " + data.main.temp +"F");
    listEl.append(li1El);
    var li2El = $("<li>").attr("id","humidity-"+1).text("Humidity: " + data.main.humidity + "%");
    listEl.append(li2El);
    var li3El = $("<li>").attr("id","wind-"+1).text("Wind: " + data.wind.speed + "mph");
    listEl.append(li3El);

    setWeatherDataToLocalStorage(data);
}


function fiveDayDisplay(data) {

  var city_value = $("#user-input").val().toLowerCase().trim();
  var cardsDivEl = $("#cards-div");
  cardsDivEl.text("");
  saveDatafiveDay = [];
  var element_id_index = 2
  for (var i=1; i<data.list.length; i+=8) {
    var dateEl = data.list[i].dt_txt.split(" ")[0];
    var tempEl = data.list[i].main.temp;
    var humidityEl = data.list[i].main.humidity;
    var windEl = data.list[i].wind.speed;
    
    var divEl = $("<div>").attr("class", "container col card mb-4 rounded-3 shadow-sm");
    cardsDivEl.append(divEl);
    var innerDivEl = $("<div>").attr("class","card-body");
    divEl.append(innerDivEl);
    var titleEl = $("<h4>").attr("class","my-0 fw-normal").attr("id","title-"+(element_id_index));
    titleEl.text(city_value + " " + dateEl);
    innerDivEl.append(titleEl);
    var listEl = $("<ul>").attr("class","list-unstyled mt-3 mb-4");
    innerDivEl.append(listEl);
    var li1El = $("<li>").attr("id","temp-"+(element_id_index)).text("Temperature: " + tempEl +"F");
    listEl.append(li1El);
    var li2El = $("<li>").attr("id","humidity-"+(element_id_index)).text("Humidity: " + humidityEl +"%");
    listEl.append(li2El);
    var li3El = $("<li>").attr("id","wind-"+(element_id_index++)).text("Wind: " + windEl + "mph");
    listEl.append(li3El);

    var fiveDayObj = {
      city: city_value,
      date: dateEl,
      temperature: tempEl,
      humidity: humidityEl,
      wind: windEl,
    }
    saveDatafiveDay.push(fiveDayObj);
  }
    setFiveDaysToStorage(city_value,saveDatafiveDay);
}


function setWeatherDataToLocalStorage(data) {
    var city_value = $("#user-input").val().toLowerCase().trim();
    var CurrentDayweatherObj = [
      {
        city: city_value,
        date: currentDate,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        wind: data.wind.speed
      }]
    var savetoLocalStorage1 = localStorage.setItem(city_value,JSON.stringify(CurrentDayweatherObj));
}



function setFiveDaysToStorage(city,arrayOfFiveDays) {

    var cityWeatherDataArray = JSON.parse(localStorage.getItem(city));
    cityWeatherDataArray = cityWeatherDataArray.concat(arrayOfFiveDays);
    localStorage.setItem(city,JSON.stringify(cityWeatherDataArray));
    displaySixDaysWeather(cityWeatherDataArray);
}


function displaySixDaysWeather(sixDaysWeather) {
  
    var searchHistoryContainerEl = $("#searchHistoryContainer");
    var btnHistoryCity = $("<button>").text(sixDaysWeather[0].city);
    var cityHistory = sixDaysWeather[0].city;
    searchHistoryContainerEl.append(btnHistoryCity);
    
    btnHistoryCity.on("click", function(event){
      event.preventDefault();
      displayResultsFromDataCity(event.target.innerText);
    })
    };

  
  function displayResultsFromDataCity(city){

    var sixDaysWeather =(JSON.parse(localStorage.getItem(city)));
    for (var i =0; sixDaysWeather.length > i; i++){
      var titleEl = $("#title-"+(i+1)).text(sixDaysWeather[i].city + " " + sixDaysWeather[i].date);
      var li1El = $("#temp-"+(i+1)).text("Temperature: " + sixDaysWeather[i].temperature +"F");
      var li2El = $("#humidity-"+(i+1)).text(sixDaysWeather[i].humidity + "%");
      var li3El = $("#wind-"+(i+1)).text(sixDaysWeather[i].wind + "mph");
  }};

 
  


