import React from "react";
import Navbar from "./components/NavBar/index";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import SolanaLogo from "./assets/solana-sol-logo.png";
import EthereumLogo from "./assets/ethereum-eth-logo.png";

import "./App.css";

const App: React.FC = () => {
  const navigate = useNavigate();

  function handleClickForSolana() {
    navigate("/sol");
  }

  function handleClickForEthereum() {
    navigate("/eth");
  }

  return (
    <Box my={4} alignItems="center" gap={4} p={2}>
      <Navbar />
      <br />

      <Typography
        variant="overline"
        component="div"
        sx={{ flexGrow: 1, fontSize: "1.5rem", textAlign: "center" }}
      >
        This Wallet has support for 2 Blockchains
      </Typography>

      <Stack spacing={2} direction="row" justifyContent="center">
        <Card
          sx={{
            maxWidth: 200,
            padding: 2,
            backgroundColor: "#1E1E1E",
            color: "white",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#333333",
              transform: "translateY(-4px)",
              transition: "all 0.3s ease",
            },
          }}
          onClick={handleClickForSolana}
        >
          <CardContent sx={{ textAlign: "center" }}>
            <img src={SolanaLogo} alt="Solana Logo" style={{ width: "50px" }} />
            <Typography
              variant="h6"
              sx={{ marginTop: "10px", fontWeight: "bold" }}
            >
              Solana
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            maxWidth: 200,
            padding: 2,
            backgroundColor: "#1E1E1E",
            color: "white",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#333333",
              transform: "translateY(-4px)",
              transition: "all 0.3s ease",
            },
          }}
          onClick={handleClickForEthereum}
        >
          <CardContent sx={{ textAlign: "center" }}>
            <img
              src={EthereumLogo}
              alt="Ethereum Logo"
              style={{ width: "50px" }}
            />
            <Typography
              variant="h6"
              sx={{ marginTop: "10px", fontWeight: "bold" }}
            >
              Ethereum
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default App;
