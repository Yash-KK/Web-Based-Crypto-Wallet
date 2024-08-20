import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Navbar from "../NavBar";
import SeedPhraseAccordion from "../common/SeedPhraseAccordion";
import { generateMnemonic, validateMnemonic } from "bip39";
import DeleteModal from "../common/DeleteAllModal";
import { useNavigate } from "react-router-dom";
import { deriveKeyPairSolana, getBalance } from "../common/utils";
import WalletGridViewList from "../common/WalletGridView";
import WalletCardViewList from "../common/WalletCardView";
import WalletActions from "../common/WalletActions";
import SeedPhraseGenerator from "../common/SeedPhraseGenerator";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

interface Wallet {
  publicKey: string;
  privateKey: string;
}

const Solana: React.FC = () => {
  const navigate = useNavigate();

  const [seed, setSeed] = useState<string>("");
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [balances, setBalances] = useState<
    Map<string, { sol: number; lamports: number }>
  >(new Map());
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [walletToDelete, setWalletToDelete] = useState<number | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<boolean[]>(
    wallets.map(() => false)
  );
  const [walletNo, setWalletNo] = useState<number>(-1);
  const [gridView, setGridView] = useState<boolean>(false);
  const [seedInput, setSeedInput] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);

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

  const fetchBalances = async () => {
    const updatedBalances = new Map(balances);
    await Promise.all(
      wallets.map(async (wallet) => {
        if (updatedBalances.has(wallet.publicKey)) return;

        try {
          const balance = await getBalance({
            publicKey: wallet.publicKey,
            method: "getBalance",
            url: import.meta.env.VITE_APP_SOLANA_API_URL,
            coinType: "Solana",
          });
          const solBalance = balance / LAMPORTS_PER_SOL;
          updatedBalances.set(wallet.publicKey, {
            sol: solBalance,
            lamports: balance,
          });
          setBalances(new Map(updatedBalances));
        } catch (error) {
          console.error("Error fetching balance:", error);
          updatedBalances.set(wallet.publicKey, { sol: 0, lamports: 0 });
          setBalances(new Map(updatedBalances));
        }
      })
    );
  };

  useEffect(() => {
    fetchBalances();
  }, [wallets]);

  const GenerateWallet = (): void => {
    if (seedInput) {
      if (!validateMnemonic(seedInput)) {
        alert("Invalid seed phrase. Please try again.");
        return;
      } else {
        setSeed(seedInput);
        const walletNo = 0;
        const { publicKey, privateKey } = deriveKeyPairSolana({
          mnemonic: seedInput,
          walletNo,
        });

        setWallets([
          ...wallets,
          { publicKey: publicKey, privateKey: privateKey },
        ]);
        setWalletNo(walletNo + 1);
        return;
      }
    }
    const mnemonic = generateMnemonic();
    setSeed(mnemonic);
    const walletNo = 0;
    const { publicKey, privateKey } = deriveKeyPairSolana({
      mnemonic,
      walletNo,
    });

    setWallets([...wallets, { publicKey: publicKey, privateKey: privateKey }]);
    setWalletNo(walletNo + 1);
  };

  const AddWallet = (mnemonic: string, walletNo: number): void => {
    const { publicKey, privateKey } = deriveKeyPairSolana({
      mnemonic,
      walletNo,
    });
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
                coinType="Solana"
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
                coinType="Solana"
              />
            ) : (
              <WalletCardViewList
                wallets={wallets}
                visibleKeys={visibleKeys}
                handleDeleteClick={handleDeleteClick}
                toggleVisibility={toggleVisibility}
                balances={Array.from(balances.values())}
                coinType="Solana"
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
    </>
  );
};

export default Solana;
