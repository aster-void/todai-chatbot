"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var extractMessageKeywords_1 = require("../prompt/extractMessageKeywords");
var extractPageKeyword_1 = require("../prompt/extractPageKeyword");
var groupPages_1 = require("../prompt/groupPages");
var createSummary_1 = require("../prompt/createSummary");
//テストのやり方
// 1. npx tsc test.ts
// 2. node --env-file=../.env test.js
//動作確認したい
var exampleText = "\u96FB\u96FB\u3068\u96FB\u60C5\u306F\u4F55\u304C\u9055\u3046\u306E\uFF1F";
(0, extractMessageKeywords_1.default)(exampleText)
    .then(function (keywords) {
    console.log("Extracted Keywords:", keywords);
})
    .catch(function (error) {
    console.error("Error:", error);
});
//動作確認したい
var examplePrompt = "\n<h1>\uFF08\u518D\u63B2\uFF09\u3010\u9032\u5B66\u9078\u629E\u3011\u5B66\u90E8\u30FB\u5B66\u79D1\u5225 \u9762\u63A5\u30FB\u5FD7\u671B\u7406\u7531\u66F8\u7B49\u306B\u3064\u3044\u3066\uFF088/27\u85AC\u5B66\u90E8\u66F4\u65B0\u30017/9\u533B\u5B66\u90E8\u4FEE\u6B63\u30016/10\u5DE5\u5B66\u90E8\u66F4\u65B0\u30015/16\u521D\u63B2\uFF09</h1><p>2025\u5E74\u5EA6\u9032\u5B66\u9078\u629E\uFF082024\u5E74\u5EA6\u5B9F\u65BD\uFF09\u306B\u304A\u3044\u3066\u9762\u63A5\u30FB\u5FD7\u671B\u7406\u7531\u66F8\u3092\u8AB2\u3059\u5B66\u90E8\u30FB\u5B66\u79D1\u7B49\u306B\u3064\u3044\u3066\u306F\u3001\u300E2025\u5E74\u5EA6\u9032\u5B66\u9078\u629E\u306E\u624B\u5F15\u304D\u300F\u306E\u300C\u5B66\u90E8\u30FB\u5B66\u79D1\u5225 \u9762\u63A5\u30FB\u5FD7\u671B\u7406\u7531\u66F8\u4E00\u89A7\u300D\u306E\u30DA\u30FC\u30B8\u306B\u8A18\u8F09\u304C\u3042\u308A\u307E\u3059\u306E\u3067\u5FC5\u305A\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002\n\n\u4E0A\u8A18\u300C\u5B66\u90E8\u30FB\u5B66\u79D1\u5225 \u9762\u63A5\u30FB\u5FD7\u671B\u7406\u7531\u66F8\u4E00\u89A7\u300D\u306E\u30DA\u30FC\u30B8\u306B\u52A0\u3048\u3066\u5404\u5B66\u90E8\u304B\u3089\u306E\u901A\u77E5\u304C\u3042\u308B\u5834\u5408\u306F\u3001\u4EE5\u4E0B\u306B\u63B2\u8F09\u3057\u3066\u3044\u304D\u307E\u3059\u3002\u9762\u63A5\u30FB\u5FD7\u671B\u7406\u7531\u66F8\u3092\u8AB2\u3059\u5B66\u90E8\u30FB\u5B66\u79D1\u7B49\u3078\u306E\u9032\u5B66\u3092\u5E0C\u671B\u3059\u308B\u65B9\u306F\u4F75\u305B\u3066\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002\n\uFF08\u5B66\u90E8\u6BCE\u306B\u901A\u77E5\u304C\u3042\u308A\u6B21\u7B2C\u3001\u968F\u6642\u66F4\u65B0\u4E88\u5B9A\u3002\uFF09\n\u203B\u9032\u5B66\u3092\u5E0C\u671B\u3059\u308B\u5B66\u90E8\u304B\u3089\u306E\u9023\u7D61\u4E8B\u9805\u3092\u3088\u304F\u78BA\u8A8D\u3057\u3001\u305D\u306E\u6307\u793A\u306B\u5F93\u3063\u3066\u304F\u3060\u3055\u3044\u3002\n\u307E\u305F\u3001\u4E0D\u660E\u306A\u70B9\u304C\u3042\u308B\u5834\u5408\u306F\u3001\u5F53\u8A72\u5B66\u90E8\u306E\u6559\u52D9\u62C5\u5F53\u3078\u554F\u3044\u5408\u308F\u305B\u3066\u304F\u3060\u3055\u3044\u3002</p>";
(0, extractPageKeyword_1.default)(examplePrompt)
    .then(function (keywords) {
    console.log("Extracted Keywords:", keywords);
})
    .catch(function (error) {
    console.error("Error:", error);
});
function testGroupPages() {
    return __awaiter(this, void 0, void 0, function () {
        var pages, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pages = [
                        "（再掲）【進学選択】学部・学科別 面接・志望理由書等について（8/27薬学部更新、7/9医学部修正、6/10工学部更新、5/16初掲）",
                        "【2024A】基礎実験Ⅰ・Ⅱ、基礎化学実験・基礎物理学実験 初回授業について（8/27化学 掲載）",
                        "【進学選択】【重要】2025年度進学選択 第一段階進学内定者発表及び第二段階進学志望登録変更等について",
                        "休学・退学手続き締切の例外措置について",
                        "成績表の閲覧停止期間（1年生）",
                    ];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, groupPages_1.default)(pages)];
                case 2:
                    result = _a.sent();
                    console.log("Result:", JSON.stringify(result, null, 2));
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error during test:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
testGroupPages();
var passage = "これはテストのための文章です。OpenAI APIを使用して、この文章を一文で要約してください。";
(0, createSummary_1.default)(passage).then(function (summary) { return console.log(summary); });
