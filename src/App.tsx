import React from "react";
import Navbar from "./components/NavBar/index";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import "./App.css";
const App: React.FC = () => {
  return (
    <Box my={4} alignItems="center" gap={4} p={2}>
      <Navbar />
      <br />

      <Typography
        variant="overline"
        component="div"
        sx={{ flexGrow: 1, fontSize: "1.5rem" }}
      >
        This Wallet has support for 2 Blockchains
      </Typography>

      <Stack spacing={2} direction="row">
        <Button variant="outlined">Solana</Button>
        <Button variant="outlined">Ethereum</Button>
      </Stack>
    </Box>
  );
};

export default App;
