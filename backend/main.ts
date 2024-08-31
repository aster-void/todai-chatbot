import express from "express";
import messageRouter from "./router/chat";
// import { ChatOpenAI } from "@langchain/openai";

// LangChain の ChatOpenAI クラスは OPENAI_API_KEY 環境変数を自動的に参照する
// const chatModel = new ChatOpenAI();
const app = express();

// 使用するホスティングサービス (Render など) によってはリクエストを受け付けるポートが指定されている場合がある。
// たいていの場合は PORT という名前の環境変数を通して参照できる。
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));

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

// ルーティング
app.use("/send", messageRouter);

app.listen(port, () => {
  console.log("backend is running on port", port);
});
