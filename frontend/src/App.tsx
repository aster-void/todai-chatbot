import { Box } from "@mui/material";
import "./App.css";
import { Header } from "./components/Header";
import { Chat } from "./components/Chat";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "95vh", // ビューポートの高さを設定
        width: "95vw", // 固定幅を設定
        margin: "0 auto", // 中央揃え
        backgroundColor: "white",
        color: "black",
      }}
    >
      <Header />
      <Box
        sx={{
          flex: 1, // このBoxが残りのスペースを埋める
          display: "flex",
          flexDirection: "column",
          overflow: "hidden", // コンテンツがはみ出さないように
        }}
      >
        <Chat />
      </Box>
    </Box>
  );
}

export default App;
