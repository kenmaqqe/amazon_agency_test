import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Logo from "../../assets/logo.svg";

const Title = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "90%",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: { xs: "center", md: "space-between" },
        gap: { xs: 3, md: 4 },
      }}
    >
      <Box sx={{ order: { xs: -1, md: 2 } }}>
        <img src={Logo} alt="weather" width={100} />
      </Box>
      <Typography
        variant="h2"
        align="center"
        sx={{
          whiteSpace: {
            xs: "normal",
            md: "nowrap",
          },
          textAlign: { xs: "center", md: "left" },
          order: { xs: 2, md: -1 },
        }}
      >
        Welcome to Weatherify
      </Typography>
    </Box>
  );
};

export default Title;
