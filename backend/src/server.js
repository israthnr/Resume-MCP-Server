import express from "express";
import cors from "cors";
import { ResumeParser } from "./resume-parser.js";
import { EmailService } from "./email-service.js";
import { body, validationResult } from "express-validator";

export function createExpressServer(resumeData) {
  const app = express();
  const resumeParser = new ResumeParser(resumeData);
  const emailService = new EmailService();

  // Middleware
  app.use(
    cors({
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
    })
  );
  app.use(express.json());

  // Health/info route
  app.get("/", (req, res) => {
    res.json({
      message: "✅ MCP Resume Email Server is running!",
      endpoints: {
        "GET /": "This information",
        "GET /resume": "Get full resume data",
        "POST /chat": "Ask questions about resume",
        "POST /send-email": "Send email notifications",
      },
    });
  });

  // Resume data
  app.get("/resume", (req, res) => {
    res.json(resumeData);
  });

  // Chat about resume
  app.post("/chat", (req, res) => {
    try {
      const { question } = req.body;
      if (!question) {
        return res
          .status(400)
          .json({ success: false, error: "Question is required" });
      }

      const answer = resumeParser.answerQuestion(question);

      console.log(`💬 Q: ${question}`);
      console.log(`🤖 A: ${answer}`);

      res.json({ success: true, question, answer });
    } catch (error) {
      console.error("❌ Chat error:", error);
      res
        .status(500)
        .json({ success: false, error: "Failed to process question" });
    }
  });

  // Send email
  app.post(
    "/send-email",
    [
      body("recipient").isEmail().withMessage("Valid recipient email is required"),
      body("subject").notEmpty().withMessage("Subject is required"),
      body("body").notEmpty().withMessage("Body is required"),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ success: false, errors: errors.array() });
      }

      try {
        const { recipient, subject, body: messageBody } = req.body;
        const result = await emailService.sendEmail(
          recipient,
          subject,
          messageBody
        );
        res.json(result);
      } catch (error) {
        console.error("❌ Email error:", error);
        res
          .status(500)
          .json({ success: false, error: "Failed to send email" });
      }
    }
  );

  return app;
}
