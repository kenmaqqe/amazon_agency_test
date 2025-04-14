import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Logo from "../../assets/logo.svg";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { autocomplete } from "../../services";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { CityInterface } from "../../types";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const [cityName, setCityName] = useState<string>("");
  const [cities, setCities] = useState<CityInterface[]>([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/weather/${cityName}`);
  };
  const handleChangeCityName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };

  useEffect(() => {
    if (!cityName) return;
    autocomplete(cityName).then((res) => {
      setCities(res.data);
    });
  }, [cityName]);

  return (
    <section className="welcome">
      <Box
        sx={{
          width: "100%",
          maxWidth: 800,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <div className="welcome-msg">
          <Typography variant="h2" align="center">
            Welcome to Weatherify
          </Typography>
          <img src={Logo} alt="weather" width={100} />
        </div>
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
            {cities.map((item) => {
              return (
                <ListItem
                  key={item.id}
                  className="city-item"
                  onClick={handleSearch}
                >
                  {item.name}, {item.region}, {item.country}
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
    </section>
  );
};

export default Welcome;
