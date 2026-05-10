import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { insertContactInquiry, validateContactPayload } from "./lib/contact-inquiries.js";
import { getGithubStatsWithCache } from "./lib/github-stats.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "dist");

loadDotEnv(path.join(__dirname, ".env"));

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.json({ limit: "32kb" }));

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

app.post("/api/contact", async (req, res) => {
  try {
    const { errors, data } = validateContactPayload(req.body);

    if (data.website) {
      return res.status(200).json({
        ok: true,
        message: "문의가 접수되었습니다.",
      });
    }

    if (errors.length > 0) {
      return res.status(400).json({
        ok: false,
        message: errors[0],
      });
    }

    await insertContactInquiry(data, {
      source: "portfolio-local",
      userAgent: req.headers["user-agent"],
      referrer: req.headers.referer || req.headers.referrer || null,
    });

    return res.status(201).json({
      ok: true,
      message: "문의가 저장되었습니다. 확인 후 답변드리겠습니다.",
    });
  } catch (error) {
    console.error("Failed to store contact inquiry", error);
    return res.status(500).json({
      ok: false,
      message: error.message || "문의 저장 중 문제가 발생했습니다.",
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
