import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Navbar from "../NavBar";
import SeedPhraseAccordion from "../common/SeedPhraseAccordion";
import { generateMnemonic, validateMnemonic } from "bip39";
import DeleteModal from "../common/DeleteAllModal";
import { useNavigate } from "react-router-dom";
import { deriveKeyPairEthereum, getBalance } from "../common/utils";
import WalletGridViewList from "../common/WalletGridView";
import WalletCardViewList from "../common/WalletCardView";
import WalletActions from "../common/WalletActions";
import SeedPhraseGenerator from "../common/SeedPhraseGenerator";
import { Snackbar, Alert, Button } from "@mui/material";

interface Wallet {
  publicKey: string;
  privateKey: string;
}

const Ethereum: React.FC = () => {
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
  const [balances, setBalances] = useState<
    Map<string, { eth: number; wei: number }>
  >(new Map());
  
  
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('error');
  
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
    setWalletNo(walletNo - 1);
  };

  const [openModal, setOpenModal] = useState<boolean>(false);

  const openConfirmModal = (): void => {
    setOpenModal(true);
  };

  const handleConfirmClear = (): void => {
    setSeed("");
    setWallets([]);
    setOpenModal(false);
    setWalletNo(-1);
    navigate("/");
  };

  const handleCancelClear = (): void => {
    setOpenModal(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const GenerateWallet = (): void => {
    if (seedInput) {
      if (!validateMnemonic(seedInput)) {
        setSnackbarMessage('Invalid seed phrase. Please try again.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return;
      } else {
        setSeed(seedInput);
        const walletNo = 0;
        const { publicKey, privateKey } = deriveKeyPairEthereum({
          mnemonic: seedInput,
          walletNo,
        });

        setWallets([
          ...wallets,
          { publicKey: publicKey, privateKey: privateKey },
        ]);
        setWalletNo(walletNo + 1);
        setSnackbarMessage('Wallet generated successfully.');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        return;
      }
    }
    const mnemonic = generateMnemonic();
    setSeed(mnemonic);
    const walletNo = 0;
    const { publicKey, privateKey } = deriveKeyPairEthereum({
      mnemonic,
      walletNo,
    });

    setWallets([...wallets, { publicKey: publicKey, privateKey: privateKey }]);
    setWalletNo(walletNo + 1);
    setSnackbarMessage('Wallet generated successfully.');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const AddWallet = (mnemonic: string, walletNo: number): void => {
    const { publicKey, privateKey } = deriveKeyPairEthereum({
      mnemonic,
      walletNo,
    });
    setWallets([...wallets, { publicKey, privateKey }]);
    setWalletNo(walletNo + 1);
  };

  const toggleLayout = (): void => {
    setGridView((prev) => !prev);
  };

  const fetchBalances = async () => {
    const updatedBalances = new Map(balances);
    await Promise.all(
      wallets.map(async (wallet) => {
        if (updatedBalances.has(wallet.publicKey)) return;

        try {
          const balance = await getBalance({
            publicKey: wallet.publicKey,
            method: "eth_getBalance",
            url: import.meta.env.VITE_APP_ETHEREUM_API_URL,
            coinType: "Ethereum",
          });
          const wei = parseInt(balance, 16);
          const eth = wei / 10 ** 18;
          updatedBalances.set(wallet.publicKey, { eth: eth, wei: wei });
          setBalances(new Map(updatedBalances));
        } catch (error) {
          console.error("Error fetching balance:", error);
          updatedBalances.set(wallet.publicKey, { eth: 0, wei: 0 });
          setBalances(new Map(updatedBalances));
        }
      })
    );
  };

  useEffect(() => {
    fetchBalances();
  }, [wallets]);

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
              <SeedPhraseGenerator
                seedInput={seedInput}
                setSeedInput={setSeedInput}
                GenerateWallet={GenerateWallet}
              />
            </>
          ) : (
            <>
              <SeedPhraseAccordion seedPhrase={seed} />
              <br />
              <WalletActions
                toggleLayout={toggleLayout}
                AddWallet={AddWallet}
                openConfirmModal={openConfirmModal}
                seed={seed}
                walletNo={walletNo}
                coinType="Ethereum"
              />
            </>
          )}
        </Box>

        {seed && (
          <Box my={4} alignItems="center" gap={4}>
            {gridView ? (
              <WalletGridViewList
                wallets={wallets}
                visibleKeys={visibleKeys}
                handleDeleteClick={handleDeleteClick}
                toggleVisibility={toggleVisibility}
                balances={Array.from(balances.values())}
                coinType="Ethereum"
              />
            ) : (
              <WalletCardViewList
                wallets={wallets}
                visibleKeys={visibleKeys}
                handleDeleteClick={handleDeleteClick}
                toggleVisibility={toggleVisibility}
                balances={Array.from(balances.values())}
                coinType="Ethereum"
              />
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <Button color="inherit" onClick={handleSnackbarClose}>
            Close
          </Button>
        }
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Ethereum;
