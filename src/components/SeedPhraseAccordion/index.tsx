import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Button } from "@mui/material";
import { useState } from "react";

interface SeedPhraseAccordionProps {
  seedPhrase: string;
}

const SeedPhraseAccordion: React.FC<SeedPhraseAccordionProps> = ({
  seedPhrase,
}) => {
  const [open, setOpen] = useState(false);
  const words = seedPhrase.split(" ");

  const copySeedPhrase = () => {
    navigator.clipboard.writeText(seedPhrase).then(() => {
      setOpen(true);
    });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false); // Close the Snackbar
  };
  return (
    <>
      <Accordion>
        <AccordionSummary
          sx={{
            backgroundColor: "#242424",
            color: "white",
          }}
          expandIcon={
            <ExpandMoreIcon
              sx={{
                color: "white",
              }}
            />
          }
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography variant="overline" component="div" sx={{ flexGrow: 1 }}>
            Your Secret Phrase
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            backgroundColor: "#242424",
            color: "white",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {words.map((word, index) => (
              <Button
                onClick={copySeedPhrase}
                variant="text"
                key={index}
                sx={{
                  backgroundColor: "#333",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  textAlign: "center",
                  flexBasis: "30%",
                  marginBottom: "8px",
                  "&:focus": {
                    outline: "none",
                  },
                  "&:active": {
                    outline: "none",
                    boxShadow: "none",
                  },
                  "&:hover": {
                    backgroundColor: "#444",
                  },
                }}
              >
                {word}
              </Button>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}        
          variant="filled"
          sx={{
            backgroundColor: "#242424",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            color: "white",
          }}
        >
          Copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
};

export default SeedPhraseAccordion;
