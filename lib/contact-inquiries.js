import { getSupabaseAdmin } from "./supabase-admin.js";

const CONTACT_TABLE = "contact_inquiries";

function sanitizeText(value, maxLength) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, maxLength);
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

export function validateContactPayload(body) {
  const name = sanitizeText(body?.name, 80);
  const email = sanitizeText(body?.email, 120);
  const message = String(body?.message || "").trim().slice(0, 4000);
  const website = sanitizeText(body?.website, 120);

  const errors = [];

  if (!name) errors.push("이름을 입력해 주세요.");
  if (!email || !validateEmail(email)) errors.push("올바른 이메일을 입력해 주세요.");
  if (!message || message.length < 10) errors.push("문의 내용은 10자 이상 입력해 주세요.");

  return {
    errors,
    data: {
      name,
      email,
      message,
      website,
    },
  };
}

export async function insertContactInquiry(data, metadata = {}) {
  const supabase = getSupabaseAdmin();

  const payload = {
    name: data.name,
    email: data.email,
    message: data.message,
    source: metadata.source || "portfolio",
    user_agent: metadata.userAgent || null,
    referrer: metadata.referrer || null,
  };

  const { error } = await supabase.from(CONTACT_TABLE).insert(payload);

  if (error) {
    throw new Error(error.message || "문의 저장에 실패했습니다.");
  }
}

export { CONTACT_TABLE };
