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
import SolanaLogo from "/src/assets/solana-cdn.svg";

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
  const solToUsdRate = 132.07;
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

                {/* This box is for the Public and Private keys display */}
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
                {/* END: This box is for the Public and Private keys display */}

                {/* Contains the netork dropdown (LHS) and The balance (RHS) */}
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
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl
                      variant="outlined"
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-root": {
                          height: "100%",
                        },
                      }}
                    >
                      <InputLabel
                        id="network-select-label"
                        sx={{
                          color: "white",
                          "&.Mui-focused": {
                            color: "white",
                          },
                        }}
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
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "white",
                            },
                            "&:hover fieldset": {
                              borderColor: "grey",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "lightgrey",
                            },
                          },
                          "& .MuiSvgIcon-root": {
                            color: "white",
                          },
                          "& .MuiSelect-select": {
                            backgroundColor: "#333",
                            borderRadius: "4px",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                          },
                        }}
                      >
                        <MenuItem value="Mainnet">Mainnet</MenuItem>
                        <MenuItem value="Devnet">Devnet</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Grand Child Box 2 */}
                  <Box
                    sx={{
                      border: "2px solid grey",
                      padding: "16px",
                      borderRadius: "4px",
                      width: "60%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "1rem",
                        marginBottom: "8px",
                      }}
                    >
                      {solBalance !== null
                        ? `$ ${(solBalance * solToUsdRate).toFixed(2)}`
                        : "......"}
                    </Typography>
                    <Tooltip title={`Lamports: ${lamportBalance}`} arrow>
                      <Typography
                        sx={{
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          fontSize: "1.5rem",
                        }}
                      >
                        <img
                          src={SolanaLogo}
                          alt="Solana"
                          style={{
                            width: 70,
                            height: 70,
                          }}
                        />
                        {solBalance !== null ? `${solBalance} SOL` : "......"}
                      </Typography>
                    </Tooltip>
                  </Box>
                </Box>
                {/* END: Contains the netork dropdown (LHS) and The balance (RHS) */}
              </Box>
            </Modal>
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default WalletCardViewList;
