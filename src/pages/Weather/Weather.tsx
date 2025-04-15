import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWeather } from "../../services";
import { WeatherInterface } from "../../types";
import { WeatherCard } from "../../components";
import { Button, Box } from "@mui/material";
import Back from "../../assets/back.svg";

const Weather = () => {
  const { cityname } = useParams<{ cityname: string }>();
  const [currentWeather, setCurrentWeather] = useState<WeatherInterface | null>(
    null
  );
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState<Date>();

  useEffect(() => {
    const cache = localStorage.getItem("weatherCache");
    if (cache) {
      const parsed = JSON.parse(cache);
      setCurrentDate(new Date(parsed.timestamp));
    }
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

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
        sx={{
          color: "black",
          position: "absolute",
          top: 20,
          left: 20,
          gap: 1,
        }}
        onClick={() => {
          localStorage.removeItem("weatherCache");
          navigate("/");
        }}
      >
        <img src={Back} alt="back" width={20} />
        Back
      </Button>
      {currentWeather && <WeatherCard {...currentWeather} date={currentDate} />}
    </Box>
  );
};

export default Weather;
