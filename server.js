import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getGithubStatsWithCache } from "./lib/github-stats.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "dist");

loadDotEnv(path.join(__dirname, ".env"));

const app = express();
const port = Number(process.env.PORT || 3000);

app.get("/api/health", (req, res) => {
  res.json({ ok: true, date: new Date().toISOString() });
});

app.get("/api/github/stats", async (req, res) => {
  try {
    const stats = await getGithubStatsWithCache();
    res.json(stats);
  } catch (error) {
    console.error("Failed to fetch GitHub stats", error);
    res.status(500).json({
      ok: false,
      message: error.message || "GitHub 통계를 불러오지 못했습니다.",
    });
  }
});

app.use(express.static(distPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Portfolio server running on http://localhost:${port}`);
});

function loadDotEnv(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const equalIndex = trimmed.indexOf("=");

    if (equalIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, equalIndex).trim();
    let value = trimmed.slice(equalIndex + 1).trim();

    if (!key || process.env[key] !== undefined) {
      continue;
    }

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}
