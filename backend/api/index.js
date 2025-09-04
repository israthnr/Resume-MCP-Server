import serverless from "serverless-http";
import { createExpressServer } from "../src/server.js";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load resume data
const resumeData = JSON.parse(
  readFileSync(path.join(__dirname, "../../data/resume.json"), "utf-8")
);

const app = createExpressServer(resumeData);

// **Wrap Express app as a serverless handler**
export const handler = serverless(app);
