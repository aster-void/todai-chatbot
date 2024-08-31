import { Avatar, Box, Paper, Typography } from "@mui/material";
import { MessageInput } from "./MessageInput";
import { deepOrange } from "@mui/material/colors";
import { useState } from "react";

export function Chat() {
  const [response, setResponse] = useState<string>(""); 
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "90%",
          padding: 2,
          width: "100%",
        }}
      >
        <Avatar sx={{ bgcolor: deepOrange[500] }}>東大</Avatar>
        <Box sx={{ flexGrow: 1, overflowY: "auto", padding: 1 }}>
          {/* Display the response if available */}
          {response ? (
            <Box
              sx={{
                display: "flex",
                marginBottom: 1,
              }}
            >
              <Paper
                sx={{
                  display: "flex",
                  maxWidth: "60%",
                  padding: 1,
                  borderRadius: 2,
                  boxShadow: 1,
                  border: 1,
                }}
              >
                <Typography>{response}</Typography>
              </Paper>
            </Box>
          ) : (
            <Typography>東大チャットbotに質問しましょう!</Typography>
          )}
        </Box>

        {/* Pass setResponse as a prop to MessageInput */}
        <MessageInput setResponse={setResponse} />
      </Box>
    </>
  );
}
