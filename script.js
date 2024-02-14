document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const city = document.getElementById('city-input').value;
    fetchWeather(city);
    fetchForecast(city);
    updateSearchHistory(city);
});

function fetchWeather(city) {
    const apiKey = 'bb966a13af602227cb66e5540564223a';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        displayCurrentWeather(data);
    });
}

function fetchForecast(city) {
    const apiKey = 'bb966a13af602227cb66e5540564223a';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        displayForecast(data);
    });
}

function displayCurrentWeather(data) {
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

    const weatherDiv = document.getElementById('current-weather');
    weatherDiv.innerHTML = `
        <h2>Current Weather: ${data.name}</h2>
        <img src="${iconUrl}" alt="Weather icon"> 
        <p>Temperature: ${data.main.temp}°F</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function displayForecast(data) {
    const forecastDiv = document.getElementById('forecast-weather');
    forecastDiv.innerHTML = '<h2>5-Day Forecast</h2>';
    data.list.forEach((forecast, index) => {
        if (index % 8 === 0) { 
            forecastDiv.innerHTML += `
                <div>
                    <p>Date: ${forecast.dt_txt}</p>
                    <p>Temp: ${forecast.main.temp}°F</p>
                    <p>Humidity: ${forecast.main.humidity}%</p>
                </div>
            `;
        }
    });
}

function updateSearchHistory(city) {
    const historyUl = document.getElementById('search-history');
    const li = document.createElement('li');
    li.textContent = city;
    li.addEventListener('click', function() {
        fetchWeather(city);
        fetchForecast(city);
    });
    historyUl.appendChild(li);
}
