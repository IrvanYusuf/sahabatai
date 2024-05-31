import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import InputPrompt from "../components/InputPrompt";
import BubbleChat from "../components/BubbleChat";
import BubbleChatSkeleton from "../components/BubbleChatSkeleton";
import { supabase } from "../supabase/supabase";
import { useParams } from "react-router-dom";
import useFetchPrompt from "../hooks/useFetchPrompt";
import useCreateChats from "../hooks/useUpdateChats";
import { useUser } from "../context/userContext";
import useGetChats from "../hooks/useGetChats";
import useUpdateChats from "../hooks/useUpdateChats";
import useInitialChat from "../hooks/useInitialChat";

const ChatPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [promptUser, setPromptUser] = useState("");
  const cardRef = useRef(null);
  const { idPromptParent } = useParams();
  const { user } = useUser();
  const getChats = async () => {
    const { data, error } = await useGetChats(idPromptParent, user.id);
    setResponse(data[0].message);
    console.log(error);
    console.log(data.length);
  };

  const fetchPromptUser = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const data = await useFetchPrompt(promptUser);
      const messageResponse = data.candidates[0].content.parts[0].text;

      const newMessage = [
        ...response,
        { sender: "user", message: promptUser },
        { sender: "model", message: messageResponse },
      ];
      console.log(newMessage);

      // update into tbl chats
      const { data: insertTableChats, error } = await useUpdateChats(
        idPromptParent,
        user.id,
        newMessage
      );
      console.log(insertTableChats);
      console.log(error);
      setResponse(insertTableChats[0].message);

      setIsLoading(false);
      setPromptUser("");
      console.log(data);
    } catch (error) {
      console.log(error);
      setPromptUser("");
    }
  };

  const scrollMessageToBottom = () => {
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    getChats();
  }, [idPromptParent]);

  useEffect(() => {
    scrollMessageToBottom();
  }, [response, isLoading]);

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
          {response?.map((item, i) => (
            <Box key={i} sx={{ flex: 1 }}>
              <BubbleChat
                isOwn={item.sender && item.sender}
                message={item.message}
                errorMsg={errorMsg}
              />
            </Box>
          ))}
          {isLoading && <BubbleChatSkeleton />}
          <div ref={cardRef}></div>
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

export default ChatPage;
