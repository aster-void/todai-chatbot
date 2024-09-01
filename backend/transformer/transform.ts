import extractPageKeywords from "../prompt/extractPageKeyword";
import createSummary from "../prompt/createSummary";
import { pdfParse } from "../prompt/transcriptPdf";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

// Function to introduce a delay
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

  const allPages = json.pages.concat(pagesFromPDF);
  const outputPages: Output = [];
  
  for (let i = 0; i < allPages.length; i++) {
    const page = allPages[i];
    if(page.content.length > 5000){
      console.error(page.content.length);
    }
    // Process each page
    const ret: OutputPage = {
      ...page,
      words: ["todo"], // await extractPageKeywords(page.content),
      summary:"todo",// await createSummary(page.content),
    };
    await prisma.page.create({
      data: {
        url: ret.url,
        title: ret.title, //lastupdateはエラーが出てたので一旦除外した
        summary: ret.summary,
        words: ret.words,
      },
    });
    
    // outputPages.push(ret);

    // Pause for 5 seconds after every 10 iterations
    if ((i + 1) % 10 === 0) {
      await delay(1000);
    }
  }

  return outputPages;
}
