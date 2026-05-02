// ============================================================
//  api.js  –  Simple fetch with full debug logging
// ============================================================

const API_URL = "http://20.207.122.201/evaluation-service/notifications";

export async function fetchNotifications() {
  // 1️⃣  Check what token Vite loaded from .env
  const token = import.meta.env.VITE_API_TOKEN;
  console.log("🔑 Token loaded from .env:", token);

  if (!token) {
    console.error("❌ VITE_API_TOKEN is undefined! Check your .env file.");
    return [];
  }

  // 2️⃣  Make the request
  console.log("📡 Calling API:", API_URL);

  let response;
  try {
    response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
  } catch (networkError) {
    console.error("🚫 Network error (server unreachable?):", networkError);
    return [];
  }

  // 3️⃣  Log the raw HTTP status
  console.log("📶 HTTP Status:", response.status, response.statusText);

  // 4️⃣  Parse the body (even on error, so we can read the message)
  let body;
  try {
    body = await response.json();
  } catch (parseError) {
    console.error("❌ Could not parse JSON response:", parseError);
    return [];
  }

  console.log("📦 Raw API response:", body);

  // 5️⃣  If server returned an error status, log it clearly
  if (!response.ok) {
    console.error(
      "❌ Server returned error:",
      response.status,
      "–",
      body?.message || JSON.stringify(body)
    );
    return [];
  }

  // 6️⃣  Handle both shapes:  array  OR  { notifications: [] }
  if (Array.isArray(body)) {
    console.log("✅ Got array with", body.length, "notifications");
    return body;
  }

  if (body && Array.isArray(body.notifications)) {
    console.log(
      "✅ Got object.notifications with",
      body.notifications.length,
      "items"
    );
    return body.notifications;
  }

  console.warn("⚠️ Unexpected response shape:", body);
  return [];
}