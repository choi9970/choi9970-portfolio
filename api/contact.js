import { insertContactInquiry, validateContactPayload } from "../lib/contact-inquiries.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      ok: false,
      message: "허용되지 않은 메서드입니다.",
    });
  }

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
      source: "portfolio-vercel",
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
}
