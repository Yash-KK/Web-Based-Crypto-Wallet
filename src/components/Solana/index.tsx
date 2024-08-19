import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Navbar from "../NavBar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import SeedPhraseAccordion from "../SeedPhraseAccordion";

export default function Solana() {
  const [seed, setSeed] = useState<string>("");
  const GenerateWallet = () => {
    const seedPhrase =
      "apple banana cherry date elderberry fig grape honeydew kiwi lemon mango nectarine";
    setSeed(seedPhrase);
  };

  const AddWallet = () => {
    alert("Add Wallet!");
  };

  const ClearWallet = () => {
    setSeed("");
  };
  return (
    <>
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
            <br />
            
          </>
        )}
      </Box>
    </>
  );
}
