import { Box } from "@chakra-ui/react";
import React from "react";

interface TranslationResultProps {
  result: string;
}

const TranslationResult: React.FC<TranslationResultProps> = ({ result }) => {
  return <Box>{result}</Box>;
};

export default TranslationResult;
