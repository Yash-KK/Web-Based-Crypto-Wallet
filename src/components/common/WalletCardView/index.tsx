import React from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface Wallet {
  publicKey: string;
  privateKey: string;
}

interface WalletCardViewListProps {
  wallets: Wallet[];
  visibleKeys: boolean[];
  handleDeleteClick: (index: number) => void;
  toggleVisibility: (index: number) => void;
  // balances: { sol?: number; eth?: number; lamports?: number; wei?: number }[];
  coinType: "Solana" | "Ethereum";
}

const WalletCardViewList: React.FC<WalletCardViewListProps> = ({
  wallets,
  visibleKeys,
  handleDeleteClick,
  toggleVisibility,
}) => {
  return (
    <Box my={4} alignItems="center" gap={4}>
      {wallets.map((wallet, index) => {
        return (
          <Card
            key={index}
            sx={{
              margin: "16px 0",
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
                  fontSize: "2.25rem",
                  color: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                Wallet {index + 1}
                <Box sx={{ display: "flex", alignItems: "center" }}>
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
                </Box>
              </Typography>
              <Box>
                <Typography
                  variant="body1"
                  sx={{ marginTop: "8px", color: "white" }}
                >
                  <div>
                    <strong>Public Key:</strong>{" "}
                  </div>
                  {wallet.publicKey}
                </Typography>
                <br />
                <Box sx={{ position: "relative" }}>
                  <Typography
                    variant="body1"
                    sx={{ marginTop: "4px", color: "white" }}
                  >
                    <div>
                      {" "}
                      <strong>Private Key:</strong>
                    </div>{" "}
                    {visibleKeys[index]
                      ? wallet.privateKey
                      : "****************************************************************************************"}
                  </Typography>
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
        );
      })}
    </Box>
  );
};

export default WalletCardViewList;
