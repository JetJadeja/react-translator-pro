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
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import axios from "axios";

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

  // Handle translation
  const handleTranslate = async () => {
    // Loading bar
    setLoading(true);

    try {
      console.log("Key", process.env.REACT_APP_OPENAI_API_KEY);
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

      // Get the translated text from the API response
      const translatedText = response.data.choices[0].message.content;
      console.log(translatedText);
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
      <Center mb={5}>
        <Text fontSize="2xl">Translator Pro</Text>
        <IconButton
          ml={3}
          icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          onClick={toggleColorMode}
          aria-label="toggle"
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

      {loading && (
        <Center mt={5}>
          <CircularProgress isIndeterminate color="blue.500" />
        </Center>
      )}
      <Box mt={5} mb={3}>
        <Text fontSize="xl">Translation Result:</Text>
        <Text>{translationResult}</Text>
      </Box>

      <Textarea
        value={extraInfo}
        onChange={(e) => setExtraInfo(e.target.value)}
        placeholder="Enter extra information here"
        bg={colorMode === "dark" ? "gray.900" : "gray.100"}
        height="150px"
        mb={3}
      />
    </Box>
  );
};

export default TranslatorForm;
