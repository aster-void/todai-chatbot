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

    //keywordsの少なくとも一つがpage.wordsの少なくとも一つと一致するpageを持ってくる
    //関連性でソートするためには修正する必要がある
    const selectedPages: Page[] = pages.filter((page: Page) =>
      keywords.some((keyword: string) =>
        page.words.some((word: string) => word.includes(keyword)),
      ),
    );

    return selectedPages.map((selectedPage: Page) => selectedPage.url);
  } catch (error) {
    console.error("Error selecting pages:", error);
    return [];
  }
}
