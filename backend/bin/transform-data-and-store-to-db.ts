import { PrismaClient } from "@prisma/client";
import { transform } from "../transformer/transform";
import fs from "node:fs";

const prisma = new PrismaClient();

async function main(path: string) {
  const data = fs.readFileSync(path, "utf-8");
  const input = JSON.parse(data);

  const output = await transform(input);
  await Promise.all(
    output.map(async (page) => {
      await prisma.page.create({
        data: {
          url: page.url,
          title: page.title, //lastupdateはエラーが出てたので一旦除外した
          summary: page.summary,
          words: page.words,
        },
      });
    })
  );
}
main("./data/ut-base/circles.json");
main("./data/utokyo/news.json");
