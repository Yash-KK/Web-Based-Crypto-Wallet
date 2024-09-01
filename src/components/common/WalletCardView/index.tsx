import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Modal from "@mui/material/Modal";
import { getBalance } from "../utils";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

interface Wallet {
  publicKey: string;
  privateKey: string;
}

interface WalletCardViewListProps {
  wallets: Wallet[];
  visibleKeys: boolean[];
  handleDeleteClick: (index: number) => void;
  toggleVisibility: (index: number) => void;
  coinType: "Solana" | "Ethereum";
}

const WalletCardViewList: React.FC<WalletCardViewListProps> = ({
  wallets,
  visibleKeys,
  handleDeleteClick,
  toggleVisibility,
  coinType,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [balances, setBalances] = useState<Map<string, Map<string, number>>>(
    new Map()
  );

  const [selectedNetwork, setSelectedNetwork] = useState<string>("Mainnet");
  const handleNetworkChange = (event: SelectChangeEvent<string>) => {
    setSelectedNetwork(event.target.value as string);
  };

  const handleOpen = async (index: number) => {
    try {
      const wallet = wallets[index];
      const cacheKey = wallet.publicKey;

      const apiUrl =
        selectedNetwork === "Mainnet"
          ? import.meta.env.VITE_APP_SOLANA_MAINNET_API_URL
          : import.meta.env.VITE_APP_SOLANA_DEVNET_API_URL;

      // Fetch balance
      const lamportBalance = await getBalance({
        publicKey: wallet.publicKey,
        method: "getBalance",
        url: apiUrl,
        coinType: coinType,
      });
      console.log("lamport Balance: ", lamportBalance);
      const solBalance = lamportBalance / LAMPORTS_PER_SOL;
      const newBalances = new Map(balances);
      newBalances.set(
        cacheKey,
        new Map([
          ["lamport", lamportBalance],
          ["sol", solBalance],
        ])
      );

      setBalances(newBalances);
      setOpenIndex(index);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const handleClose = () => {
    setOpenIndex(null);
  };

  useEffect(() => {
    if (openIndex !== null) {
      handleOpen(openIndex);
    }
  }, [selectedNetwork]);

  return (
    <Box my={4} alignItems="center" gap={4}>
      {wallets.map((wallet, index) => {
        const balance = balances.get(wallet.publicKey);
        const lamportBalance = balance?.get("lamport") ?? null;
        const solBalance = balance?.get("sol") ?? null;

        return (
          <React.Fragment key={index}>
            <Card
              sx={{
                margin: "16px 0",
                padding: "16px",
                backgroundColor: "#242424",
                border: "2px solid grey",
                boxShadow: "0px 4px 12px rgba(255, 255, 255, 0.4)",
                position: "relative",
              }}
              onClick={() => handleOpen(index)}
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
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        handleDeleteClick(index);
                      }}
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
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        toggleVisibility(index);
                      }}
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

            {/* Wallet details modal */}
            <Modal open={openIndex === index} onClose={handleClose}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "50%",
                  height: "60%",
                  bgcolor: "#242424",
                  color: "white",
                  boxShadow: 24,
                  p: 4,
                  borderRadius: 2,
                  border: "2px solid white",
                }}
              >
                {/* Close icon */}
                <IconButton
                  onClick={handleClose}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: "white",
                  }}
                >
                  <CloseIcon />
                </IconButton>

                {/* Child1 : This box is for the Public and Private keys display */}
                <Box
                  sx={{
                    margin: "25px",
                    padding: "10px",
                    border: "2px solid grey",
                    boxShadow: "0px 4px 12px rgba(255, 255, 255, 0.4)",
                  }}
                >
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
                      {visibleKeys[index] ? (
                        <VisibilityOff
                          sx={{
                            fontSize: "10px",
                          }}
                        />
                      ) : (
                        <Visibility
                          sx={{
                            fontSize: "10px",
                          }}
                        />
                      )}
                    </IconButton>
                  </Box>
                </Box>
                {/*Child 1 END */}

                {/* Select Network Mainnet/Devnet */}
                <Box
                  sx={{
                    margin: "25px",
                  }}
                >
                  <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                    <InputLabel
                      id="network-select-label"
                      sx={{ color: "white" }}
                    >
                      Network
                    </InputLabel>
                    <Select
                      labelId="network-select-label"
                      id="network-select"
                      value={selectedNetwork}
                      onChange={handleNetworkChange}
                      label="Network"
                      sx={{
                        color: "white",
                        borderColor: "white",
                        "& .MuiSvgIcon-root": { color: "white" },
                      }}
                    >
                      <MenuItem value="Mainnet">Mainnet</MenuItem>
                      <MenuItem value="Devnet">Devnet</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                {/* Child 2: This contains 2 boxes.  */}
                <Box
                  sx={{
                    margin: "25px",
                    padding: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Grand Child Box 1 */}
                  <Box
                    sx={{
                      padding: "8px",
                      borderRadius: "4px",
                      width: "40%",
                      border: "2px solid grey",
                    }}
                  >
                    <Tooltip title={`Lamports: ${lamportBalance}`} arrow>
                      <Typography sx={{ color: "white" }}>
                        {solBalance !== null
                          ? `$ ${(solBalance || 0).toFixed(4)} SOL`
                          : "Loading..."}
                      </Typography>
                    </Tooltip>
                  </Box>

                  {/* Grand Child Box 2 */}
                  <Box
                    sx={{
                      border: "2px solid grey",
                      padding: "8px",
                      borderRadius: "4px",
                      width: "60%",
                    }}
                  >
                    <Typography sx={{ color: "white", alignItems: "center" }}>
                      Child Box 2 Content
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Modal>
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default WalletCardViewList;
