import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import OpenAI from "openai";
const openai = new OpenAI();

//単語のまとまりについて関連性が高いページの配列を返す
export default async function selectPages(keywords: string[]): Promise<string[]>{
    const pages = await prisma.pageWithRelatedWords.findMany();
}

async function getOpenAiScore(keywords: string[], pageWords: string[]): number{
    model: "get-4",
}