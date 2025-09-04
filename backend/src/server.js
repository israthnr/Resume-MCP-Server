// server.js
import express from "express";
import cors from "cors";
import { ResumeParser } from "./resume-parser.js";
import { EmailService } from "./email-service.js";
import { body, validationResult } from "express-validator";

export function createExpressServer(resumeData) {
  const app = express();
  const resumeParser = new ResumeParser(resumeData);
  const emailService = new EmailService();

  app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({ message: "✅ Server running!" });
  });

  app.get("/resume", (req, res) => res.json(resumeData));

  app.post("/chat", (req, res) => {
    try {
      const { question } = req.body;
      if (!question) return res.status(400).json({ error: "Question required" });
      const answer = resumeParser.answerQuestion(question);
      res.json({ question, answer });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Chat failed" });
    }
  });

  app.post("/send-email", [
    body("recipient").isEmail(),
    body("subject").notEmpty(),
    body("body").notEmpty()
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const { recipient, subject, body: messageBody } = req.body;
      const emailService = new EmailService();
      const result = await emailService.sendEmail(recipient, subject, messageBody);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Email failed" });
    }
  });

  return app;
}
