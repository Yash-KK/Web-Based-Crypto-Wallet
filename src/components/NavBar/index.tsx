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

export default function Navbar() {
  const [auth, setAuth] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

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
          label={auth ? "Sorry..." : "Click"}
        />
      </FormGroup>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
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

          {auth && <div>Follow my socials...</div>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
