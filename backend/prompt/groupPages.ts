import OpenAI from "openai";

const openai = new OpenAI();

type PageGroup = {
  summary: string;
  pages: string[];
};

export default async function groupPages(
  pages: string[],
): Promise<PageGroup[]> {
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
      model: "gpt-3.5-turbo",
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
