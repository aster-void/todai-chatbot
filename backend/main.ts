import express from "express";
// import { ChatOpenAI } from "@langchain/openai";

// LangChain の ChatOpenAI クラスは OPENAI_API_KEY 環境変数を自動的に参照する
// const chatModel = new ChatOpenAI();
const app = express();

// 使用するホスティングサービス (Render など) によってはリクエストを受け付けるポートが指定されている場合がある。
// たいていの場合は PORT という名前の環境変数を通して参照できる。
const port = process.env.PORT || 3000;

// 静的ファイルの提供
app.use(express.static("./public"));

// リクエストボディを JSON として解釈して request.body に格納する
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from Backend" });
});

// app.post("/chat", async (request, response) => {
//   const promptText = request?.body?.promptText;
//   // クライアントから送られてきたデータは無条件で信用しない
//   if (typeof promptText !== "string") {
//     response.sendStatus(400);
//     return;
//   }

//   const aiMessageChunk = await chatModel.invoke(promptText);
//   response.json({ content: aiMessageChunk.content });
// });

app.listen(port, () => {
  console.log("backend is running on port", port);
});
