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
exports.default = groupPages;
var openai_1 = require("openai");
var openai = new openai_1.default();
function groupPages(pages) {
    return __awaiter(this, void 0, void 0, function () {
        var prompt, response, content, pageGroups, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    prompt = "\n\u3042\u306A\u305F\u306F\u8A18\u4E8B\u306E\u30EC\u30D3\u30E5\u30A2\u30FC\u3067\u3059\u3002\n\u4EE5\u4E0B\u306B\u8A18\u4E8B\u306E\u914D\u5217\u3092\u4E0E\u3048\u308B\u306E\u3067\u3001\u95A2\u9023\u3059\u308B\u30DA\u30FC\u30B8\u3092\u30B0\u30EB\u30FC\u30D7\u5316\u3057\u3066\u3001\u5404\u30B0\u30EB\u30FC\u30D7\u306E\u8AAC\u660E\u3092\u751F\u6210\u3057\u3066\u304F\u3060\u3055\u3044\u3002\n\u7D50\u679C\u306F\u3001\u4EE5\u4E0B\u306EJSON\u30D5\u30A9\u30FC\u30DE\u30C3\u30C8\u3067\u8FD4\u3057\u3066\u304F\u3060\u3055\u3044\u3002\n\n[\n  {\n    \"summary\": \"\u30B0\u30EB\u30FC\u30D7\u306E\u8AAC\u660E\",\n    \"pages\": [\"\u30DA\u30FC\u30B81\", \"\u30DA\u30FC\u30B82\", ...]\n  },\n  ...\n]\n\n\u4E0E\u3048\u3089\u308C\u305F\u8A18\u4E8B\u306E\u914D\u5217:\n".concat(JSON.stringify(pages, null, 2), "\n");
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, openai.chat.completions.create({
                            model: "gpt-4",
                            messages: [{ role: "user", content: prompt }],
                            temperature: 0.7,
                        })];
                case 2:
                    response = _b.sent();
                    content = (_a = response.choices[0].message) === null || _a === void 0 ? void 0 : _a.content;
                    if (!content) {
                        throw new Error("No content in the response from OpenAI.");
                    }
                    pageGroups = JSON.parse(content);
                    return [2 /*return*/, pageGroups];
                case 3:
                    error_1 = _b.sent();
                    console.error("Error while grouping pages:", error_1);
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
