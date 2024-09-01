import { useState } from "react";
import styles from "./SolanaWalletGenerator.module.css";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

interface seedProps {
  seed: Buffer;
}

interface SolanaWallet {
  index: number;
  privateKey: string;
  publicKey: string;
}

const SolanaWalletGenerator = ({ seed }: seedProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [solanaWallets, setSolanaWallets] = useState<SolanaWallet[]>([]);

  const generateSolanaWallet = () => {
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secretKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secretKey);

    const privateKey = bs58.encode(secretKey);
    const publicKey = keypair.publicKey.toBase58();
    setSolanaWallets((prevWallets) => [
      ...prevWallets,
      {
        index: currentIndex,
        privateKey: privateKey,
        publicKey: publicKey,
      },
    ]);
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className={styles.solana_wallet}>
      <button onClick={generateSolanaWallet}>Generate Solana Wallet</button>
      {solanaWallets.map((solanaWallet, index) => (
        <div
          className={styles.card_container}
          id={"wallet-id-" + solanaWallet.index}
        >
          <div className={styles.wallet_number}>Wallet {index + 1}</div>
          <div className={styles.card_section}>
            <div className={styles.card_label}>Private Key:</div>
            <div className={styles.card_value}>{solanaWallet.privateKey}</div>
          </div>
          <div className={styles.card_section}>
            <div className={styles.card_label}>Public Key:</div>
            <div className={styles.card_value}>{solanaWallet.publicKey}</div>
          </div>
          <div className={styles.balance}>Balance: $ 0.00</div>
        </div>
      ))}
    </div>
  );
};

export default SolanaWalletGenerator;
