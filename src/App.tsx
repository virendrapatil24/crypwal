import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import SeedPhraseGenerator from "./components/SeedPhraseGenerator/SeedPhraseGenerator";
import SolanaWalletGenerator from "./components/SolanaWallet/SolanaWalletGenerator";

function App() {
  const [seed, setSeed] = useState<Buffer>(Buffer.alloc(0));
  console.log("Seed is here now", seed);
  return (
    <>
      <div className="container">
        <NavBar />
        <SeedPhraseGenerator onSeedGenerated={(seed) => setSeed(seed)} />
        <SolanaWalletGenerator seed={seed} />
        <SolanaWalletGenerator seed={seed} />
      </div>
    </>
  );
}

export default App;
