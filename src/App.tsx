import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import SeedPhraseGenerator from "./components/SeedPhraseGenerator/SeedPhraseGenerator";

function App() {
  const [seed, setSeed] = useState<Uint8Array>();
  return (
    <>
      <div className="container">
        <NavBar />
        <SeedPhraseGenerator onSeedGenerated={(seed) => setSeed(seed)} />
      </div>
    </>
  );
}

export default App;
