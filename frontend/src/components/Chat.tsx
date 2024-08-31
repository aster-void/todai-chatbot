import { Avatar, Box, Paper, Typography } from "@mui/material";
import { MessageInput } from "./MessageInput";
import { deepOrange } from "@mui/material/colors";

export function Chat() {
  // const sendMessage = async (msg: SendMessage): Promise<void> => {
  //   await chat.sendDM(msg);
  // };

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
        {/* {messages ? ( */}
        <Avatar sx={{ bgcolor: deepOrange[500] }}>東大</Avatar>
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
              <Typography>何かご質問はありますか？</Typography>
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
