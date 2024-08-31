import { OpenAI } from "openai";
import pdf from "pdf-parse";
import fs from "fs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function pdfParse() {
  const pathsToPdfFile = fs.readdirSync("path to dir...");
  const pdfStringDatas: string[] = await Promise.all(
    pathsToPdfFile.map(async (path) => {
      const dataBuffer = fs.readFileSync(path);
      const pdfStringData = await pdf(dataBuffer);
      return pdfStringData.text;
    })
  );

  const pdfSummaries = await Promise.all(
    pdfStringDatas.map(async (pdfString) => {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            { role: "system", content: "あなたは記事のレビュワーです。" },
            {
              role: "user",
              content: `このテキストの要約を教えて。
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
