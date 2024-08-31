import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface Wallet {
  publicKey: string;
  privateKey: string;
}

interface WalletGridViewListProps {
  wallets: Wallet[];
  visibleKeys: boolean[];
  handleDeleteClick: (index: number) => void;
  toggleVisibility: (index: number) => void;
  // balances: { sol?: number; eth?: number; lamports?: number; wei?: number }[];
  coinType: "Solana" | "Ethereum";
}

const WalletGridViewList: React.FC<WalletGridViewListProps> = ({
  wallets,
  visibleKeys,
  handleDeleteClick,
  toggleVisibility,
}) => {
  return (
    <Grid container spacing={2}>
      {wallets.map((wallet, index) => {

        return (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                padding: "16px",
                backgroundColor: "#242424",
                border: "2px solid grey",
                boxShadow: "0px 4px 12px rgba(255, 255, 255, 0.4)",
                position: "relative",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    color: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  Wallet {index + 1}
                  <IconButton
                    onClick={() => handleDeleteClick(index)}
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(255, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Typography>
                <Box>
                  <Tooltip title={wallet.publicKey} placement="top">
                    <Typography
                      variant="body1"
                      sx={{
                        marginTop: "8px",
                        color: "white",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <div>
                        <strong>Public Key:</strong>{" "}
                      </div>
                      {wallet.publicKey}
                    </Typography>
                  </Tooltip>
                  <br />
                  <Box sx={{ position: "relative" }}>
                    <Tooltip
                      title={
                        visibleKeys[index]
                          ? wallet.privateKey
                          : "Click to reveal"
                      }
                      placement="top"
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          marginTop: "4px",
                          color: "white",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          paddingRight: "35px",
                        }}
                      >
                        <div>
                          <strong>Private Key:</strong>
                        </div>{" "}
                        {visibleKeys[index]
                          ? wallet.privateKey
                          : "****************************************************************************************"}
                      </Typography>
                    </Tooltip>
                    <IconButton
                      onClick={() => toggleVisibility(index)}
                      sx={{
                        color: "white",
                        position: "absolute",
                        right: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      {visibleKeys[index] ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default WalletGridViewList;
