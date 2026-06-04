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

    //shows UI of loading
    getWeatherBtn.textContent = "Loading...";
    //btn cant be clicked till fething data is completed
    getWeatherBtn.disabled = true;

    try {
      // weatherData or response is a PROMISE!! if we dont use await it simply returns a pending promise
      //every single promise is in a pending stage, to handle the promise we have put it inside try catch we could also do .then.catch chains
      // this weatherData is JSON version of response
      const weatherData = await getWeatherData(city);
      console.log(weatherData);

      displayWeather(weatherData);
    } catch (error) {
      showError();
    } finally {
      //shows what it supose to show before and after fetching
      getWeatherBtn.textContent = "Get Weather";
      // enables the btn to be clicked again
      getWeatherBtn.disabled = false;
    }
  });

  // Enter key click karne pe it works
  cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") getWeatherBtn.click();
  });

  // this async fucntion gets the data from server and converts that response into a usable JSON
  async function getWeatherData(city) {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const response = await fetch(URL);

    // better way of throwing error is to check at the same time it occurs
    if (!response.ok) throw new Error("no data found");

    const data = await response.json();
    console.log(data);

    return data;
  }

  function displayWeather(weatherData) {
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");

    // data has temp in kelvin
    let temp = weatherData.main.temp - 273;
    // now showing till only 2 decimal places
    temperature.textContent = `${temp.toFixed(2)} C`;
    description.textContent = `${weatherData.weather[0].description}`;
    cityName.textContent = `${weatherData.name}`;
  }

  function showError() {
    errorMessage.classList.remove("hidden");
    weatherInfo.classList.add("hidden");
  }
});
