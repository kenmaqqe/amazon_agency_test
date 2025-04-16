import { useState, useEffect } from "react";
import { autocomplete } from "../../services";
import { List, ListItem, ListItemText, TextField, Box } from "@mui/material";
import { CityInterface } from "../../types";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [cityName, setCityName] = useState<string>("");
  const [cities, setCities] = useState<CityInterface[]>([]);
  const navigate = useNavigate();

  const handleSearch = (
    lon: CityInterface["lon"],
    lat: CityInterface["lat"]
  ) => {
    const payload = {
      coords: `${lat},${lon}`,
      timestamp: Date.now(),
    };
    localStorage.setItem("weatherCache", JSON.stringify(payload));
    navigate(`/weather/${lat},${lon}`);
  };

  const handleChangeCityName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };

  useEffect(() => {
    if (!cityName || cityName.length < 3) return;

    const timer = setTimeout(() => {
      autocomplete(cityName).then((res) => {
        setCities(res.data);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [cityName]);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField
        id="outlined-basic"
        label="Enter City Name"
        variant="outlined"
        fullWidth
        onChange={handleChangeCityName}
      />
      <List>
        {cities.length > 0
          ? cities.map((item) => {
              return (
                <ListItem key={item.id} className="city-item">
                  <ListItemText
                    primary={`${item.name}, ${item.region}, ${item.country}`}
                    onClick={() => handleSearch(item.lon, item.lat)}
                  />
                </ListItem>
              );
            })
          : cityName.length >= 3 && (
              <ListItem>
                <ListItemText
                  primary="City not found :("
                  sx={{ textAlign: "center", color: "gray" }}
                />
              </ListItem>
            )}
      </List>
    </Box>
  );
};

export default Search;
