import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LogoImg from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { MdExpandLess } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { HiPencilAlt } from "react-icons/hi";
import { supabase } from "../supabase/supabase";
import { useUser } from "../context/userContext";
import CatGif from "../assets/cat.gif";
import { useHistoryChats } from "../context/useHistoryChatContext";

const Sidebar = () => {
  const { historyChats, setHistoryChats } = useHistoryChats();
  const [openCollapse, setOpenCollapse] = useState(true);
  const [openCollapseYesterday, setOpenCollapseYesterday] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = !!anchorEl;
  const { user } = useUser();
  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getHistoryChats = async () => {
    const { data, error } = await supabase
      .from("tbl_prompt_parent")
      .select()
      .eq("id_user", user.id);

    setHistoryChats(data);
  };

  const deleteHistoryChats = async (id) => {
    try {
      const { data: dataDeleteHistoryChats, error } = await supabase
        .from("tbl_prompt_parent")
        .delete()
        .eq("id", id)
        .select();

      const updateDate = historyChats.filter(
        (data) => data.id !== dataDeleteHistoryChats[0].id
      );
      setHistoryChats(updateDate);
      console.log(dataDeleteHistoryChats);

      if (dataDeleteHistoryChats) {
        return navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHistoryChats();
  }, [user.id]);
  return (
    <Box
      sx={{
        backgroundColor: "#F0F0F0",
        padding: 2,
        height: "100%",
        maxHeight: "100%",
        width: "100%",
      }}
    >
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Stack flexDirection={"row"} alignItems={"center"} columnGap={"10px"}>
            <img src={LogoImg} alt="logo" width={"40px"} />
            <Typography sx={{ color: "#3D3B40", fontSize: "25px" }}>
              Sahabat
              <Typography
                component={"span"}
                sx={{ color: "#5562B3", fontSize: "25px", fontWeight: "bold" }}
              >
                AI
              </Typography>
            </Typography>
          </Stack>
        </Link>
        <Tooltip title="New Chat">
          <Link to={"/"}>
            <IconButton>
              <HiPencilAlt size={20} />
            </IconButton>
          </Link>
        </Tooltip>
      </Stack>
      <Box
        sx={{
          height: "calc(100vh - 140px)",
          overflowY: "hidden",
          maxHeight: "100%",
          paddingBottom: "20px",
        }}
      >
        <Box
          sx={{
            marginTop: "20px",
            height: "100%",
            overflowY: "scroll",
            maxHeight: "100%",
          }}
        >
          <List
            disablePadding
            sx={{ p: 0, overflowY: "scroll", height: "100%" }}
          >
            <ListItemButton
              sx={{ px: "8px" }}
              onClick={() => setOpenCollapse(!openCollapse)}
            >
              <ListItemText primary="History" />
              {openCollapse ? <MdExpandMore /> : <MdExpandLess />}
            </ListItemButton>
            <Collapse in={openCollapse} timeout="auto" unmountOnExit>
              <List component="div">
                {historyChats.length === 0 && (
                  <Box sx={{ textAlign: "center" }}>
                    <img src={CatGif} alt="" width={"100px"} />
                    <Typography>Empty Chat</Typography>
                  </Box>
                )}
                {historyChats.map((chat) => (
                  <Box>
                    <Link
                      to={`/c/${chat.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Box
                        sx={{
                          p: "8px",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "8px",
                          "&:hover": {
                            backgroundColor: "#D1D4C9",
                          },
                        }}
                      >
                        <Typography>{chat.prompt}</Typography>
                        <Tooltip title="Delete Chat">
                          <IconButton
                            onClick={() => deleteHistoryChats(chat.id)}
                          >
                            <FaTrash
                              color="red"
                              style={{
                                cursor: "pointer",
                              }}
                              size={18}
                            />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Link>
                  </Box>
                ))}
              </List>
            </Collapse>
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
