import { IconButton, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

export function MessageInput() {

  const [message, setMessage] = useState<string>("");

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setMessage("");
        }}
        method="post" 
        action="/send"
      >
        <Stack direction="row" spacing={1} alignItems="center" margin={2}>
          <TextField
            name="message"
            placeholder="東大チャットbotに質問"
            variant="outlined"
            size="small"
            value={message}
            fullWidth={true}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton type="submit" color="primary">
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
    </>
  );
}
