
// What do I need to grab? I need to grab the search button, the input field
var searchBtn = $("#search-btn");
var currentDate = dayjs().format("MM/DD/YYYY");
var wraperDivEl = $("#wrapper-div");

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
    var city= $("#user-input").val().toLowerCase().trim();
    var mainDiv = $("#main-div");
    mainDiv.text("");
    var divEl = $("<div>").attr("class", "container col card mb-4 rounded-3 shadow-sm");
    mainDiv.append(divEl);
    var innerDivEl = $("<div>").attr("class","card-body");
    divEl.append(innerDivEl);
    var titleEl = $("<h4>").attr("class","my-0 fw-normal");
    titleEl.text(city +" " + currentDate);
    innerDivEl.append(titleEl);
    var listEl = $("<ul>").attr("class","list-unstyled mt-3 mb-4");
    innerDivEl.append(listEl);
    var li1El = $("<li>").text("Temperature: " + data.main.temp +"F");
    listEl.append(li1El);
    var li2El = $("<li>").text("Humidity: " + data.main.humidity + "%");
    listEl.append(li2El);
    var li3El = $("<li>").text("Wind: " + data.wind.speed + "mph");
    listEl.append(li3El);

    setWeatherDataToLocalStorage(data)
   
    
}

function fiveDayDisplay(data) {
  var city = $("#user-input").val().toLowerCase().trim();
  var cardsDivEl = $("#cards-div");
  cardsDivEl.text("");
  saveDatafiveDay = [];
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
    titleEl.text(city + " " + dateEl);
    innerDivEl.append(titleEl);
    var listEl = $("<ul>").attr("class","list-unstyled mt-3 mb-4");
    innerDivEl.append(listEl);
    var li1El = $("<li>").text("Temperature: " + tempEl +"F");
    listEl.append(li1El);
    var li2El = $("<li>").text("Humidity: " + humidityEl +"%");
    listEl.append(li2El);
    var li3El = $("<li>").text("Wind: " + windEl + "mph");
    listEl.append(li3El);

    var fiveDayObj = {
      City: city,
      Date: dateEl,
      Temperature: tempEl,
      Humidity: humidityEl,
      Wind: windEl,
    }
    saveDatafiveDay.push(fiveDayObj);
  }
  setFiveDaysToStorage(city,saveDatafiveDay);
  

}


function setFiveDaysToStorage(city,arrayOfFiveDays) {
  var cityWeatherDataArray = JSON.parse(localStorage.getItem(city));
  // console.log(cityWeatherDataArray);
  // console.log(arrayOfFiveDays)
  cityWeatherDataArray = cityWeatherDataArray.concat(arrayOfFiveDays); 
  localStorage.setItem(city,JSON.stringify(cityWeatherDataArray));
  
  var sixDaysWeather =(JSON.parse(localStorage.getItem(city)));
  console.log(sixDaysWeather);
  displaySixDaysWeather(sixDaysWeather);
  
}




function setWeatherDataToLocalStorage(data) {
  console.log("thi set current date is called")
    var city = $("#user-input").val().toLowerCase().trim();
    var CurrentDayweatherObj = [
      {
        city:city,
        Date: currentDate,
        Temperature: data.main.temp,
        Humidity: data.main.humidity,
        Wind: data.wind.speed
      }]
    // console.log(CurrentDayweatherObj)
    var savetoLocalStorage1 = localStorage.setItem(city,JSON.stringify(CurrentDayweatherObj));
    // console.log(savetoLocalStorage1);
}

// forloop the sixdaysweather array, for loop , building the same structure but with the new location of the city,wind,humidity(dote notation)
function displaySixDaysWeather(sixDaysWeather) {
  
  var prevBtnLocation = $("#prev-btn-location");
  for(var i =0; i <sixDaysWeather.length; i++){
    
    var btnHistoryCity = $("<button>").text(sixDaysWeather[i].city);
    prevBtnLocation.append(btnHistoryCity);
    btnHistoryCity.on("click", function(event){
      event.preventDefault();

      
      

      
      

    })
  }
}


