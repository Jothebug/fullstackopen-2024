import { useEffect, useState } from "react";
import { getWeather } from "../services";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getWeather({
          lat: capital.latlng[0],
          lon: capital.latlng[1],
        });
        setWeather(res.data);
      } catch (error) {
        console.log("Weather", error);
      }
    })();
  }, [capital.latlng]);

  if (!weather) return null;

  return (
    <div>
      <h2>Weather in {weather.name}</h2>
      <p>Temprature: {weather.main.temp}°F</p>
      <img
        alt="weatherIcon"
        width="100px"
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      />
      <p>Wind: {weather.wind.speed}Km/hr</p>
    </div>
  );
};

export default Weather;
