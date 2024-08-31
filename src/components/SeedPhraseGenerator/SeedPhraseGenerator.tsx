import { useState } from "react";
import styles from "./SeedPhraseGenerator.module.css";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";

interface SeedGeneratorProps {
  onSeedGenerated: (seed: Buffer) => void;
  isSeedGenerated: (status: boolean) => void;
}

const SeedPhraseGenerator = ({
  onSeedGenerated,
  isSeedGenerated,
}: SeedGeneratorProps) => {
  const [mnemonicWords, setMnemonicWords] = useState<string[]>([
    ...Array(12).fill(""),
  ]);
  const [seedPhraseStatus, setSeedPhraseStatus] = useState(false);

  const generateMnemonicWords = async () => {
    if (!seedPhraseStatus) {
      const words = await generateMnemonic();
      setMnemonicWords(words.split(" "));
      const seed = mnemonicToSeedSync(words);
      onSeedGenerated(seed);
      isSeedGenerated(true);
      setSeedPhraseStatus(true);
    }
  };

  return (
    <div className={styles.seed_phrase}>
      <button onClick={generateMnemonicWords} disabled={seedPhraseStatus}>
        {seedPhraseStatus ? "Seed Phrase Generated" : "Generate Seed Phrase"}
      </button>
      <div className={styles.seed_phrase_grid}>
        {seedPhraseStatus &&
          mnemonicWords.map((mnemonicWord, index) => (
            <div key={`mnemonic-word-${index}`}>
              {index + 1}. {mnemonicWord}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SeedPhraseGenerator;
