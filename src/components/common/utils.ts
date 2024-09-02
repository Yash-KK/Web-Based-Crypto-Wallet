import { mnemonicToSeedSync } from "bip39"
import { Wallet, HDNodeWallet } from "ethers";
import { derivePath } from "ed25519-hd-key"
import nacl from "tweetnacl";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import bs58 from "bs58";
import { Buffer } from "buffer";
import axios from "axios";

type DeriveKeyPairSolanaProps = {
  mnemonic: string,
  walletNo: number
}

export const deriveKeyPairSolana = ({ mnemonic, walletNo }: DeriveKeyPairSolanaProps) => {

  // Generate the seed
  const seed = mnemonicToSeedSync(mnemonic);

  // Derivation Path for solana
  const path = `m/44'/501'/${walletNo}'/0'`;

  // Derive a seed from the given path
  // Its a dict with (Key, chainCode) as Key's
  const seedHex = seed.toString("hex");
  const derivedSeed = derivePath(path, seedHex).key;

  // generate a key pair from the derived seed
  const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);

  const publicKey = Keypair.fromSecretKey(
    keyPair.secretKey
  ).publicKey.toBase58();

  // Base 58
  const privateKey = bs58.encode(Buffer.from(keyPair.secretKey));

  return { publicKey, privateKey }
}


type DeriveKeyPairEthereumProps = {
  mnemonic: string,
  walletNo: number
}
export const deriveKeyPairEthereum = ({ mnemonic, walletNo }: DeriveKeyPairEthereumProps) => {
  const seed = mnemonicToSeedSync(mnemonic);
  const derivationPath = `m/44'/60'/${walletNo}'/0'`;
  const hdNode = HDNodeWallet.fromSeed(seed);
  const child = hdNode.derivePath(derivationPath);
  const privateKey = child.privateKey;
  const publicKey = new Wallet(privateKey).address;

  return { publicKey, privateKey };

}

type GetBalance = {
  publicKey: string,
  method: any,
  url: any,
  coinType: string
}

export const getBalance = async ({ publicKey, method, url, coinType }: GetBalance) => {

  const { data } = await axios.post(
    url,
    {
      jsonrpc: "2.0",
      id: 1,
      method: method,
      params: [publicKey],
    }
  );

  if (coinType === "Solana") return data.result.value;
  if (coinType === "Ethereum") return data.result;

}


export const validateSolanaAddress = (address: string) => {
  try {
    new PublicKey(address);
    return true;
  } catch (e) {
    return false;
  }
};

// export const sendTransaction = async (
//   recipientAddress: string,
//   amount: number,
//   walletPrivateKey: string,
//   selectedNetwork: string
// ) => {
//   const apiUrl =
//     selectedNetwork === "Mainnet"
//       ? import.meta.env.VITE_APP_SOLANA_MAINNET_API_URL
//       : import.meta.env.VITE_APP_SOLANA_DEVNET_API_URL;

//   const privateKey = new Uint8Array(bs58.decode(walletPrivateKey));
//   const fromKeypair = Keypair.fromSecretKey(privateKey);

//   const connection = new Connection(
//     apiUrl,
//     "confirmed"
//   );

//   (async () => {
//     const transaction = new Transaction().add(
//       SystemProgram.transfer({
//         fromPubkey: fromKeypair.publicKey,
//         toPubkey: new PublicKey(recipientAddress),
//         lamports: amount * LAMPORTS_PER_SOL
//       })
//     )

//     const signature = await sendAndConfirmTransaction(
//       connection,
//       transaction,
//       [fromKeypair]
//     )
//     console.log("SIGNATURE: ", signature);
//     return signature;

//   })()

// };

export const sendTransaction = async (
  recipientAddress: string,
  amount: number,
  walletPrivateKey: string,
  selectedNetwork: string
) => {
  console.log("Entered Send Transaction")
  const apiUrl =
    selectedNetwork === "Mainnet"
      ? import.meta.env.VITE_APP_SOLANA_MAINNET_API_URL
      : import.meta.env.VITE_APP_SOLANA_DEVNET_API_URL;

  const connection = new Connection(
    apiUrl,
    "confirmed"
  );
  const privateKey = bs58.decode(walletPrivateKey);
  const fromKeypair = Keypair.fromSecretKey(privateKey);


  // (async () => {
  //   const transaction = new Transaction().add(
  //     SystemProgram.transfer({
  //       fromPubkey: fromKeypair.publicKey,
  //       toPubkey: new PublicKey(recipientAddress),
  //       lamports: amount * LAMPORTS_PER_SOL
  //     })
  //   )

  //   const signature = await sendAndConfirmTransaction(
  //     connection,
  //     transaction,
  //     [fromKeypair]
  //   )
  //   console.log("SIGNATURE: ", signature);
  //   return signature;

  // })()

  const transaction = new Transaction();
  console.log("Transaction: ", transaction);
  const sendSolTransaction = SystemProgram.transfer({
    fromPubkey: fromKeypair.publicKey,
    toPubkey: new PublicKey(recipientAddress),
    lamports: amount * LAMPORTS_PER_SOL
  })


  console.log("sendSolTransaction: ", sendSolTransaction);
  transaction.add(sendSolTransaction);

  // Fetech recent blockhash and set it for the transaction
  const { blockhash } = await connection.getLatestBlockhash();
  console.log("blockhash: ", blockhash);
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = fromKeypair.publicKey

  transaction.sign(fromKeypair);
  
  console.log("transaction: ", transaction)
  try{
    console.log("About to trigger sendAndConfirmTransaction")
    const signature = await sendAndConfirmTransaction(connection, transaction, [fromKeypair], {
      commitment: "processed",
      preflightCommitment: "processed"
    })
    console.log("Transaction signature: ", signature);
    return signature
  } catch(err){
    console.error("Transaction Failer: ", err);
    throw err;
  }

};

