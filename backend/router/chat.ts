import express, { json } from "express";
import extractMessageKeywords from "../prompt/extractMessageKeywords";
export const router = express.Router();

router.post("/", async (req, res) => {
  const message: string = req.body;
  const keywrods = await extractMessageKeywords(message);

  res.send(json);
});

export default router;
