import { Box } from "@mui/material";
import "./App.css";
import { Header } from "./components/Header";
import { Chat } from "./components/Chat";

function App() {
  return (
    <>
      <Box
        alignItems="center"
        justifyContent="flex-start" // Headerを最上部に配置
        height="700px" // ビューポートの高さを設定
        width="1200px"
      >
        <Header />
        <Chat />
      </Box>
    </>
  );
}

export default App;
