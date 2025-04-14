import Box from "@mui/material/Box";
import { Search, Title } from "../../components";

const Welcome = () => {
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
