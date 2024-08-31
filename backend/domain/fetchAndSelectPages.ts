import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Page = {
  url: string;
  summary: string;
  words: string[];
};

type ReturnedPages = {
  url: string;
  summary: string;
}

// 単語のまとまりについて関連性が高いページの配列を返す
export default async function fetchAndSelectPages(
  keywords: string[],
): Promise<ReturnedPages[]> {
  try {
    const pages = await prisma.page.findMany({
      select: {
        url: true,
        summary: true,
        words: true,
      },
    });

    // マッチしたキーワードの数の降順でソート
    const selectedPages: ReturnedPages[] = pages
      .map((page: Page) => {
        const matchingKeywords = keywords.filter((keyword: string) =>
          page.words.some(
            (word: string) => word.includes(keyword) || keyword.includes(word),
          ),
        );
        const score = matchingKeywords.length;
        return {
          url: page.url,
          summary: page.summary,
          score: score,
        };
      })
      .filter((page) => page.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((selectedPage) => ({
        url: selectedPage.url,
        summary: selectedPage.summary,
      }));

    return selectedPages;
  } catch (error) {
    console.error("Error selecting pages:", error);
    return [];
  }
}