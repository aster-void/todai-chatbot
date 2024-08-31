import { PrismaClient } from "@prisma/client";
import { transform } from "../transformer/transform";
import fs from "node:fs";

const prisma = new PrismaClient();

async function main() {
  const data = fs.readFileSync("../data/scraped.json", "utf-8");
  const input = JSON.parse(data);

  const output = await transform(input);

  await Promise.all(
    output.map(async (page) => {
      prisma.page.create({ data: page });
    }),
  );
}
main();
