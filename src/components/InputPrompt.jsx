import React from "react";
import { Box, Button, TextField, TextareaAutosize } from "@mui/material";
import { BiSend } from "react-icons/bi";

const InputPrompt = ({ fetchPromptUser, setPromptUser, promptUser }) => {
  return (
    <Box
      sx={{
        display: "flex",
        marginTop: "auto",
        paddingX: "20px",
        borderTop: "1px solid #EEEEEE",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={fetchPromptUser}
        style={{
          display: "flex",
          alignItems: "center",
          columnGap: "10px",
          width: "100%",
          paddingTop: "30px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "end",
            border: "1px solid #5562B3",
            alignItems: "end",
            borderRadius: "8px",
          }}
        >
          <TextField
            placeholder="Masukkan Perintah...."
            size="small"
            sx={{
              width: "92%",
              fontSize: "16px",
              "& fieldset": { border: "none" },
              paddingY: "20px",
            }}
            onChange={(e) => setPromptUser(e.target.value)}
            value={promptUser}
            multiline
          />
          <Box>
            <Button
              type="submit"
              variant="contained"
              // color="primary"
              sx={{ padding: "8px", backgroundColor: "#5562B3" }}
            >
              <BiSend size={"20px"} />
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default InputPrompt;
