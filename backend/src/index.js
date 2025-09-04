// import dotenv from 'dotenv';
// dotenv.config();

// import { createExpressServer } from './server.js';
// import { readFileSync } from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Helpers to resolve relative path
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Load resume data from JSON file
// const resumeData = JSON.parse(
//   readFileSync(path.join(__dirname, '../data/resume.json'), 'utf-8')
// );

// // Create Express HTTP server
// const app = createExpressServer(resumeData);
// const PORT = process.env.PORT || 3001;

// app.listen(PORT, () => {
//   console.log(`🚀 HTTP Server running on port ${PORT}`);
//   console.log(`📝 Resume endpoint: http://localhost:${PORT}/resume`);
//   console.log(`💬 Chat endpoint: POST http://localhost:${PORT}/chat`);
//   console.log(`📧 Email endpoint: POST http://localhost:${PORT}/send-email`);
// });


import serverless from "serverless-http";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createExpressServer } from "../../server.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resumeData = JSON.parse(
  readFileSync(path.join(__dirname, '../../../data/resume.json'), "utf-8")
);

const app = createExpressServer(resumeData);

// Wrap Express with serverless handler
export const handler = serverless(app);
