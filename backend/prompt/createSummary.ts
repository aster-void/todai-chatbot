import OpenAI from "openai";
const openai = new OpenAI();

export default async function createSummary(passage: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `
            あなたは文章を読んで要約することを得意としています。
            以下のページを簡潔に一文で要約してください。
            「この文章は」などの説明は不要です。
            要約は日本語で行ってください。
            `,
        },
        {
          role: "user",
          content: passage,
        },
      ],
      max_tokens: 200,
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
