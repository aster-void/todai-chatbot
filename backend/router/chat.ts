import express, { json } from "express";
import extractMessageKeywords from "../prompt/extractMessageKeywords";
import fetchAndSelectPages from "../fetchAndSelectPages";
const router = express.Router();

router.post("/", async (req, res) => {
  const message: string = req.body;
  const keywords = await extractMessageKeywords(message);
  const urls = await fetchAndSelectPages(keywords);
  const url = urls[0]
  res.json(url);
});

export default router;
