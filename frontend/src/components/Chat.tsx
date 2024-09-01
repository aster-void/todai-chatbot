import { Avatar, Box, Paper, Typography, Link } from "@mui/material";
import { MessageInput } from "./MessageInput";
import { deepOrange } from "@mui/material/colors";
import { useState } from "react";

interface Message {
  type: "user" | "bot";
  content?: string;
  url?: string;
  summary?: string;
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "90%",
        padding: 2,
        position: "relative",
      }}
    >
      <Avatar sx={{ bgcolor: deepOrange[500] }}>東大</Avatar>

      {/* Adjusted Box to ensure it does not overlap with the input */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          padding: 1,
          marginBottom: "80px", // Ensure space for the input box
        }}
      >
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                marginBottom: 1,
                justifyContent:
                  message.type === "user" ? "flex-end" : "flex-start",
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
                  backgroundColor: message.type === "user" ? "#DCF8C6" : "#FFF",
                }}
              >
                {message.url ? (
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Link
                      href={message.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {message.url}
                    </Link>
                    {message.summary}
                  </Box>
                ) : (
                  <Typography>{message.summary || message.content}</Typography>
                )}
              </Paper>
            </Box>
          ))
        ) : (
          <Typography>東大チャットbotに質問しましょう!</Typography>
        )}
      </Box>

      {/* MessageInput component at the bottom */}
      <Box
        sx={{
          position: "fixed", // Fixed position to stay at the bottom
          bottom: 10, // 10px from the bottom
          left: "5%", // Centered horizontally based on parent width
          right: "5%", // Centered horizontally based on parent width
          padding: 2,
          backgroundColor: "white", // Background color to cover content behind it
        }}
      >
        <MessageInput addMessage={addMessage} />
      </Box>
    </Box>
  );
}
