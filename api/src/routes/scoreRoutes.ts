import express, { Request, Response } from "express";
import ScoreModel, { IScore } from "../models/Score";

const router = express.Router();

// Create a new score
router.post("/scores", async (req: Request, res: Response) => {
  try {
    const { name, level, additionalData } = req.body;
    const score: IScore = new ScoreModel({
      name,
      level,
      additionalData,
    });
    const savedScore = await score.save();
    res.status(201).json(savedScore);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Get all scores
router.get("/scores", async (req: Request, res: Response) => {
  try {
    const scores: IScore[] = await ScoreModel.find();
    res.json(scores);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
