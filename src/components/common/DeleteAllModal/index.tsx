import React from "react";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

const DeleteModal: React.FC<ConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel",
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          backgroundColor: "#242424",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          width: "400px",
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            color="error"
            onClick={onConfirm}
          >
            {confirmButtonText}
          </Button>
          <Button variant="outlined" onClick={onClose}>
            {cancelButtonText}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
