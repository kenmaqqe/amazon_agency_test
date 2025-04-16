import { WeatherInterface } from "../../types";
import { Box, Typography } from "@mui/material";

interface Props extends WeatherInterface {
  date?: Date;
}

const WeatherCard = ({ current, location, date }: Props) => {
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
      <Typography variant="h3">{current.condition.text}</Typography>
      <img
        src={current.condition.icon}
        alt={current.condition.text}
        width={200}
      />
      <Typography variant="h4">{current.temp_c}°C</Typography>
      <Box
        sx={{ width: "80%", display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="h5">
          Wind speed: {current.wind_kph} km/h
        </Typography>
        <Typography variant="h5">Wind direction: {current.wind_dir}</Typography>
      </Box>
      <Typography variant="h4">
        {location.name}, {location.region}, {location.country}
      </Typography>
      {date && (
        <Typography variant="h6">
          Last update at: {date.toLocaleString()}
        </Typography>
      )}
    </Box>
  );
};

export default WeatherCard;
