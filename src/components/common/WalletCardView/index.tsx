import React, { useState } from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Modal from "@mui/material/Modal";

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
        const [open, setOpen] = useState<boolean>(false);
        const handleOpen = () => {
          setOpen(true);
        };
        const handleClose = () => {
          setOpen(false);
        };
        return (
          <>
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
              onClick={handleOpen}
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
            <Modal open={open} onClose={handleClose}>
              {/* Parent Box  */}
              <Box
                sx={{
                  position: "absolute" as "absolute",
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
                {/*Child 1 END:  This box is for the Public and Private keys display */}

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
                      width: "100%",
                      border: "2px solid grey",
                    }}
                  >
                    <Typography sx={{ color: "white" }}>
                      Child Box 1 Content
                    </Typography>
                    <Typography sx={{ color: "white" }}>
                      Child Box 1 Content
                    </Typography>
                    <Typography sx={{ color: "white" }}>
                      Child Box 1 Content
                    </Typography>
                    <Typography sx={{ color: "white" }}>
                      Child Box 1 Content
                    </Typography>
                  </Box>

                  {/* Grand Child Box 2 */}
                  <Box
                    sx={{
                      border: "2px solid grey",
                      padding: "8px",
                      borderRadius: "4px",
                      width: "100%",
                    }}
                  >
                    <Typography sx={{ color: "white", alignItems: "center" }}>
                      Child Box 2 Content
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Child 2 END */}
            </Modal>
          </>
        );
      })}
    </Box>
  );
};

export default WalletCardViewList;
