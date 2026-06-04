document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const weatherInfo = document.getElementById("weather-info");
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "f229eb16c605fd3d73067d49bae7a28a";

  getWeatherBtn.addEventListener("click", async (e) => {
    const city = cityInput.value.trim();
    if (!city) return;
    cityInput.value = "";

    try {
      const weatherData = await getWeatherData(city);
      console.log(weatherData);

      if (!weatherData.ok) throw new Error("no data found");

      const data = await weatherData.json();
      console.log(data);

      displayWeather(data);
    } catch (error) {
      showError();
    }
  });

  async function getWeatherData(city) {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const response = await fetch(URL);

    return response;
  }

  function displayWeather(data) {
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");

    // data has temp in kelvin
    let temp = data.main.temp - 273;
    // now showing till only 2 decimal places
    temperature.textContent = `${temp.toFixed(2)} C`;
    description.textContent = `${data.weather[0].description}`;
    cityName.textContent = `${data.name}`;
  }

  function showError() {
    errorMessage.classList.remove("hidden");
    weatherInfo.classList.add("hidden");
  }
});
