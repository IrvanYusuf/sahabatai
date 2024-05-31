import { Avatar, Card, Skeleton, Stack } from "@mui/material";
import React from "react";

const BubbleChatSkeleton = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        padding: "10px",
        width: "100%",
        border: "1px solid #7E8EF1",
        marginBottom: "30px", // Make sure there's space for the fixed input box
        display: "flex",
        alignItems: "start",
        columnGap: "8px",
      }}
    >
      {/* {isLoading ? "loading...." : response} */}
      <Skeleton
        animation="wave"
        variant="circular"
        sx={{ width: "40px", height: "40px" }}
      />
      <Stack sx={{ width: "100%" }}>
        <Skeleton animation="wave" variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton animation="wave" variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton animation="wave" variant="text" sx={{ fontSize: "1rem" }} />
      </Stack>
    </Card>
  );
};

export default BubbleChatSkeleton;
