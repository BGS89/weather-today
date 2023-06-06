import "./App.css";
import { fetchCurrentWeather } from "./api";
import { useEffect, useState } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState({});

  useEffect(() => {
    fetchCurrentWeather("Brighton")
      .then((weatherFromApi) => {
        setCurrentWeather(weatherFromApi);
      })
      .catch((error) => {
        return error;
      });
  }, []);

  console.log(currentWeather.condition.text);
  return (
    <div>
      <h1>Weather Punx</h1>

      <ul>
        <li>Temp C - {currentWeather.temp_c}</li>
        <li>Temp F - {currentWeather.temp_f}</li>
        <li>Description - {currentWeather.condition.text}</li>
      </ul>
    </div>
  );
}

export default App;
