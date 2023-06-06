import "./App.css";
import { fetchCurrentWeather } from "./api";
import { useEffect, useState } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCurrentWeather(city)
      .then((weatherFromApi) => {
        setCurrentWeather(weatherFromApi);
      })
      .catch((error) => {
        return error;
      });
  }, [city]);

  function handleSubmit(e) {
    e.preventDefault();
    setCity(search);
  }

  return (
    <div>
      <h1>Weather Punx</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search by City</label>
        <input
          type="text"
          id="search"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <button>Search</button>
      </form>

      <ul>
        <li>Temp C - {currentWeather.temp_c}</li>
        <li>Temp F - {currentWeather.temp_f}</li>
      </ul>
    </div>
  );
}

export default App;
