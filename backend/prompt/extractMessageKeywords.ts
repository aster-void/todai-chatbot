import OpenAI from "openai";
const openai = new OpenAI();

export default async function extractMessageKeywords(
  message: string,
): Promise<string[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `
            ユーザーのメッセージから重要な単語を複数抽出し、カンマ区切りで返してください。
            例入力: プログラミングサークルと運動部について教えて。
            例出力: プログラミング,サークル,運動部
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 50,
      temperature: 0.5,
    });

    const keywords = response?.choices?.[0]?.message?.content
      ?.split(",")
      .map((keyword) => keyword.trim())
      .filter((keyword) => keyword.length > 0) // 空の要素を除外
      .filter((keyword) => keyword !== "教えて"); // workaround
    if (!keywords || keywords.length === 0) {
      throw new Error("Keywords array is empty or undefined");
    }
    console.log(keywords);
    return keywords;
  } catch (error) {
    console.error("Error extracting keywords:", error);
    return [];
  }
}
