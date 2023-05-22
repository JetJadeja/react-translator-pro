import {
  Box,
  Button,
  Select,
  Textarea,
  useColorMode,
  IconButton,
  Divider,
  Text,
  Center,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import React, { useState } from "react";

interface TranslatorFormProps {
  onTranslate: (srcLang: string, tgtLang: string, text: string) => void;
}

const TranslatorForm: React.FC<TranslatorFormProps> = ({ onTranslate }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [srcLang, setSrcLang] = useState("en");
  const [tgtLang, setTgtLang] = useState("fr");
  const [text, setText] = useState("");

  const handleTranslate = () => {
    onTranslate(srcLang, tgtLang, text);
  };

  return (
    <Box
      p={5}
      boxShadow="md"
      borderRadius="md"
      bg={colorMode === "dark" ? "gray.800" : "white"}
    >
      <Center mb={5}>
        <Text fontSize="2xl">Translator Pro</Text>
        <IconButton
          ml={3}
          icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          onClick={toggleColorMode}
        />
      </Center>
      <Divider mb={5} />

      <Select
        value={srcLang}
        onChange={(e) => setSrcLang(e.target.value)}
        mb={3}
      >
        <option value="en">English</option>
        <option value="fr">French</option>
        // Add more languages as required
      </Select>

      <Select
        value={tgtLang}
        onChange={(e) => setTgtLang(e.target.value)}
        mb={3}
      >
        <option value="en">English</option>
        <option value="fr">French</option>
        // Add more languages as required
      </Select>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here"
        bg={colorMode === "dark" ? "gray.900" : "gray.100"}
        height="150px"
        mb={3}
      />

      <Button colorScheme="blue" onClick={handleTranslate}>
        Translate
      </Button>
    </Box>
  );
};

export default TranslatorForm;
