import { Box } from "@mui/material";
import "./App.css";
import { Header } from "./components/Header";
import { Chat } from "./components/chat";

function App() {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100vh"
        bgcolor="#f5f5f5" 
      >
        <Header />
        <Chat />
      </Box>
    </>
  );
}


export default App;
