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

// Define the Wallet type
interface Wallet {
  publicKey: string;
  privateKey: string;
}

const Solana: React.FC = () => {
  const [seed, setSeed] = useState<string>("");
  const [publicKey, setPublicKey] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<string>("");
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [visibleKeys, setVisibleKeys] = useState<boolean[]>(
    wallets.map(() => false)
  );
  const [gridView, setGridView] = useState<boolean>(false);

  // Toggle visibility of private key
  const toggleVisibility = (index: number): void => {
    setVisibleKeys((prev) => {
      const newVisibleKeys = [...prev];
      newVisibleKeys[index] = !newVisibleKeys[index];
      return newVisibleKeys;
    });
  };

  // Generate a wallet
  const GenerateWallet = (): void => {
    const seedPhrase =
      "apple banana cherry date elderberry fig grape honeydew kiwi lemon mango nectarine";
    setSeed(seedPhrase);

    const newPublicKey = "HYEQvgVdVPYZgHE2ipuxkBnLgQDvPiC9kANs1n72WMZp";
    const newPrivateKey =
      "4VXyNPWwpw7VacpkkPCRZK2r9x1Dc4NdpW4HWgEGKQ7EmVMFBmw4zJ77ZhdRjiiQH68DGP5wJgFscjQHCT6xeW7G";

    setPublicKey(newPublicKey);
    setPrivateKey(newPrivateKey);
    setWallets([
      ...wallets,
      { publicKey: newPublicKey, privateKey: newPrivateKey },
    ]);
  };

  // Add a new wallet
  const AddWallet = (): void => {
    if (publicKey && privateKey) {
      setWallets([...wallets, { publicKey, privateKey }]);
    }
  };

  // Handle deletion of a wallet
  const handleDelete = (index: number): void => {
    setWallets((prev) => prev.filter((_, i) => i !== index));
    setVisibleKeys((prev) => prev.filter((_, i) => i !== index));
  };

  // Clear all wallets
  const ClearWallet = (): void => {
    setSeed("");
    setPublicKey("");
    setPrivateKey("");
    setWallets([]);
  };

  // Toggle between grid and card view
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
                  color="success"
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
                  Generate Wallet
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
                  onClick={AddWallet}
                  color="primary"
                >
                  Add Wallet
                </Button>

                <Button
                  variant="outlined"
                  size="small"
                  onClick={ClearWallet}
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
                            onClick={() => handleDelete(index)}
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
                        onClick={() => handleDelete(index)}
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
    </>
  );
};

export default Solana;
