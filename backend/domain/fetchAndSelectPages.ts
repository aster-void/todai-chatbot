import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Page = {
  url: string;
  words: string[];
};

// 単語のまとまりについて関連性が高いページの配列を返す
export default async function fetchAndSelectPages(
  keywords: string[],
): Promise<string[]> {
  try {
    const pages = await prisma.page.findMany({
      select: {
        url: true,
        words: true,
      },
    });

    //マッチしたキーワードの数の降順でソート
    const selectedPages: Page[] = pages
      .map((page: Page) => {
        const matchingKeywords = keywords.filter((keyword: string) =>
          page.words.some(
            (word: string) => word.includes(keyword) || keyword.includes(word),
          ),
        );
        return {
          ...page,
          score: matchingKeywords.length,
        };
      })
      .filter((page) => page.score > 0)
      .sort((a, b) => b.score - a.score);

    return selectedPages.map((selectedPage: Page) => selectedPage.url);
  } catch (error) {
    console.error("Error selecting pages:", error);
    return [];
  }
}
