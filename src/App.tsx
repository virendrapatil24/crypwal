import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import SeedPhraseGenerator from "./components/SeedPhraseGenerator/SeedPhraseGenerator";

function App() {
  return (
    <>
      <div className="container">
        <NavBar />
        <SeedPhraseGenerator />
      </div>
    </>
  );
}

export default App;
