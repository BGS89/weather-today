import "./App.css";
import { fetchCurrentWeather } from "./api";
import { useEffect, useState } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState({});
  const weatherArr = currentWeather;

  useEffect(() => {
    fetchCurrentWeather("Brighton")
      .then((weatherFromApi) => {
        setCurrentWeather(weatherFromApi);
      })
      .catch((error) => {
        return error;
      });
  }, []);

  console.log(currentWeather);
  return (
    <div>
      <h1>Weather Punx</h1>

      <ul>
        <li>Temp C - {currentWeather.temp_c}</li>
        <li>Temp F - {currentWeather.temp_f}</li>
      </ul>
    </div>
  );
}

export default App;
