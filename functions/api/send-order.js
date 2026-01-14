
export async function onRequest(context) {
  const { request } = context;

  const responseHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  // Handle preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: responseHeaders });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Only POST allowed" }), { 
      status: 405, 
      headers: responseHeaders 
    });
  }

  try {
    const data = await request.json();
    console.log("Order Received:", data.orderId);
    
    const { orderId, customer, items, total, paymentMode, senderNumber } = data;
    const timestamp = new Date().toISOString();

    const adminEmailPayload = {
      personalizations: [{ to: [{ email: "ikraismam23@gmail.com" }] }],
      from: { email: "orders@webrealm.io", name: "WebRealm Automator" },
      subject: `[ORDER] ${orderId} - ${customer.fullName}`,
      content: [{
        type: "text/plain",
        value: `Order ID: ${orderId}\nCustomer: ${customer.fullName}\nEmail: ${customer.email}\nPhone: ${customer.phone}\nBusiness: ${customer.business}\nDetails: ${customer.details}\nTotal: ${total} BDT\nMode: ${paymentMode}\nSender/TXN: ${senderNumber || 'N/A'}`
      }]
    };

    // MailChannels Delivery
    const mailResponse = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminEmailPayload)
    });

    if (!mailResponse.ok) {
      const errorBody = await mailResponse.text();
      console.error("MailChannels Error:", errorBody);
      throw new Error(`Email System Error: ${mailResponse.status}`);
    }

    return new Response(JSON.stringify({ success: true, orderId, timestamp }), {
      status: 200,
      headers: responseHeaders
    });

  } catch (err) {
    console.error("Execution Error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: responseHeaders
    });
  }
}
