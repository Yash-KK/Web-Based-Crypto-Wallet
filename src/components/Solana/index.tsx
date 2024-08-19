import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Navbar from "../NavBar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Button, Card, CardContent, Grid } from "@mui/material";
import SeedPhraseAccordion from "../SeedPhraseAccordion";
import DeleteIcon from "@mui/icons-material/Delete";
import AppsIcon from "@mui/icons-material/Apps";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { generateMnemonic, validateMnemonic } from "bip39";
import DeleteModal from "../common/DeleteAllModal";
import { useNavigate } from "react-router-dom";
import { deriveKeyPair } from "../common/utils";

interface Wallet {
  publicKey: string;
  privateKey: string;
}

const Solana: React.FC = () => {
  const navigate = useNavigate();

  const [seed, setSeed] = useState<string>("");
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [walletToDelete, setWalletToDelete] = useState<number | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<boolean[]>(
    wallets.map(() => false)
  );
  const [walletNo, setWalletNo] = useState<number>(-1);
  const [gridView, setGridView] = useState<boolean>(false);
  const [seedInput, setSeedInput] = useState<string>("");
  const toggleVisibility = (index: number): void => {
    setVisibleKeys((prev) => {
      const newVisibleKeys = [...prev];
      newVisibleKeys[index] = !newVisibleKeys[index];
      return newVisibleKeys;
    });
  };

  const handleDeleteClick = (index: number): void => {
    setWalletToDelete(index);
    setOpenDeleteModal(true);
  };

  const handleCancelDelete = (): void => {
    setOpenDeleteModal(false);
    setWalletToDelete(null);
  };

  const handleConfirmDelete = (): void => {
    if (walletToDelete !== null) {
      setWallets((prev) => prev.filter((_, i) => i !== walletToDelete));
      setVisibleKeys((prev) => prev.filter((_, i) => i !== walletToDelete));
    }
    setOpenDeleteModal(false);
    setWalletToDelete(null);   
  };
  const [openModal, setOpenModal] = useState<boolean>(false);
  const openConfirmModal = (): void => {
    setOpenModal(true);
  };

  const handleConfirmClear = (): void => {
    setSeed("");
    setWallets([]);
    setOpenModal(false);
    navigate("/");
  };

  const handleCancelClear = (): void => {
    setOpenModal(false);
  };

  const GenerateWallet = (): void => {    
    if(seedInput){
      if (!validateMnemonic(seedInput)) {
        alert("Invalid seed phrase. Please try again.");
        return;
      } else{
        setSeed(seedInput);
        const walletNo = 0
        const { publicKey, privateKey } = deriveKeyPair({ mnemonic:seedInput, walletNo });
    
         setWallets([
          ...wallets,
          { publicKey: publicKey, privateKey: privateKey },
        ]);
        setWalletNo(walletNo + 1);
        return
      }
    }
    const mnemonic = generateMnemonic();
    setSeed(mnemonic);
    const walletNo = 0
    const { publicKey, privateKey } = deriveKeyPair({ mnemonic, walletNo });

     setWallets([
      ...wallets,
      { publicKey: publicKey, privateKey: privateKey },
    ]);
    setWalletNo(walletNo + 1);
  };


  const AddWallet = (mnemonic: string, walletNo: number): void => {
    const { publicKey, privateKey } = deriveKeyPair({ mnemonic, walletNo });
    setWallets([...wallets, { publicKey, privateKey }]);
    setWalletNo(walletNo + 1);
  };
  

  const toggleLayout = (): void => {
    setGridView((prev) => !prev);
  };

  return (
    <>
      <Box>
        <Box
          my={4}
          alignItems="center"
          gap={4}
          p={2}
          sx={{
            border: "2px solid grey",
            boxShadow: "0px 4px 12px rgba(255, 255, 255, 0.4)",
          }}
        >
          <Navbar />
          <br />

          {!seed ? (
            <>
              <Typography
                variant="overline"
                component="div"
                sx={{ flexGrow: 1, fontSize: "1.5rem" }}
              >
                Generate Seed Phrase
              </Typography>

              <Stack direction="row" spacing={2} mt={2}>
                <TextField
                  label="Seed Phrase"
                  variant="outlined"
                  placeholder="enter your seed phrase (or leave blank to generate)"
                  fullWidth
                  color="primary"
                  value={seedInput}
                  onChange={(e) => setSeedInput(e.target.value)}
                  sx={{
                    flexGrow: 1,
                    input: { color: "white" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                    "& .MuiInputLabel-outlined": {
                      color: "white",
                    },
                  }}
                />
                <Button onClick={GenerateWallet} color="error">
                {seedInput ? "Add Wallet" : "Generate Wallet"}
                </Button>
              </Stack>
            </>
          ) : (
            <>
              <SeedPhraseAccordion seedPhrase={seed} />
              <br />
              <Stack direction="row" spacing={2} mt={2}>
                <Typography
                  variant="overline"
                  component="div"
                  sx={{ flexGrow: 1, fontSize: "1.5rem" }}
                >
                  Solana Wallet
                </Typography>
                <IconButton
                  onClick={toggleLayout}
                  sx={{
                    color: "white",
                    border: "none",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                >
                  <AppsIcon />
                </IconButton>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => AddWallet(seed, walletNo)}
                  color="primary"
                >
                  Add Wallet
                </Button>

                <Button
                  variant="outlined"
                  size="small"
                  onClick={openConfirmModal}
                  color="error"
                >
                  Clear Wallets
                </Button>
              </Stack>
            </>
          )}
        </Box>

        {seed && (
          <Box my={4} alignItems="center" gap={4}>
            {gridView ? (
              <Grid container spacing={2}>
                {wallets.map((wallet, index) => (
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
                          <br />
                          <Box sx={{ position: "relative" }}>
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
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              wallets.map((wallet, index) => (
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
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))
            )}
          </Box>
        )}
      </Box>

      <DeleteModal
        open={openModal}
        onClose={handleCancelClear}
        onConfirm={handleConfirmClear}
        title="Are you sure you want to clear all wallets?"
        confirmButtonText="Confirm"
        cancelButtonText="Cancel"
      />

      <DeleteModal
        open={openDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title={`Are you sure you want to delete Wallet ${
          walletToDelete !== null ? walletToDelete + 1 : ""
        }?`}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
      />
    </>
  );
};

export default Solana;
