import OpenAI from "openai";
const openai = new OpenAI();

export default async function createSummary(passage: string): Promise<string> {
  try {
    const content = `以下の文章を一文で要約してください。
          ######
          ${passage}`;
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "あなたは文章を読んで要約することを得意としています。",
        },
        {
          role: "user",
          content: content,
        },
      ],
      max_tokens: 50,
      temperature: 0.5,
    });

    const summary = response?.choices?.[0]?.message?.content;
    if (!summary || summary === "") {
      throw new Error("Summary is empty or undefined");
    }
    return summary;
  } catch (error) {
    console.error("Error fetching summary:", error);
    return "";
  }
}