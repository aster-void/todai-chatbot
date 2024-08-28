import { Box, Paper, Typography } from "@mui/material";
import { MessageInput } from "./MessageInput";

export function Chat() {
  // const sendMessage = async (msg: SendMessage): Promise<void> => {
  //   await chat.sendDM(msg);
  // };

  return (
    <>
      <Typography>東大チャットbot</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "90%",
          padding: 2,
        }}
      >
        {/* {messages ? ( */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", padding: 1 }}>
          {/* {messages.map((m) => ( */}
          <Box
            // key={m.id}
            sx={{
              display: "flex",
              // justifyContent: m.creator === id ? "flex-end" : "flex-start",
              marginBottom: 1,
            }}
          >
            <Paper
              sx={{
                display: "flex",
                maxWidth: "60%",
                padding: 1,
                borderRadius: 2,
                // backgroundColor: m.creator === id ? "#DCF8C6" : "#FFF",
                boxShadow: 1,
                border: 1,
              }}
            >
              {/* <Typography>{m.content}</Typography> */}
            </Paper>
          </Box>
          {/* ))} */}
        </Box>
        {/* ) : (
          <Typography>東大チャットbotに質問しましょう!</Typography>
        )} */}

        <MessageInput /*send={sendDMMessage} room={room} */ />
      </Box>
    </>
  );
}
