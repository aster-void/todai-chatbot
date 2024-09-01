// import { OpenAI } from "openai";
import pdf from "pdf-parse";

// const openai = new OpenAI({
//   apiKey: process.env.OPEN_API_KEY,
// });

export async function pdfParse(base64: string) {
  const buffer = Buffer.from(base64, "base64");
  const pdfStringData = await pdf(buffer);
  return pdfStringData.text;
}

/*
async function summarize(data: string[]) {
  const pdfSummaries = await Promise.all(
    data.map(async (pdfString) => {
      try {
        console.log(pdfString);
        const response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            { role: "system", content: "あなたは記事のレビュワーです。" },
            {
              role: "user",
              content: `このテキストを要約して。
                  ######
                  ${pdfString}`,
            },
          ],
        });
        if (!response.choices[0].message.content) {
          throw new Error("returned summary is null.");
        }
        return response?.choices[0].message.content;
      } catch (error) {
        console.log("Error has ocurred:", error);
        return "";
      }
    })
  );
  return pdfSummaries;
}
*/
