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
    document.getElementById("temperature-description").innerHTML = data.weather[0].description;
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
  }else if(city === ""){
    alert(`Please enter a city first.`);
  }
  else{
    alert(`Enter a valid city name.`);

  }
}

checkWeather("delhi");

searchBtn.addEventListener("click", () => {
  checkWeather(searchCity.value);
});
