const MAILCHANNELS_ENDPOINT = "https://api.mailchannels.net/tx/v1/send";

function jsonResponse(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      ...extraHeaders
    }
  });
}

function safeStr(v) {
  return typeof v === "string" ? v.trim() : "";
}

function formatItems(items) {
  if (!Array.isArray(items)) return "";
  return items
    .map((it) => {
      const name = safeStr(it?.name) || "Item";
      const price = typeof it?.price === "number" ? it.price : null;
      return price !== null ? `- ${name}: ${price} BDT` : `- ${name}`;
    })
    .join("\n");
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function sendMail(payload) {
  const res = await fetch(MAILCHANNELS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Mail send failed (${res.status}): ${errText.slice(0, 400)}`);
  }
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Only POST allowed" }, 405);
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  const orderId = safeStr(data?.orderId) || `WR-${Math.floor(10000 + Math.random() * 90000)}`;
  const paymentMode = safeStr(data?.paymentMode) || "later";
  const senderNumber = safeStr(data?.senderNumber);
  const total = typeof data?.total === "number" ? data.total : null;
  const items = Array.isArray(data?.items) ? data.items : [];

  const customer = data?.customer ?? {};
  const customerName = safeStr(customer?.fullName);
  const customerEmail = safeStr(customer?.email);
  const customerPhone = safeStr(customer?.phone);
  const customerBusiness = safeStr(customer?.business);
  const customerDetails = safeStr(customer?.details);

  if (!customerName || !customerPhone) {
    return jsonResponse({ error: "Missing required customer fields (fullName, phone)" }, 400);
  }
  if (!customerEmail) {
    return jsonResponse({ error: "Missing required customer field (email)" }, 400);
  }

  const timestamp = new Date().toISOString();

  // Configure via Cloudflare Pages -> Settings -> Functions -> Variables
  const adminEmail = safeStr(env?.ADMIN_EMAIL) || "ikraismam23@gmail.com";

  const fromName = safeStr(env?.FROM_NAME) || "WebRealm Orders";
  const supportWhatsApp = safeStr(env?.WHATSAPP_NUMBER) || "8801939888381";

  const itemsText = formatItems(items) || "- (No items provided)";
  const totalText = total !== null ? `${total} BDT` : "N/A";

  const adminText =
`New WebRealm order received

Order ID: ${orderId}
Time: ${timestamp}

Customer: ${customerName}
Email: ${customerEmail}
Phone: ${customerPhone}
Business: ${customerBusiness || "N/A"}
Details: ${customerDetails || "N/A"}

Items:
${itemsText}

Total: ${totalText}
Payment mode: ${paymentMode}
Ref/TXN: ${senderNumber || "N/A"}
`;

  const adminHtml = `
  <div style="font-family: Arial, sans-serif; line-height: 1.5">
    <h2>New WebRealm order received</h2>
    <p><b>Order ID:</b> ${escapeHtml(orderId)}<br/>
       <b>Time:</b> ${escapeHtml(timestamp)}</p>

    <h3>Customer</h3>
    <p><b>Name:</b> ${escapeHtml(customerName)}<br/>
       <b>Email:</b> ${escapeHtml(customerEmail)}<br/>
       <b>Phone:</b> ${escapeHtml(customerPhone)}<br/>
       <b>Business:</b> ${escapeHtml(customerBusiness || "N/A")}<br/>
       <b>Details:</b> ${escapeHtml(customerDetails || "N/A")}</p>

    <h3>Items</h3>
    <pre style="background:#f6f8fa;padding:12px;border-radius:8px;white-space:pre-wrap">${escapeHtml(itemsText)}</pre>

    <p><b>Total:</b> ${escapeHtml(totalText)}<br/>
       <b>Payment mode:</b> ${escapeHtml(paymentMode)}<br/>
       <b>Ref/TXN:</b> ${escapeHtml(senderNumber || "N/A")}</p>
  </div>
  `;

  const clientText =
`Thanks for your WebRealm order!

Order ID: ${orderId}
We have received your request and will contact you shortly.

Items:
${itemsText}

Total: ${totalText}

If you need to verify/payment-confirm fast, WhatsApp us: +${supportWhatsApp}
`;

  const clientHtml = `
  <div style="font-family: Arial, sans-serif; line-height: 1.5">
    <h2>Thanks for your WebRealm order!</h2>
    <p>We have received your request and will contact you shortly.</p>
    <p><b>Order ID:</b> ${escapeHtml(orderId)}</p>

    <h3>Items</h3>
    <pre style="background:#f6f8fa;padding:12px;border-radius:8px;white-space:pre-wrap">${escapeHtml(itemsText)}</pre>

    <p><b>Total:</b> ${escapeHtml(totalText)}</p>

    <p>If you need quick verification, WhatsApp: <b>+${escapeHtml(supportWhatsApp)}</b></p>
  </div>
  `;

  try {
    // Admin email
    await sendMail({
      personalizations: [{ to: [{ email: adminEmail }] }],
      from: {
              email: "ikraismam23@gmail.com",
              name: "WebRealm Orders"
            },


      reply_to: { email: customerEmail, name: customerName },
      subject: `[WEBREALM ORDER] ${orderId} - ${customerName}`,
      content: [
        { type: "text/plain", value: adminText },
        { type: "text/html", value: adminHtml }
      ]
    });

    // Client email
    await sendMail({
      personalizations: [{ to: [{ email: customerEmail }] }],
      from: {
              email: "ikraismam23@gmail.com",
              name: "WebRealm Orders"
            },

      reply_to: { email: adminEmail, name: fromName },
      subject: `WebRealm order received: ${orderId}`,
      content: [
        { type: "text/plain", value: clientText },
        { type: "text/html", value: clientHtml }
      ]
    });

    return jsonResponse({ success: true, orderId, timestamp });
  } catch (err) {
    console.error("Email send error:", err?.message || err);
    return jsonResponse({ error: err?.message || "Email send failed" }, 500);
  }
}
