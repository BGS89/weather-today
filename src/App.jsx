import "./App.css";
import { fetchCurrentWeather } from "./api";
import { useEffect, useState } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState({
    temp_c: "",
    temp_f: "",
    condition: { text: "", icon: "" },
  });
  const [city, setCity] = useState(" ");
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

  console.log(currentWeather);

  const icon = currentWeather["condition"]["icon"];

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
      <h3>Current Weather</h3>
      <img src={icon} alt="" />
      <p>{currentWeather["condition"]["text"]}</p>
      <ul>
        <li>{currentWeather.temp_c} C</li>
        <li>{currentWeather.temp_f} F</li>
      </ul>
    </main>
  );
}

export default App;
