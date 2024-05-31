import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import LogoImg from "../../assets/logo-white.png";
import TextTransition, { presets } from "react-text-transition";

const AuthContainerPage = (props) => {
  const [index, setIndex] = useState(0);

  const TEXTS = ["AI", "Manusia", "Selamanya"];

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <Box maxHeight={"100%"} height={"100vh"}>
      <Grid container height={{ xs: "800px", sm: "100%" }}>
        <Grid item xs={12} sm={6} bgcolor={"#5562B3"}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                columnGap: "10px",
              }}
            >
              <img src={LogoImg} alt="logo" width={"60px"} />
              <Typography
                sx={{
                  fontSize: { xs: "30px", sm: "38px" },
                  color: "white",
                  fontWeight: "semibold",
                }}
              >
                Sahabat{" "}
              </Typography>
              <Typography
                component={"span"}
                sx={{ fontSize: { xs: "30px", sm: "38px" }, color: "white" }}
              >
                <TextTransition springConfig={presets.wobbly}>
                  {TEXTS[index % TEXTS.length]}
                </TextTransition>
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          {props.children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthContainerPage;
