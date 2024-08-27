"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const openai_1 = require("@langchain/openai");
// LangChain の ChatOpenAI クラスは OPENAI_API_KEY 環境変数を自動的に参照する
const chatModel = new openai_1.ChatOpenAI();
const app = (0, express_1.default)();
// public ディレクトリ下のファイルに適切なパスでアクセスできるようにする
app.use(express_1.default.static("./public"));
// リクエストボディを JSON として解釈して request.body に格納する
app.use(express_1.default.json());
app.post("/chat", (request, response) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const promptText =
      (_a = request === null || request === void 0 ? void 0 : request.body) ===
        null || _a === void 0
        ? void 0
        : _a.promptText;
    // クライアントから送られてきたデータは無条件で信用しない
    if (typeof promptText !== "string") {
      response.sendStatus(400);
      return;
    }
    const aiMessageChunk = yield chatModel.invoke(promptText);
    response.json({ content: aiMessageChunk.content });
  }),
);
// 使用するホスティングサービス (Render など) によってはリクエストを受け付けるポートが指定されている場合がある。
// たいていの場合は PORT という名前の環境変数を通して参照できる。
app.listen(process.env.PORT || 3000);
