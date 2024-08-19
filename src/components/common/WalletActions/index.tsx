import React from "react";
import { Stack, Typography, IconButton, Button } from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";

interface WalletActionsProps {
  toggleLayout: () => void;
  AddWallet: (seed: string, walletNo: number) => void;
  openConfirmModal: () => void;
  seed: string;
  walletNo: number;
}

const WalletActions: React.FC<WalletActionsProps> = ({
  toggleLayout,
  AddWallet,
  openConfirmModal,
  seed,
  walletNo,
}) => {
  return (
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
  );
};

export default WalletActions;
