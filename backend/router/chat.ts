import express from "express";
import extractMessageKeywords from "../prompt/extractMessageKeywords";
import fetchAndSelectPages from "../domain/fetchAndSelectPages";
const router = express.Router();

router.post("/", async (req, res) => {
  const message: string = req.body.message;
  const keywords = await extractMessageKeywords(message);
  if (keywords.length === 0) return res.status(500).send();
  const pages = await fetchAndSelectPages(keywords); //urlとsummaryをプロパティに持つオブジェクトの配列が返ってくる
  res.json(pages.slice(0, 3));
});

export default router;
