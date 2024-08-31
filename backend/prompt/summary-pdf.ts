import { OpenAI } from "openai";
import pdf from "pdf-parse";
import fs from "fs";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

function base64decode(data: string) {
  return new Uint8Array([...atob(data)].map((s) => s.charCodeAt(0)));
}

async function pdfParse() {
  const pathToPdfDir = "./pdf-dir";
  const PdfFiles = fs.readdirSync(pathToPdfDir);
  const pdfStringDatas: string[] = await Promise.all(
    PdfFiles.map(async (file) => {
      const pathToPdfFile = path.join(pathToPdfDir, file);
      // base64 エンコードされた文字列をバイナリデータにでコード
      const base64 = fs.readFileSync(pathToPdfFile, "utf-8");
      // const cleanBase64 = base64.replace(/\s/g, "");
      const buffer = Buffer.from(base64, "base64");
      // fs.writeFileSync("output.pdf", buffer);
      const pdfStringData = await pdf(Buffer.from(base64, "base64"));
      return pdfStringData.text;
    })
  );
  return pdfStringDatas;
}

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

async function main() {
  const parsed = await pdfParse();
  // console.log(parsed);
  console.log(await summarize(parsed));
}

main();
