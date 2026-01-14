
export async function onRequest(context) {
  const { request } = context;

  const responseHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: responseHeaders });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Only POST allowed" }), { status: 405, headers: responseHeaders });
  }

  try {
    const data = await request.json();
    console.log("Order Triggered:", data.orderId);
    
    const { orderId, customer, items, total, paymentMode, senderNumber } = data;
    const timestamp = new Date().toISOString();

    const adminEmailPayload = {
      personalizations: [{ to: [{ email: "ikraismam23@gmail.com" }] }],
      from: { email: "automated@webrealm.io", name: "WebRealm System" },
      subject: `[ORDER] ${orderId} - ${customer.fullName}`,
      content: [{
        type: "text/plain",
        value: `ID: ${orderId}\nCustomer: ${customer.fullName}\nPhone: ${customer.phone}\nBusiness: ${customer.business}\nBrief: ${customer.details}\nTotal: ${total} BDT\nMode: ${paymentMode}\nTXN: ${senderNumber || 'N/A'}`
      }]
    };

    // MailChannels Delivery
    const mailResponse = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminEmailPayload)
    });

    if (!mailResponse.ok) {
      const errorText = await mailResponse.text();
      console.error("MailChannels Error:", errorText);
      throw new Error(`Mail failed: ${mailResponse.status}`);
    }

    return new Response(JSON.stringify({ success: true, orderId, timestamp }), {
      status: 200,
      headers: responseHeaders
    });

  } catch (err) {
    console.error("Function Error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: responseHeaders });
  }
}
