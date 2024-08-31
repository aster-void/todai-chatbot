import extractMessageKeywords from "../prompt/extractMessageKeywords";
import extractPageKeywords from "../prompt/extractPageKeyword";
import groupPages from "../prompt/groupPages";

//テストのやり方
// 1. npx tsc test.ts 
// 2. node --env-file=../.env test.js 

//動作確認したい
const exampleText = `電電と電情は何が違うの？`;

extractMessageKeywords(exampleText)
  .then((keywords) => {
    console.log("Extracted Keywords:", keywords);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

//動作確認したい
const examplePrompt = `
<h1>（再掲）【進学選択】学部・学科別 面接・志望理由書等について（8/27薬学部更新、7/9医学部修正、6/10工学部更新、5/16初掲）</h1><p>2025年度進学選択（2024年度実施）において面接・志望理由書を課す学部・学科等については、『2025年度進学選択の手引き』の「学部・学科別 面接・志望理由書一覧」のページに記載がありますので必ず確認してください。

上記「学部・学科別 面接・志望理由書一覧」のページに加えて各学部からの通知がある場合は、以下に掲載していきます。面接・志望理由書を課す学部・学科等への進学を希望する方は併せて確認してください。
（学部毎に通知があり次第、随時更新予定。）
※進学を希望する学部からの連絡事項をよく確認し、その指示に従ってください。
また、不明な点がある場合は、当該学部の教務担当へ問い合わせてください。</p>`;

extractPageKeywords(examplePrompt)
  .then((keywords) => {
    console.log("Extracted Keywords:", keywords);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

async function testGroupPages() {
  const pages = [
    "（再掲）【進学選択】学部・学科別 面接・志望理由書等について（8/27薬学部更新、7/9医学部修正、6/10工学部更新、5/16初掲）",
    "【2024A】基礎実験Ⅰ・Ⅱ、基礎化学実験・基礎物理学実験 初回授業について（8/27化学 掲載）",
    "【進学選択】【重要】2025年度進学選択 第一段階進学内定者発表及び第二段階進学志望登録変更等について",
    "休学・退学手続き締切の例外措置について",
    "成績表の閲覧停止期間（1年生）",
  ];

  try {
    const result = await groupPages(pages);
    console.log("Result:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Error during test:", error);
  }
}

testGroupPages();
