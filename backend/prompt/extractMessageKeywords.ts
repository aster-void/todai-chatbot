import OpenAI from "openai";
const openai = new OpenAI();

export default async function extractMessageKeywords(
  message: string,
): Promise<string[]> {
  try {
    const content = `以下のメッセージから特に重要な単語をいくつか抽出し、カンマ区切りで返してください。
          ######
          ${message}`;
    console.log(message);
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "あなたは与えられたメッセージをわかりやすくする人です。",
        },
        {
          role: "user",
          content: content,
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
