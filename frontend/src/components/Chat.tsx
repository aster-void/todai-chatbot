import { Avatar, Box, Paper, Typography } from "@mui/material";
import { MessageInput } from "./MessageInput";
import { deepOrange } from "@mui/material/colors";
import { useState } from "react";

export function Chat() {
  const [request, setRequest] = useState<string>(""); // State to hold the user's message
  const [response, setResponse] = useState<string>(""); // State to hold the response from the server

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
          {/* Display the user's message if available */}
          {request && (
            <Box sx={{ display: "flex", marginBottom: 1 }}>
              <Paper
                sx={{
                  display: "flex",
                  maxWidth: "60%",
                  padding: 1,
                  borderRadius: 2,
                  boxShadow: 1,
                  border: 1,
                  backgroundColor: "#DCF8C6", // Different color for user's message
                }}
              >
                <Typography>{request}</Typography>
              </Paper>
            </Box>
          )}

          {/* Display the server's response if available */}
          {response && (
            <Box sx={{ display: "flex", marginBottom: 1 }}>
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
          )}

          {/* Show default message if no request or response */}
          {!request && !response && (
            <Typography>東大チャットbotに質問しましょう!</Typography>
          )}
        </Box>

        {/* Pass setResponse and setRequest as props to MessageInput */}
        <MessageInput setResponse={setResponse} setRequest={setRequest} />
      </Box>
    </>
  );
}
