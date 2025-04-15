import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Search, Title } from "../../components";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const cached = localStorage.getItem("weatherCache");
    if (cached) {
      const { coords, timestamp } = JSON.parse(cached);
      const isValid = Date.now() - timestamp < 5 * 60 * 1000;
      if (isValid && coords) {
        navigate(`/weather/${coords}`, { replace: true });
      } else {
        localStorage.removeItem("weatherCache");
      }
    }
  }, []);

  return (
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
      <Title />
      <Search />
    </Box>
  );
};

export default Welcome;
