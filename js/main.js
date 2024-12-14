const apiKey = '152fae011d2e437e970192107241412';

// Function to fetch weather data using the 'q' method (city name) for a forecast
async function fetchForecast(city) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

    const response = await fetch(url);
    const data = await response.json();


    console.log(data);
    return data;
}
// make a listener on change for the input with id search
document.getElementById('search').addEventListener('change', function () {
    const city = this.value;
    if (city.trim() === '') return; // do nothing if the input is empty

    fetchForecast(city).then(data => {
        updateTodayWeather(data);
        updateTmrWeather(data);
        updateAfterTmrWeather(data);
    });
});


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
function updateTodayWeather(data) {

    // today forecast
    const today_degree = document.querySelector('.today .degree');
    const today_location = document.querySelector('.today .location');
    const today_weather = document.querySelector('.today .description');
    const today_humidity = document.querySelector('.today .humidity');
    const today_wind = document.querySelector('.today .wind');
    const today_direction = document.querySelector('.today .direction');

    const today_weather_img = document.querySelector('.today img');

    const today_day = document.querySelector('.forecast-header .day');
    const today_date = document.querySelector('.forecast-header .date');

    // display the forecast data
    today_degree.innerHTML = `${data.current.temp_c}<sup>o</sup>C`;
    today_location.innerHTML = `${data.location.name}, ${data.location.country}`;
    today_weather.innerHTML = `${data.current.condition.text}`;
    today_humidity.innerHTML = `${data.current.humidity}%`;
    today_wind.innerHTML = `${data.current.wind_kph}km/h`;
    today_direction.innerHTML = `${data.current.wind_dir}`;

    today_weather_img.src = data.current.condition.icon;

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const d = new Date(data.forecast.forecastday[0].date);
    today_day.innerHTML = days[d.getDay()];
    today_date.innerHTML = `${d.getDate()} ${months[d.getMonth()]}`;
}
function updateTmrWeather(data) {
    // tmr forecast
    const tmr_degree = document.querySelector('.tmr .degree');
    const tmr_weather = document.querySelector('.tmr .description');

    const tmr_weather_img = document.querySelector('.tmr img');

    const tmr_day = document.querySelector('.tmr .forecast-header .day');

    const tmr_min_temp = document.querySelector('.tmr .forecast-body small');

    tmr_degree.innerHTML = `${data.forecast.forecastday[1].day.avgtemp_c}<sup>o</sup>C`;
    tmr_min_temp.innerHTML = `${data.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C`;
    tmr_weather.innerHTML = `${data.forecast.forecastday[1].day.condition.text}`;
    tmr_weather_img.src = data.forecast.forecastday[1].day.condition.icon;

    const d2 = new Date(data.forecast.forecastday[1].date);
    tmr_day.innerHTML = days[d2.getDay()];
}
function updateAfterTmrWeather(data) {
    //after tmr forecast
    const afterTmr_degree = document.querySelector('.afterTmr .degree');
    const afterTmr_weather = document.querySelector('.afterTmr .description');

    const afterTmr_weather_img = document.querySelector('.afterTmr img');

    const afterTmr_day = document.querySelector('.afterTmr .forecast-header .day');

    const afterTmr_min_temp = document.querySelector('.afterTmr .forecast-body small');

    afterTmr_degree.innerHTML = `${data.forecast.forecastday[2].day.avgtemp_c}<sup>o</sup>C`;
    afterTmr_min_temp.innerHTML = `${data.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C`;
    afterTmr_weather.innerHTML = `${data.forecast.forecastday[2].day.condition.text}`;
    afterTmr_weather_img.src = data.forecast.forecastday[2].day.condition.icon;

    const d3 = new Date(data.forecast.forecastday[2].date);
    afterTmr_day.innerHTML = days[d3.getDay()];
}

// default display
fetchForecast("cairo").then(data => {
    updateTodayWeather(data);
    updateTmrWeather(data);
    updateAfterTmrWeather(data);
    document.querySelector('.forecasts').classList.remove('opacity-0'); // remove opacity on load for better UX
});