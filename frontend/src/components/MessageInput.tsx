import { IconButton, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export function MessageInput() {
  // const { send, room } = props;

  // const [message, _setMessage] = useState<string>("");
  // const setMessage = (m: string) => {
  //   _setMessage(m);
  //   crossRoomMessageState.set(room.friendId, m);
  // };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // send(room.friendId, {
          //   content: message,
          // });
          // setMessage("");
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center" margin={2}>
          <TextField
            name="message"
            placeholder="東大チャットbotに質問"
            variant="outlined"
            size="small"
            // value={message}
            fullWidth={true}
            // onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton type="submit" color="primary">
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
    </>
  );
}
