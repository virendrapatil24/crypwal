import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import SeedPhraseGenerator from "./components/SeedPhraseGenerator/SeedPhraseGenerator";
import SolanaWalletGenerator from "./components/SolanaWalletGenerator/SolanaWalletGenerator";
import EthereumWalletGenerator from "./components/EthereumWalletGenerator/EthereumWalletGenerator";

function App() {
  const [seed, setSeed] = useState<Buffer>(Buffer.alloc(0));
  return (
    <>
      <div className="container">
        <NavBar />
        <SeedPhraseGenerator onSeedGenerated={(seed) => setSeed(seed)} />
        <SolanaWalletGenerator seed={seed} />
        <EthereumWalletGenerator seed={seed} />
      </div>
    </>
  );
}

export default App;
