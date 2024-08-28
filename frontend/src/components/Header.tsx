import { Box, Typography } from "@mui/material";

export function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "0.5rem",
        borderBottom: "1px solid #ddd",
        width: "100%"
      }}
    >
      <Typography variant="h5">東大チャットbot</Typography>
    </Box>
  );
}