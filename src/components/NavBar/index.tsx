import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"; // Import the new icon
import { useNavigate } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Navbar() {
  const [auth, setAuth] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? "Hide" : "Socials"}
        />
      </FormGroup>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            onClick={() => {
              navigate("/");
            }}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AccountBalanceWalletIcon />
          </IconButton>

          <Typography
            variant="button"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              color: "#FFFFFF",
              fontSize: "2.5rem",
              fontFamily: '"Matemasie", sans-serif',
            }}
          >
            Y@K Wallet
          </Typography>

          {auth && (
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                component="a"
                href="https://github.com/Yash-KK/"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://x.com/YashKharche16"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.linkedin.com/in/yash-kharche-57ba60223/"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
