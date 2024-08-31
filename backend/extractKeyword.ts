import OpenAI from "openai";
const openai = new OpenAI();

export default async function extractKeywords(text: string): Promise<string[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "あなたは記事のレビュアーです。" },
        {
          role: "user",
          content: `以下の記事から学生にとって特に重要な単語をいくつか抽出し、カンマ区切りで返してください。${text}`,
        },
      ],
      max_tokens: 50,
      temperature: 0.5,
    });

    const keywords = response?.choices?.[0]?.message?.content
      ?.split(",")
      .map((keyword) => keyword.trim())
      .filter((keyword) => keyword.length > 0); // 空の要素を除外

    return keywords || [];
  } catch (error) {
    console.error("Error fetching keywords:", error);
    return [];
  }
}

//動作確認したい
const exampleText = `
<h1>（再掲）【進学選択】学部・学科別 面接・志望理由書等について（8/27薬学部更新、7/9医学部修正、6/10工学部更新、5/16初掲）</h1><p>2025年度進学選択（2024年度実施）において面接・志望理由書を課す学部・学科等については、『2025年度進学選択の手引き』の「学部・学科別 面接・志望理由書一覧」のページに記載がありますので必ず確認してください。

上記「学部・学科別 面接・志望理由書一覧」のページに加えて各学部からの通知がある場合は、以下に掲載していきます。面接・志望理由書を課す学部・学科等への進学を希望する方は併せて確認してください。
（学部毎に通知があり次第、随時更新予定。）
※進学を希望する学部からの連絡事項をよく確認し、その指示に従ってください。
　また、不明な点がある場合は、当該学部の教務担当へ問い合わせてください。</p>`;

extractKeywords(exampleText)
  .then((keywords) => {
    console.log("Extracted Keywords:", keywords);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
