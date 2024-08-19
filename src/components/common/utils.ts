import { mnemonicToSeedSync } from "bip39"
import { derivePath } from "ed25519-hd-key"
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { Buffer } from "buffer";

type DeriveKeyPairProps = {
  mnemonic: string,
  walletNo: number
}

export const deriveKeyPair = ({ mnemonic, walletNo }: DeriveKeyPairProps) =>{
  
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