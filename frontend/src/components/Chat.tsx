import { Avatar, Box, Paper, Typography, Link } from "@mui/material";
import { MessageInput } from "./MessageInput";
import { deepOrange } from "@mui/material/colors";
import { useState } from "react";

// Use the shared Message type defined earlier
interface Message {
  type: "user" | "bot";
  content?: string;
  url?: string;
  summary?: string;
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]); // State to hold all messages

  // Function to handle adding a new message
  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: 2,
          width: "100%",
          marginBottom: "120px",
        }}
      >
        <Avatar sx={{ bgcolor: deepOrange[500] }}>東大</Avatar>
        <Box sx={{ flexGrow: 1, overflowY: "auto", padding: 1 }}>
          {/* Map through the messages array and display each message */}
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
                    backgroundColor:
                      message.type === "user" ? "#DCF8C6" : "#FFF",
                  }}
                >
                  {/* Check if the content is a URL and render it as a Link if so */}

                  {message.url ? (
                    <>
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
                    </>
                  ) : (
                    <Typography>
                      {message.summary || message.content}
                    </Typography>
                  )}
                </Paper>
              </Box>
            ))
          ) : (
            <Typography>東大チャットbotに質問しましょう!</Typography>
          )}
        </Box>

        {/* Pass the addMessage function as props to MessageInput */}
        <MessageInput addMessage={addMessage} />
      </Box>
    </>
  );
}
