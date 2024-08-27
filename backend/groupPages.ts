import OpenAI from "openai";
const openai = new OpenAI();

type PageGroup = {
    summary: string,
    pages: string[],
};

export default async function groupPages(pages: string[]): Promise<PageGroup[]> {
    const res = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "あなたは記事のレビュアーです。" },
            { role: "user", content: `以下に記事の配列を与えるので、関連するページをグループ化して、各グループの説明を生成してください。${JSON.stringify(pages)}` }
        ],
        //response_format
        }
    )};

    const pageGroups: PageGroup[] = res.choices.map((choice) => {
        const content = choice.message?.content;
        if (content) {
            try {
                const group = JSON.parse(content);
                return {
                    summary: group.summary,
                    pages: group.pages,
                };
            } catch (error) {
                console.error("Error parsing JSON:", error);
                return {
                    summary: "",
                    pages: []
                };
            }
        } else {
            return {
                summary: "",
                pages: []
            };
        }
    });

    return pageGroups;
}
