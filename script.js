document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const city = document.getElementById('city-input').value;
    fetchWeather(city);
    fetchForecast(city);
    updateSearchHistory(city);
});

function fetchWeather(city) {
    const apiKey = 'bb966a13af602227cb66e5540564223a';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        displayCurrentWeather(data);
    });
}

