import { WeatherInterface } from "../../types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const WeatherCard = (currentWeather: WeatherInterface) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 800,
        height: 500,
        borderRadius: "25px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        gap: 2,
        fontSize: "1.5rem",
      }}
    >
      <Typography variant="h3">
        {currentWeather.current.condition.text}
      </Typography>
      <img
        src={currentWeather.current.condition.icon}
        alt={currentWeather.current.condition.text}
        width={200}
      />
      <Typography variant="h4">{currentWeather.current.temp_c}°C</Typography>
      <Box
        sx={{ width: "80%", display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="h5">
          Wind speed: {currentWeather.current.wind_kph} km/h
        </Typography>
        <Typography variant="h5">
          Wind direction: {currentWeather.current.wind_dir}
        </Typography>
      </Box>
      <Typography variant="h4">
        {currentWeather.location.name}, {currentWeather.location.region},{" "}
        {currentWeather.location.country}
      </Typography>
    </Box>
  );
};

export default WeatherCard;
