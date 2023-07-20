const toggle = document.getElementById('toggle');
toggle.onclick = function(){
  document.getElementById('body').classList.toggle('active');
  toggle.classList.toggle('active');
}

// accessing latitude and longitude using js geolocation
const success = async (position) => {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  // accessing current location using coordinates
  const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

  // fetching the api for location via coordinates
  await fetch(geoApiUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById("current-location").innerText = data.city;

      // current city will be the default city
      checkWeather(data.city);
    });
};

const error = () => {
  console.log("cann't fetch the location.");
};

navigator.geolocation.getCurrentPosition(success, error);

// accessing current day
const date = new Date();
let day = document.getElementById("current-day");
switch (date.getDay()) {
  case 1:
    day.innerText = "Monday";
    break;
  case 2:
    day.innerText = "Tuesday";
    break;
  case 3:
    day.innerText = "Wednesday";
    break;
  case 4:
    day.innerText = "Thursday";
    break;
  case 5:
    day.innerText = "Friday";
    break;
  case 6:
    day.innerText = "Saturday";
    break;
  default:
    day.innerText = "Sunday";
    break;
}

// accessing current month
let month = document.getElementById("current-month");
switch (date.getMonth()) {
  case 0:
    month.innerText = "January";
    break;
  case 1:
    month.innerText = "February";
    break;
  case 2:
    month.innerText = "March";
    break;
  case 3:
    month.innerText = "April";
    break;
  case 4:
    month.innerText = "May";
    break;
  case 5:
    month.innerText = "June";
    break;
  case 6:
    month.innerText = "July";
    break;
  case 7:
    month.innerText = "August";
    break;
  case 8:
    month.innerText = "September";
    break;
  case 9:
    month.innerText = "October";
    break;
  case 10:
    month.innerText = "November";
    break;
  default:
    month.innerText = "December";
    break;
}

// accessing current date
document.getElementById("current-date").innerText = date.getDate();

// accessing current year
document.getElementById("current-year").innerText = date.getFullYear();

const api_key = "85548261cbb59d0320841f4bf8d95789";
const api_url =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchCity = document.getElementById("search-city-name");
const searchBtn = document.getElementById("search-btn");

async function checkWeather(city) {
  const response = await fetch(api_url + city + `&appid=${api_key}`);
  if (response.status === 200) {
    var data = await response.json();
    console.log(data);

    document.getElementById("location").innerHTML = data.name;

    icon_code = data.weather[0].icon;
    icon_url = `https://openweathermap.org/img/wn/${icon_code}@2x.png`;
    weather_icon = document.getElementById("weather-icon");
    weather_icon.src = icon_url;

    temperature = data.main.temp;
    document.getElementById("temperature").innerHTML = Math.trunc(temperature);
    document.getElementById("temperature-description").innerHTML =
      data.weather[0].description;
    document.getElementById("humidity").innerHTML = data.main.humidity + " %";
    document.getElementById("pressure").innerHTML = data.main.pressure + " hPa";
    document.getElementById("wind-speed").innerHTML = data.wind.speed + " m/s";

    // Conversion of wind-degree into direction
    wind_degrees = data.wind.deg;
    directions = [
      "north",
      "northeast",
      "east",
      "southeast",
      "south",
      "southwest",
      "west",
      "northwest",
    ];
    wind_degrees = (wind_degrees * 8) / 360;
    wind_degrees = Math.round(wind_degrees, 0);
    wind_degrees = (wind_degrees + 8) % 8;
    document.getElementById("wind-direction").innerHTML =
      directions[wind_degrees];

    //  function of converting unix timestamp to localtime
    function unixtime(timestamp) {
      let date = new Date(timestamp * 1000);
      return date.toLocaleTimeString();
    }
    sunrise = data.sys.sunrise;
    document.getElementById("sunrise").innerHTML = unixtime(sunrise);
    sunset = data.sys.sunset;
    document.getElementById("sunset").innerHTML = unixtime(sunset);
  } else if (city === "") {
    alert(`Please enter a city first.`);
  } else {
    alert(`Enter a valid city name.`);
  }
}

// if someone doesn't allow location permission then the default value of city will be Delhi.
checkWeather("Delhi");

searchBtn.addEventListener("click", () => {
  checkWeather(searchCity.value);
});
