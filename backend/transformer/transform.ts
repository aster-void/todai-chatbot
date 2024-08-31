import { PrismaClient } from "@prisma/client";

import extractPageKeywords from "../prompt/extractPageKeyword";

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
}
type Input = {
  pages: InputPage[];
  pdfs: InputPage[];
};
type Output = OutputPage[];

export async function transform(json: Input): Promise<Output> {
  const pagesFromPDF = await Promise.all(
    json.pdfs.map(async (pdf) => {
      const page = {
        ...pdf,
        content: "todo: stringify pdf content",
      };
      return page;
    }));
  const pages = json.pages.concat(pagesFromPDF).map(async (page) => {
    const keywords = await extractPageKeywords(page.content);
    const ret: OutputPage = {
      ...page,
      words: keywords,
      summary: "todo: summary",
    };
    return ret;
  });

  return await Promise.all(pages);
}
