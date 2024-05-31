import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import BubbleChatSkeleton from "../components/BubbleChatSkeleton";
import Header from "../components/Header";
import InputPrompt from "../components/InputPrompt";
import useFetchPrompt from "../hooks/useFetchPrompt";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabase";
import { useUser } from "../context/userContext";
import useInitialChat from "../hooks/useInitialChat";
import { useHistoryChats } from "../context/useHistoryChatContext";
import LogoImg from "../assets/logo.png";
import LeluconIcon from "../assets/lelucon.png";
import PantunIcon from "../assets/pantun.png";
import PuisiIcon from "../assets/puisi.png";
import QuoteIcon from "../assets/quote.png";

const HomePage = () => {
  const [promptUser, setPromptUser] = useState("");
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const location = useLocation();
  const { user } = useUser();
  const navigate = useNavigate();
  const { historyChats, setHistoryChats } = useHistoryChats();

  const fetchPromptUser = async (e) => {
    e.preventDefault();
    setPromptUser("");
    setIsLoading(true);
    const data = await useFetchPrompt(promptUser);

    const messageResponse = data.candidates[0].content.parts[0].text;

    // insert to table prompt parent
    const { data: insertData, error } = await supabase
      .from("tbl_prompt_parent")
      .insert({ prompt: promptUser, id_user: user.id })
      .select();
    setHistoryChats((prev) => [...prev, ...insertData]);

    // insert to tbl chats
    const { data: insertTableChats, error: insertTableChatsError } =
      await useInitialChat(insertData, user.id, promptUser, messageResponse);

    setIsLoading(false);
    if (insertData) {
      return navigate(`/c/${insertData[0].id}`);
    }
  };

  const initializePromptStarted = [
    {
      icon: PantunIcon,
      prompt: "Buatkan saya pantun lucu",
      bgColor: "#f56564",
    },
    {
      icon: QuoteIcon,
      prompt: "Buatkan saya quote",
      bgColor: "#7551f5",
    },
    {
      icon: PuisiIcon,
      prompt: "Buatkan saya puisi singkat",
      bgColor: "#7e8ef1",
    },
    {
      icon: LeluconIcon,
      prompt: "Buatkan saya lelucon lucu singkat",
      bgColor: "#43ba7f",
    },
  ];

  return (
    <Box
      sx={{
        py: 2,
        position: "relative",
        display: "flex",
        maxHeight: "100%",
        width: "100%",
        overflowY: "hidden",
        maxWidth: "100%",
        zIndex: 99,
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          overflowY: "hidden",
          maxWidth: "100%",
          maxHeight: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <Box
          sx={{
            overflowY: "scroll",
            px: 2,
            height: "calc(100vh - 30px)",
            marginTop: "10px",
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img src={LogoImg} alt="logo" />
            <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
              Tanya Apapun Yang Kamu Mau
            </Typography>
            <Grid container sx={{ marginTop: "30px" }}>
              {initializePromptStarted.map((item, i) => (
                <Grid item xs={6} sm={3} key={i} sx={{ marginBottom: "14px" }}>
                  <Box
                    sx={{
                      border: `1px solid ${item.bgColor}`,
                      padding: "12px",
                      borderRadius: "14px",
                      height: "100%",
                      backgroundColor: item.bgColor,
                      color: "white",
                      width: "90%",
                      cursor: "pointer",
                    }}
                    onClick={() => setPromptUser(item.prompt)}
                  >
                    <img src={item.icon} alt="" />
                    <Typography>{item.prompt}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          {isLoading && <BubbleChatSkeleton />}
        </Box>
        <InputPrompt
          fetchPromptUser={fetchPromptUser}
          promptUser={promptUser}
          setPromptUser={setPromptUser}
        />
      </Box>
    </Box>
  );
};

export default HomePage;
