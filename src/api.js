import axios from "axios";

const key = import.meta.env.VITE_SOME_KEY;

const weatherApi = axios.create({
  baseURL: "http://api.weatherapi.com/v1",
});

const fetchCurrentWeather = (city) => {
  return weatherApi
    .get(`/current.json?key=${key}&q=${city}&aqi=no`)
    .then((response) => {
      return response.data.current;
    });
};

export { fetchCurrentWeather };