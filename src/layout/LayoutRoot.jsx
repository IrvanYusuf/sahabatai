import { Box, Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useUser } from "../context/userContext";

const LayoutRoot = () => {
  return (
    <Grid container sx={{ height: "100vh", maxHeight: "100vh" }}>
      <Grid
        item
        xs={0}
        sm={3}
        sx={{ height: "100%", display: { xs: "none", sm: "grid" } }}
      >
        <Sidebar />
      </Grid>
      <Grid item xs={12} sm={9} sx={{ height: "100%" }}>
        <Box sx={{ position: "relative", height: "100%" }}>
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
};

export default LayoutRoot;
