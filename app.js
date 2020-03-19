//selecting html elements
const loczone = document.querySelector('.loc h1');
const country = document.querySelector('.loc h2');
const description = document.querySelector('.description');
const tempSection = document.querySelector('.temp');
const temp = document.querySelector('.temp-degree');
const degree = document.querySelector('.degree span');
const icon = document.querySelector('.icon-id');
const pvalue = document.querySelector('.pressure span');
const hvalue = document.querySelector('.humidity span');
const wsvalue = document.querySelector('.wind span');


//weather data
const weather = {};

//api key
const key = "82005d27a116c2880c8f0fcb866998a0";

//check if the browser supports the geolocaiton
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(getPosition);
}
else{
    alert("Either the browser does not support geolocation or you have turned off your location!!!!");
}

//get position coordinates and fetch all the information through api
function getPosition(position){
    let long = position.coords.longitude;
    let lat = position.coords.latitude;
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;
    
    fetch(api)
    .then(response =>{
        let data = response.json();
        return data;
    })
    .then(data => {
        weather.temperature = data.main.temp-273;
        weather.description = data.weather[0].description;
        weather.icon = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
        weather.pressure = data.main.pressure;
        weather.humidity = data.main.humidity;
        weather.windSpeed = data.wind.speed;
    })
    .then(() => {
        displayWeather();
    });
}

//function to convert temperature to fahrenheit
function celciusToFahrenheit(temp){
    return (temp * 9/5) + 32;
}

//when user click on the temperature 
tempSection.addEventListener('click', () => {
    if(degree.textContent === '°C'){
        degree.textContent = '°F';
        temp.textContent = Math.floor(celciusToFahrenheit(weather.temperature));
        }
        else{
        degree.textContent = '°C';
        temp.textContent = weather.temperature;
        }
    });

//display the weather
function displayWeather(){
    loczone.textContent = weather.city;
    country.textContent = weather.country;
    description.textContent = weather.description;
    temp.textContent = Math.floor(weather.temperature);
    icon.innerHTML = `<img src="icons/${weather.icon}.png"/>`;
    pvalue.textContent = weather.pressure;
    hvalue.textContent = weather.humidity;
    wsvalue.textContent = weather.windSpeed;
}