import { useState } from "react";
import styles from "./SolanaWalletGenerator.module.css";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";

interface seedProps {
  seed: Buffer;
}

interface SolanaWallet {
  index: number;
  privateKey: Uint8Array;
  publicKey: string;
}

const SolanaWalletGenerator = ({ seed }: seedProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [solanaWallets, setSolanaWallets] = useState<SolanaWallet[]>([]);

  const generateSolanaWallet = () => {
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
    setSolanaWallets((prevWallets) => [
      ...prevWallets,
      {
        index: currentIndex,
        privateKey: secret,
        publicKey: publicKey,
      },
    ]);
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className={styles.solana_wallet}>
      <button onClick={generateSolanaWallet}>Generate Solana Wallet</button>
      {solanaWallets.map((solanaWallet) => (
        <div>{solanaWallet.publicKey}</div>
      ))}
    </div>
  );
};

export default SolanaWalletGenerator;
