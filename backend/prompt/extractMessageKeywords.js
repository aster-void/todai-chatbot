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
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractMessageKeywords;
var openai_1 = require("openai");
var openai = new openai_1.default();
function extractMessageKeywords(message) {
  return __awaiter(this, void 0, void 0, function () {
    var content, response, keywords, error_1;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
      switch (_e.label) {
        case 0:
          _e.trys.push([0, 2, , 3]);
          content =
            "\u4EE5\u4E0B\u306E\u30E1\u30C3\u30BB\u30FC\u30B8\u304B\u3089\u7279\u306B\u91CD\u8981\u306A\u5358\u8A9E\u3092\u3044\u304F\u3064\u304B\u62BD\u51FA\u3057\u3001\u30AB\u30F3\u30DE\u533A\u5207\u308A\u3067\u8FD4\u3057\u3066\u304F\u3060\u3055\u3044\u3002\n          ######\n          ".concat(
              message,
            );
          console.log(message);
          return [
            4 /*yield*/,
            openai.chat.completions.create({
              model: "gpt-4o",
              messages: [
                {
                  role: "system",
                  content:
                    "あなたは与えられたメッセージをわかりやすくする人です。",
                },
                {
                  role: "user",
                  content: content,
                },
              ],
              max_tokens: 50,
              temperature: 0.5,
            }),
          ];
        case 1:
          response = _e.sent();
          keywords =
            (_d =
              (_c =
                (_b =
                  (_a =
                    response === null || response === void 0
                      ? void 0
                      : response.choices) === null || _a === void 0
                    ? void 0
                    : _a[0]) === null || _b === void 0
                  ? void 0
                  : _b.message) === null || _c === void 0
                ? void 0
                : _c.content) === null || _d === void 0
              ? void 0
              : _d
                  .split(",")
                  .map(function (keyword) {
                    return keyword.trim();
                  })
                  .filter(function (keyword) {
                    return keyword.length > 0;
                  });
          if (!keywords || keywords.length === 0) {
            throw new Error("Keywords array is empty or undefined");
          }
          return [2 /*return*/, keywords];
        case 2:
          error_1 = _e.sent();
          console.error("Error fetching keywords:", error_1);
          return [2 /*return*/, []];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
