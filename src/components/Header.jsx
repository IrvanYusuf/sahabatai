import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoMdLogOut, IoMdMoon } from "react-icons/io";
import { supabase } from "../supabase/supabase";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { RiMenu2Fill } from "react-icons/ri";
import Sidebar from "./Sidebar";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = !!anchorEl;
  const navigate = useNavigate();
  const { setUser, user } = useUser();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDrawer = () => {
    setOpenSidebar(true);
  };

  const handleCloseDrawer = () => {
    setOpenSidebar(false);
  };

  const handleLogOut = async () => {
    const { data, error } = await supabase.auth.signOut();
    setUser(null);
    console.log(error);
    console.log(data);
    navigate("/login");
  };

  useEffect(() => {
    if (user?.user_metadata?.avatar_url) {
      const img = new Image();
      img.src = user.user_metadata.avatar_url;
      img.onload = () => setAvatarUrl(user.user_metadata.avatar_url);
    }
  }, [user]);

  return (
    <Box
      sx={{
        px: 2,
        py: "5px",
        borderBottom: "1px solid #EEEEEE",
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "space-between", sm: "end" },
      }}
    >
      <IconButton
        onClick={handleOpenDrawer}
        sx={{ display: { xs: "flex", sm: "none" } }}
      >
        <RiMenu2Fill />
      </IconButton>
      <Drawer
        open={openSidebar}
        onClose={handleCloseDrawer}
        sx={{ width: "100%" }}
      >
        <Box sx={{ width: "280px" }}>
          <Sidebar />
        </Box>
      </Drawer>
      <Box sx={{ display: "flex", alignItems: "center", columnGap: "20px" }}>
        {/* <Box
          sx={{
            backgroundColor: "#F0F0F0",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            cursor: "pointer",
            border: "1px solid #DDDDDD",
          }}
        >
          <IoMdMoon color="grey" size={"20px"} />
        </Box> */}
        <Avatar
          onClick={handleClick}
          sx={{ cursor: "pointer" }}
          src={avatarUrl && avatarUrl}
        />
        <Menu
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
          elevation={0}
          sx={{ marginTop: "10px" }}
          PaperProps={{
            sx: { border: "1px solid #DDDDDD", backgroundColor: "#F0F0F0" },
          }}
        >
          <MenuItem onClick={handleLogOut}>
            <IoMdLogOut size={22} color="red" style={{ marginRight: "8px" }} />
            Log out
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
