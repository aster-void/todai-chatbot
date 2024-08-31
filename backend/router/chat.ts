import express from "express";
import extractMessageKeywords from "../prompt/extractMessageKeywords";
import fetchAndSelectPages from "../domain/fetchAndSelectPages";
const router = express.Router();

router.post("/", async (req, res) => {
  const message: string = req.body.message;
  const keywords = await extractMessageKeywords(message);
  console.log(keywords);
  const urls = await fetchAndSelectPages(keywords);
  const url = urls[0];
  console.log("url:" + url);
  res.json(url);
});

export default router;
