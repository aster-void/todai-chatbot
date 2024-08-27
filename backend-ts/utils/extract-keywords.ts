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
          content: `以下の記事から特に関連性の強い単語をいくつか抽出し、カンマ区切りで返してください。${text}`,
        },
      ],
      max_tokens: 50,
      temperature: 0.5,
    });

    const keywords = response?.choices?.[0]?.message?.content
      ?.trim()
      .split(",");

    return keywords || [];
  } catch (error) {
    console.error("Error fetching keywords:", error);
    return [];
  }
}

//動作確認したい
const exampleText = `
<h1>工学的について</h1><p>工学部は素晴らしいところです。</p>`;

extractKeywords(exampleText)
  .then((keywords) => {
    console.log("Extracted Keywords:", keywords);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
