import extractPageKeywords from "../prompt/extractPageKeyword";
import createSummary from "../prompt/createSummary";
import { pdfParse } from "../prompt/transcriptPdf";

type OutputPage = {
  url: string;
  title: string;
  lastUpdate: Date;
  summary: string;
  words: string[];
};
type InputPage = {
  url: string;
  title: string;
  lastUpdate: Date;
  content: string;
};
type Input = {
  pages: InputPage[];
  pdfs: InputPage[];
};
type Output = OutputPage[];

export async function transform(json: Input): Promise<Output> {
  const pagesFromPDF = await Promise.all(
    (json.pdfs || []).map(async (pdf) => {
      const page = {
        ...pdf,
        content: await pdfParse(pdf.content),
      };
      return page;
    }),
  );
  const pages = json.pages.concat(pagesFromPDF).map(async (page) => {
    const ret: OutputPage = {
      ...page,
      words: ["todo"], // await extractPageKeywords(page.content),
      summary:"todo",// await createSummary(page.content),
    };
    return ret;
  });

  return await Promise.all(pages);
}
