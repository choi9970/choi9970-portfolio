import { getGithubStatsWithCache } from "../../lib/github-stats.js";

export default async function handler(req, res) {
  if (req.method && req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({
      ok: false,
      message: "허용되지 않은 메서드입니다.",
    });
  }

  try {
    const stats = await getGithubStatsWithCache();
    return res.status(200).json(stats);
  } catch (error) {
    console.error("Failed to fetch GitHub stats", error);
    return res.status(500).json({
      ok: false,
      message: error.message || "GitHub 통계를 불러오지 못했습니다.",
    });
  }
}
