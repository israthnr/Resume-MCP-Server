// api/index.js
import serverless from "serverless-http";
import { createExpressServer } from "../src/server.js";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resumeData = JSON.parse(
  readFileSync(path.join(__dirname, '../data/resume.json'), "utf-8")
);

const app = createExpressServer(resumeData);

export const handler = serverless(app);
