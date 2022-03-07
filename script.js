//Display current day and time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentDate = now.getDate();
let currentDay = days[now.getDay()];
let currentMonth = months[now.getMonth()];
let currentYear = now.getFullYear();
let currentHour = now.getHours();
let currentMinute = now.getMinutes();

if (currentMinute < 10) {
  currentMinute = `${currentMinute}`;
}
let today = document.querySelector("#current-date");
today.innerHTML = `${currentDay}, ${currentMonth} ${currentDate} ${currentYear}, 
${currentHour} : ${currentMinute}`;

//Search for city

let form = document.querySelector("#citysearch-form");
form.addEventListener("submit", search);

//Convert to Fahrenheit
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

//Convert to Celcius
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 31;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

//Search Engine search city and current temperature
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#enter-city");
  let apiKey = "b8ec6e97a77e294c84e7af04e23abe0c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function showWeather(response) {
  let h1 = document.querySelector("h1");
  let h2 = document.querySelector("h2");
  let temperature = Math.round(response.data.main.temp);
  h1.innerHTML = response.data.name;
  h2.innerHTML = `${temperature}°C`;
  let h3 = document.querySelector("h3");
  h3.innerHTML = response.data.weather[0].description;
  let h4 = document.querySelector("h4");
  h4.innerHTML = `Windspeed is ${response.data.wind.speed}`;
  let h6 = document.querySelector("h6");
  h6.innerHTML = `Min. ${Math.round(
    response.data.main.temp_min
  )}°C / Max. ${Math.round(response.data.main.temp_max)}°C`;
}

function searchLocation(position) {
  let apiKey = "b8ec6e97a77e294c84e7af04e23abe0c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

navigator.geolocation.getCurrentPosition(searchLocation);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
