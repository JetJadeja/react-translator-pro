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
  CircularProgress,
  VStack,
  HStack,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon, RepeatIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import axios from "axios";
import languages from "./data/languages";

interface TranslatorFormProps {
  onTranslate: (srcLang: string, tgtLang: string, text: string) => void;
}

const TranslatorForm: React.FC<TranslatorFormProps> = ({ onTranslate }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [srcLang, setSrcLang] = useState("en");
  const [tgtLang, setTgtLang] = useState("fr");
  const [text, setText] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [translationResult, setTranslationResult] = useState("");

  const swapLanguages = () => {
    setSrcLang(tgtLang);
    setTgtLang(srcLang);
    setText(translationResult);
    setTranslationResult(text);
  };

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `${text} \n\n Translate the ${srcLang} text to ${tgtLang}. ${extraInfo}`,
            },
            { role: "user", content: text },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      const translatedText = response.data.choices[0].message.content;
      setTranslationResult(translatedText);
    } catch (error) {
      console.error("Error occurred while translating:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      p={5}
      boxShadow="md"
      borderRadius="md"
      bg={colorMode === "dark" ? "gray.800" : "white"}
    >
      <HStack justifyContent="space-between" mb={5}>
        <Text fontSize="2xl">Translator Pro</Text>
        <IconButton
          icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          onClick={toggleColorMode}
          aria-label="toggle"
        />
      </HStack>

      <Divider mb={5} />

      <HStack mb={3}>
        <Select
          value={srcLang}
          onChange={(e) => setSrcLang(e.target.value)}
          width="48%"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </Select>

        <Spacer />

        <Select
          value={tgtLang}
          onChange={(e) => setTgtLang(e.target.value)}
          width="48%"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </Select>
      </HStack>

      <VStack spacing={3}>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here"
          bg={colorMode === "dark" ? "gray.900" : "gray.100"}
          height="150px"
        />

        <Textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
          placeholder="Enter extra information here"
          bg={colorMode === "dark" ? "gray.900" : "gray.100"}
          height="100px"
        />

        <Button
          colorScheme="blue"
          onClick={handleTranslate}
          isLoading={loading}
        >
          Translate
        </Button>

        {loading && (
          <Center mt={5}>
            <CircularProgress isIndeterminate color="blue.500" />
          </Center>
        )}

        <Textarea
          value={translationResult}
          isReadOnly
          placeholder="Translation will appear here"
          bg={colorMode === "dark" ? "gray.900" : "gray.100"}
          height="150px"
        />
      </VStack>
    </Box>
  );
};

export default TranslatorForm;
