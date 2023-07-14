import axios from "axios";

const key = import.meta.env.VITE_SOME_KEY;

const weatherApi = axios.create({
  baseURL: "https://api.weatherapi.com/v1",
});

const fetchCurrentWeather = (city) => {
  return weatherApi
    .get(`/current.json?key=${key}&q=${city}&aqi=no`)
    .then((response) => {
      return response.data.current;
    });
};

const fetchForecast = (city) => {
  return weatherApi
    .get(`/forecast.json?key=${key}&q=${city}&days=3&aqi=n0&alerts=no`)
    .then((response) => {
      return response.data.forecast.forecastday["0"].hour;
    });
};

export { fetchCurrentWeather, fetchForecast };
