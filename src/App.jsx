import "./App.css";
import { fetchCurrentWeather } from "./api";

function App() {
  console.log(fetchCurrentWeather("Brighton"));
  return <h1>Weather Punx</h1>;
}

export default App;
