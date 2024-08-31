import { Box } from "@mui/material";
import "./App.css";
import { Header } from "./components/Header";
import { Chat } from "./components/Chat";

function App() {
  return (
    <>
      <Box
        alignItems="center"
        justifyContent="center"
        width="1300px"
        height="600px"
        bgcolor="#f5f5f5"
      >
        <Header />
        <Chat />
      </Box>
    </>
  );
}

export default App;
