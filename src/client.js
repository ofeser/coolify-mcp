const BASE_URL = process.env.COOLIFY_API_URL;
const TOKEN = process.env.COOLIFY_API_TOKEN;

if (!BASE_URL) {
  console.error("COOLIFY_API_URL environment variable is required");
  process.exit(1);
}
if (!TOKEN) {
  console.error("COOLIFY_API_TOKEN environment variable is required");
  process.exit(1);
}

export async function coolifyFetch(path, options = {}) {
  const { method = "GET", body, params } = options;

  const url = new URL(`/api/v1${path}`, BASE_URL);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const headers = {
    Authorization: `Bearer ${TOKEN}`,
    Accept: "application/json",
  };

  if (body) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url.toString(), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Coolify API ${response.status}: ${text}`);
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
