import {
  Alert,
  Avatar,
  Box,
  Card,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import LogoImg from "../assets/logo.png";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  docco,
  anOldHope,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import CopyToClipboard from "react-copy-to-clipboard";
import { MdContentCopy } from "react-icons/md";

const BubbleChat = ({ isOwn, message, errorMsg }) => {
  const [copy, setCopy] = useState(false);
  const [isCode, setIsCode] = useState(false);

  const convertSpecialCharacters = (text) => {
    // Mendefinisikan daftar karakter khusus dan elemen HTML yang sesuai
    const specialChars = [
      { char: "\n", html: "<br />" },
      { char: "*", html: "<strong>" },
      { char: "**", html: "</strong>" },
      // Tambahkan karakter khusus dan elemen HTML yang sesuai di sini
    ];

    // Mengganti setiap karakter khusus dengan elemen HTML yang sesuai
    let convertedText = text;
    specialChars.forEach(({ char, html }) => {
      const regex = new RegExp(
        char.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
        "g"
      );
      convertedText = convertedText.replace(regex, html);
    });

    return convertedText;
  };

  const extractAndConvert = (message) => {
    const parts = message.split(/(```[\s\S]*?```)/g); // Membagi pesan menjadi teks biasa dan blok kode
    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        // Jika bagian ini adalah blok kode
        let codeContent = part.slice(3, -3); // Menghapus triple backticks
        setIsCode(true);
        const splitCode = codeContent.split("\n");
        codeContent = splitCode.slice(1);
        let joinCodeContent = codeContent.join("\n");
        console.log(joinCodeContent);
        return (
          <Box>
            <Box
              sx={{
                backgroundColor: "#545454",
                p: "4px 10px",
                borderRadius: "8px 8px 0px 0px",
                textAlign: "end",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                // marginBottom: "-20px",
              }}
            >
              <Typography fontSize={"13px"}>{splitCode[0]}</Typography>
              <CopyToClipboard
                text={codeContent}
                onCopy={() => {
                  setCopy(true);
                  setTimeout(() => {
                    setCopy(false);
                  }, 1000);
                }}
              >
                <Stack
                  flexDirection={"row"}
                  alignItems={"center"}
                  columnGap={"10px"}
                >
                  <MdContentCopy />
                  <Typography sx={{ cursor: "pointer", fontSize: "13px" }}>
                    Copy Code
                  </Typography>
                </Stack>
              </CopyToClipboard>
            </Box>
            <SyntaxHighlighter
              language={splitCode[0]}
              key={index}
              style={anOldHope}
              wrapLongLines={true}
              customStyle={{
                backgroundColor: "#191919",
                color: "#fff",
                width: "100%",
                borderRadius: "0px 0px 8px 8px",
                marginTop: 0,
              }}
            >
              {joinCodeContent}
            </SyntaxHighlighter>
          </Box>
        );
      } else {
        // Jika bagian ini adalah teks biasa
        const convertedText = convertSpecialCharacters(part);
        return (
          <Typography
            key={index}
            component="span"
            dangerouslySetInnerHTML={{ __html: convertedText }}
          />
        );
      }
    });
  };

  const processedMessage = useMemo(() => extractAndConvert(message), [message]);

  return (
    <Card
      variant="outlined"
      sx={{
        padding: "10px",
        maxWidth: "100%",
        border: `1px solid ${
          isOwn === "user" ? "#F0F0F0" : errorMsg ? "red" : "#7E8EF1"
        }`,
        marginBottom: "30px", // Make sure there's space for the fixed input box
        display: "flex",
        alignItems: "start",
        columnGap: "14px",
        backgroundColor: `${isOwn !== "user" ? "#5562B3" : "#F0F0F0"}`,
        color: `${isOwn !== "user" && "#F0F0F0"}`,
      }}
    >
      <Box
        sx={{
          backgroundColor: `${isOwn !== "user" && "white"}`,
          padding: "4px",
          borderRadius: "50%",
          display: { xs: "none", sm: "block" },
        }}
      >
        <Avatar
          src={isOwn === "model" && LogoImg}
          sx={{ display: { xs: "none", sm: "flex" } }}
        />
      </Box>

      <Box sx={{ width: "100%" }}>
        {isCode && copy && (
          <Alert variant="filled" severity="success" sx={{ mb: "10px" }}>
            Copied
          </Alert>
        )}
        <Typography>{processedMessage}</Typography>
      </Box>
    </Card>
  );
};

export default BubbleChat;
