import { createClient } from "@supabase/supabase-js";

let cachedSupabaseAdmin = null;

function normalizeEnvValue(value) {
  const trimmed = String(value || "").trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
}

function normalizeSupabaseUrl(value) {
  const normalized = normalizeEnvValue(value).replace(/\/+$/, "");

  if (!normalized) {
    return normalized;
  }

  return normalized.replace(/\/rest\/v1$/i, "");
}

export function getSupabaseAdmin() {
  if (cachedSupabaseAdmin) {
    return cachedSupabaseAdmin;
  }

  const url = normalizeSupabaseUrl(process.env.SUPABASE_URL);
  const serviceKey = normalizeEnvValue(
    process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  if (!url || !serviceKey) {
    throw new Error("Supabase 환경 변수가 설정되지 않았습니다.");
  }

  if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url)) {
    throw new Error("SUPABASE_URL 형식이 올바르지 않습니다. 예: https://your-project.supabase.co");
  }

  cachedSupabaseAdmin = createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return cachedSupabaseAdmin;
}
