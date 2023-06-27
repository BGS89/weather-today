import "./App.css";
import { fetchCurrentWeather, fetchForecast } from "./api";
import { useEffect, useState } from "react";
import HourCard from "./components/HourCard";
import Pagination from "react-bootstrap/Pagination";

function App() {
  const [currentWeather, setCurrentWeather] = useState({
    temp_c: "",
    temp_f: "",
    condition: { text: "", icon: "" },
  });
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(3);

  const icon = currentWeather.condition.icon;
  const description = currentWeather.condition.text;

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

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = hourlyForecast.slice(indexOfFirstCard, indexOfLastCard);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
      <Pagination className="pagination">
        <Pagination.Prev
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <Pagination.Next
          onClick={() => handlePagination(currentPage + 1)}
          disabled={indexOfLastCard >= hourlyForecast.length}
        />
      </Pagination>
      <ul id="hourly-weather">
        {currentCards.map((hour) => (
          <HourCard key={hour.time_epoch} hour={hour} />
        ))}
      </ul>
    </main>
  );
}

export default App;
