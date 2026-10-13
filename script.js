const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherDisplay = document.getElementById('weather-display');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const weatherIcon = document.getElementById('weather-icon');
const description = document.getElementById('description');

const API_KEY = 'c55768bff1d9b5f54860d9c032c56a7b';

async function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        updateUI(data); 
        
    } catch (error) {
        console.error("Network or input error:", error);
        weatherDisplay.textContent = 'Error fetching weather data. Please try again.';
    }
}

function updateUI(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    
    description.textContent = data.weather[0].description;
    
    
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
   
    weatherIcon.src = iconUrl;
    
    weatherDisplay.classList.remove('hidden');
    errorMessage.classList.add('hidden');
}



function handleSearch() {
    const city = cityInput.value.trim();
    if (city !== "") {
        getWeatherData(city);
    }
}
searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keydown', (event) => {
    // The event object contains data about the keystroke
    if (event.key === 'Enter') {
        handleSearch();
    }
});