import "./App.css";
import { fetchCurrentWeather, fetchForecast } from "./api";
import { useEffect, useState } from "react";
import HourCard from "./components/HourCard";

function App() {
  const [currentWeather, setCurrentWeather] = useState({
    temp_c: "",
    temp_f: "",
    condition: { text: "", icon: "" },
  });
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [hourlyForecast, setHourlyForecast] = useState([]);

  const icon = currentWeather["condition"]["icon"];
  const description = currentWeather["condition"]["text"];

  useEffect(() => {
    fetchCurrentWeather(city)
      .then((weatherFromApi) => {
        setCurrentWeather(weatherFromApi);
      })
      .catch((error) => {
        return error;
      });
  }, [city]);

  useEffect(() => {
    fetchForecast(city)
      .then((forecastFromApi) => {
        setHourlyForecast(forecastFromApi);
      })
      .catch((error) => {
        return error;
      });
  }, [city]);

  function handleSubmit(e) {
    e.preventDefault();
    setCity(search);
  }

  console.log(hourlyForecast[0]["time"]);

  return (
    <main>
      <h1>Weather Punx</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="search"
          placeholder="search by city..."
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <button>Search</button>
      </form>
      <h2>{city}</h2>
      <div id="description">
        <img src={icon} alt="" />
        <p>{description}</p>
      </div>
      <ul id="current-weather">
        <li>{currentWeather.temp_c} C</li>
        <li>{currentWeather.temp_f} F</li>
      </ul>
      <ul id="hourly-weather">
        {hourlyForecast.map((hour) => (
          <HourCard key={hour.time_epoch} hour={hour} />
        ))}
      </ul>
    </main>
  );
}

export default App;
