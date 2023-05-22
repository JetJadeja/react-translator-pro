import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import TranslatorForm from "./components/TranslatorForm";
import TranslationResult from "./components/TranslationResult";

const App: React.FC = () => {
  const [translationResult, setTranslationResult] = useState("");

  const translate = async (srcLang: string, tgtLang: string, text: string) => {
    // Call your translation API here and get the result
    // setTranslationResult(result);
  };

  return (
    <Box>
      <TranslatorForm onTranslate={translate} />
      <TranslationResult result={translationResult} />
    </Box>
  );
};

export default App;
