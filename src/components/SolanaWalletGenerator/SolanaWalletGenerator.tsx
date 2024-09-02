import { useState } from "react";
import styles from "./SolanaWalletGenerator.module.css";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import axios from "axios";

interface seedProps {
  seed: Buffer;
}

interface SolanaWallet {
  index: number;
  privateKey: string;
  publicKey: string;
  balance: number;
  privateKeyVisible: boolean;
}

const SolanaWalletGenerator = ({ seed }: seedProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [solanaWallets, setSolanaWallets] = useState<SolanaWallet[]>([]);

  const generateSolanaWallet = async () => {
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secretKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secretKey);
    const privateKey = bs58.encode(secretKey);
    const publicKey = keypair.publicKey.toBase58();
    const balance = await getSolanaBalance(publicKey);
    setSolanaWallets((prevWallets) => [
      ...prevWallets,
      {
        index: currentIndex,
        privateKey: privateKey,
        publicKey: publicKey,
        balance: balance,
        privateKeyVisible: true,
      },
    ]);
    setCurrentIndex(currentIndex + 1);
  };

  const deleteWallet = (idx: number) => {
    const updatedWallets = solanaWallets.filter((_, index) => index != idx);
    setSolanaWallets(updatedWallets);
  };

  const getSolanaBalance = async (publicKey: string) => {
    try {
      const url =
        "https://solana-mainnet.g.alchemy.com/v2/VyVawzJyVj8hThqvh2XxUIxJ1drDHbb5";
      const reqBody = {
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: [publicKey],
      };
      const response = await axios.post(url, reqBody);
      const balanceInLamports = response.data.result.value;
      return balanceInLamports / 1e9; // Convert lamports to SOL}
    } catch (error) {
      console.error("Error fetching balance:", error);
      return 0;
    }
  };

  return (
    <div className={styles.solana_wallet}>
      <button onClick={generateSolanaWallet}>Generate Solana Wallet</button>
      {solanaWallets.map((solanaWallet, index) => (
        <div
          className={styles.card_container}
          id={"wallet-id-" + solanaWallet.index}
        >
          <div className={styles.header}>
            <span>Wallet {index + 1}</span>
            <span className={styles.delete} onClick={() => deleteWallet(index)}>
              X
            </span>
          </div>
          <div className={styles.card_section}>
            <div className={styles.card_label}>Private Key:</div>
            <div className={styles.card_value}>
              {solanaWallet.privateKeyVisible
                ? solanaWallet.privateKey
                : "**************************************************"}
            </div>
          </div>
          <div className={styles.card_section}>
            <div className={styles.card_label}>Public Key:</div>
            <div className={styles.card_value}>{solanaWallet.publicKey}</div>
          </div>
          <div className={styles.balance}>
            Balance: {solanaWallet.balance.toString()} SOL
          </div>
        </div>
      ))}
    </div>
  );
};

export default SolanaWalletGenerator;
