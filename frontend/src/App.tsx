import { Box } from "@mui/material";
import "./App.css";
import { Header } from "./components/Header";
import { Chat } from "./components/Chat";

function App() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh" // ビューポートの高さを設定
      width="100vh"
    >
      <Box>
        <Header />
      </Box>
      <Box
        flex="1" // このBoxが残りのスペースを埋める
        display="flex"
        flexDirection="column"
      >
        <Chat />
      </Box>
    </Box>
  );
}

export default App;
