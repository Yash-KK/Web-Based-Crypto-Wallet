import React from "react";
import { Stack, TextField, Button, Typography } from "@mui/material";

interface SeedPhraseGeneratorProps {
  seedInput: string;
  setSeedInput: (value: string) => void;
  GenerateWallet: () => void;
}

const SeedPhraseGenerator: React.FC<SeedPhraseGeneratorProps> = ({
  seedInput,
  setSeedInput,
  GenerateWallet,
}) => {
  return (
    <div>
      <Typography
        variant="overline"
        component="div"
        sx={{ flexGrow: 1, fontSize: "1.5rem" }}
      >
        Generate Seed Phrase
      </Typography>

      <Stack direction="row" spacing={2} mt={2}>
        <TextField
          type="password"
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
    </div>
  );
};

export default SeedPhraseGenerator;
