import React from "react";
import Navbar from "./components/NavBar/index";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

import "./App.css";
const App: React.FC = () => {
  const navigate = useNavigate();

  function handleClickForSolana() {
    navigate("/sol");
  }
  function handleClickForEthereum(){
    navigate("/eth");
  }
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
        <Button onClick={handleClickForSolana} variant="outlined">Solana</Button>
        <Button onClick={handleClickForEthereum} variant="outlined">Ethereum</Button>
      </Stack>
    </Box>
  );
};

export default App;
