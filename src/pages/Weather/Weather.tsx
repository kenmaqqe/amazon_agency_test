import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWeather } from "../../services";
import { WeatherInterface } from "../../types";
import Box from "@mui/material/Box";
import { WeatherCard } from "../../components";

const Weather = () => {
  const { cityname } = useParams<{ cityname: string }>();
  const [currentWeather, setCurrentWeather] = useState<WeatherInterface | null>(
    null
  );

  useEffect(() => {
    if (!cityname) return;

    const [latStr, lonStr] = cityname.split(",");
    const lat = parseFloat(latStr);
    const lon = parseFloat(lonStr);

    if (isNaN(lat) || isNaN(lon)) {
      console.error("Invalid coordinates");
      return;
    }

    getWeather(lat, lon)
      .then((res) => setCurrentWeather(res.data))
      .catch((err) => console.log(err));
  }, [cityname]);

  return <Box>{currentWeather && <WeatherCard {...currentWeather} />}</Box>;
};

export default Weather;
