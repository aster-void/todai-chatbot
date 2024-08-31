import OpenAI from "openai";
const openai = new OpenAI();

export default async function extractPageKeywords(
  text: string,
): Promise<string[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "あなたは記事のレビュアーです。" },
        {
          role: "user",
          content: `以下の記事から学生にとって特に重要な単語をいくつか抽出し、カンマ区切りで返してください。
          ######
          ${text}`,
        },
      ],
      max_tokens: 50,
      temperature: 0.5,
    });

    const keywords = response?.choices?.[0]?.message?.content
      ?.split(",")
      .map((keyword) => keyword.trim())
      .filter((keyword) => keyword.length > 0); // 空の要素を除外
    if (!keywords || keywords.length === 0) {
      throw new Error("Keywords array is empty or undefined");
    }
    return keywords;
  } catch (error) {
    console.error("Error fetching keywords:", error);
    return [];
  }
}
