import OpenAI from "openai";

const openai = new OpenAI();

type PageGroup = {
  summary: string;
  pages: string[];
};

export default async function groupPages(pages: string[]): Promise<PageGroup[]> {
  const prompt = `
あなたは記事のレビュアーです。
以下に記事の配列を与えるので、関連するページをグループ化して、各グループの説明を生成してください。
結果は、以下のJSONフォーマットで返してください。

[
  {
    "summary": "グループの説明",
    "pages": ["ページ1", "ページ2", ...]
  },
  ...
]

与えられた記事の配列:
${JSON.stringify(pages, null, 2)}
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const content = response.choices[0].message?.content;

    if (!content) {
      throw new Error("No content in the response from OpenAI.");
    }

    const pageGroups: PageGroup[] = JSON.parse(content);

    return pageGroups;
  } catch (error) {
    console.error("Error while grouping pages:", error);
    throw error; 
  }
}

async function testGroupPages() {
    const pages = [
        "（再掲）【進学選択】学部・学科別 面接・志望理由書等について（8/27薬学部更新、7/9医学部修正、6/10工学部更新、5/16初掲）",
        "【2024A】基礎実験Ⅰ・Ⅱ、基礎化学実験・基礎物理学実験 初回授業について（8/27化学 掲載）",
        "【進学選択】【重要】2025年度進学選択 第一段階進学内定者発表及び第二段階進学志望登録変更等について",
        "休学・退学手続き締切の例外措置について",
        "成績表の閲覧停止期間（1年生）"
    ];

    try {
        const result = await groupPages(pages);
        console.log("Result:", JSON.stringify(result, null, 2));
    } catch (error) {
        console.error("Error during test:", error);
    }
}

testGroupPages();