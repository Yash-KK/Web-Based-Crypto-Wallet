import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useNavigate } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup></FormGroup>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
