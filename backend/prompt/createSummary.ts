import OpenAI from "openai";
const openai = new OpenAI();

export default async function createSummary(passage: string): Promise<string> {
  try {
    const content = `以下の文章を簡潔に一文で要約してください。「この文章は」などの説明は不要です。
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
