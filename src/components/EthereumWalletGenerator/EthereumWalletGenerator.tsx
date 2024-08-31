import { useState } from "react";
import styles from "./EthereumWalletGenerator.module.css";
import { Wallet, HDNodeWallet } from "ethers";

interface seedProps {
  seed: Buffer;
}

interface EthereumWallet {
  index: number;
  privateKey: string;
  address: string;
}

const EthereumWalletGenerator = ({ seed }: seedProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ethereumWallets, setEthereumWallets] = useState<EthereumWallet[]>([]);

  const generateEthereumWallet = () => {
    const path = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(path);
    const secret = child.privateKey;
    const wallet = new Wallet(secret);
    setEthereumWallets((preWallets) => [
      ...preWallets,
      {
        index: currentIndex,
        privateKey: secret,
        address: wallet.address,
      },
    ]);
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className={styles.ethereum_wallet}>
      <button onClick={generateEthereumWallet}>Generate Ethereum Wallet</button>
      {ethereumWallets.map((ethereumWallet) => (
        <div>{ethereumWallet.address}</div>
      ))}
    </div>
  );
};

export default EthereumWalletGenerator;
