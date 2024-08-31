import { IconButton, Stack, TextField, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

interface Message {
  type: "user" | "bot";
  content?: string;
  url?: string;
  summary?: string;
}
interface MessageInputProps {
  addMessage: (message: Message) => void; // Function to add messages to the parent state
}

export function MessageInput({ addMessage }: MessageInputProps) {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // State to manage loading status

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return; // Prevent sending empty messages

    // Add the user's message to the chat
    addMessage({ type: "user", content: message });
    setLoading(true); // Set loading to true when the request starts

    try {
      const res = await fetch("/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }
      //responseとして、{url: string, summary: string}[]が返ってくるので、それをフォーマットして、stringに変換して、contentに設定したい
      const data = await res.json();
      data.forEach((page: { url: string; summary: string }) => {
        addMessage({
          type: "bot",
          url: page.url,
          summary: page.summary,
        });
      });
    } catch (error) {
      addMessage({
        type: "bot",
        content: "Error sending message: " + (error as Error).message,
      });
    } finally {
      setLoading(false); // Set loading to false when the request completes
    }

    setMessage(""); // Clear the input field after sending
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={1} alignItems="center" margin={2}>
          <TextField
            name="message"
            placeholder="東大チャットbotに質問"
            variant="outlined"
            size="small"
            value={message}
            fullWidth
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading} // Disable input when loading
          />
          <IconButton type="submit" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : <SendIcon />}
          </IconButton>
        </Stack>
      </form>
    </>
  );
}
