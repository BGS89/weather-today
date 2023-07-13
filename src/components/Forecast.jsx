import { fetchCurrentWeather, fetchForecast } from "../api";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HourCard from "./HourCard";
import Pagination from "react-bootstrap/Pagination";
import Heading from "./Heading";

function Forecast() {
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

  useEffect(() => {
    fetchCurrentWeather(city)
      .then((weatherFromApi) => {
        setCurrentWeather(weatherFromApi);
      })
      .catch((error) => {
        console.log(error);
        setCity("Location Not Found...");
      });
    fetchForecast(city)
      .then((forecastFromApi) => {
        setHourlyForecast(forecastFromApi);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCity(search);
    frm.reset();
  };

  const handlePagination = (pageNumber) => {
    if (
      pageNumber < 1 ||
      pageNumber > Math.ceil(hourlyForecast.length / cardsPerPage)
    ) {
      return;
    }
    setCurrentPage(pageNumber);
  };

  if (city === "" || city === "Location Not Found...") {
    return (
      <main>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5, duration: 1 } }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <Heading />
          <form onSubmit={handleSearch}>
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
          <i className="fa-sharp fa-regular fa-sun fa-spin fa-8x"></i>
        </motion.div>
      </main>
    );
  }

  const forecastVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 2.5 } },
    exit: { opacity: 0, transition: { duration: 2.5 } },
  };

  const slideVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = hourlyForecast.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <main>
      <motion.main
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={forecastVariants}
      >
        <Heading />
        <form onSubmit={handleSearch}>
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
          <img src={currentWeather.condition.icon} alt="" />
          <p>{currentWeather.condition.text}</p>
        </div>
        <ul id="current-weather">
          <li>{currentWeather.temp_c} C</li>
          <li>{currentWeather.temp_f} F</li>
        </ul>
        <div id="hourly">
          <h3>Hourly Forecast</h3>
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
              <motion.li
                key={hour.time_epoch}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <HourCard hour={hour} />
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.main>
    </main>
  );
}

export default Forecast;
