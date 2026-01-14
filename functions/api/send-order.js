
export async function onRequest(context) {
  const { request } = context;

  // Set up CORS and basic headers for response
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
    return new Response(JSON.stringify({ error: "Method not allowed" }), { 
      status: 405, 
      headers: responseHeaders 
    });
  }

  try {
    const data = await request.json();
    const { orderId, customer, items, total, paymentMode, paymentMethod, senderNumber } = data;

    const itemsList = items && items.length > 0 
      ? items.map(i => `- ${i.name}: ${i.price}`).join('\n')
      : (data.maintenance ? "Web Maintenance Service" : "No items listed");
      
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' });

    // Payload for Admin
    const adminEmailPayload = {
      personalizations: [{ to: [{ email: "ikraismam23@gmail.com" }] }],
      from: { email: "orders@webrealm.io", name: "WebRealm Orders" },
      subject: `[WEBREALM] NEW ORDER: ${orderId}`,
      content: [{
        type: "text/plain",
        value: `
WebRealm New Order
================================
ID: ${orderId}
Time (BD): ${timestamp}

CUSTOMER INFO:
Name: ${customer.fullName || 'N/A'}
Email: ${customer.email || 'N/A'}
Phone: ${customer.phone || 'N/A'}
Business: ${customer.business || 'N/A'}

BRIEF:
${customer.details || 'No details provided.'}

SERVICES:
${itemsList}

FINANCIALS:
Total: ${total} BDT
Mode: ${paymentMode === 'now' ? 'Instant Pay' : 'Pay Later Request'}
Method: ${paymentMethod || 'N/A'}
TXN/Sender: ${senderNumber || 'N/A'}
================================
        `
      }]
    };

    // Payload for Customer
    const customerEmailPayload = {
      personalizations: [{ to: [{ email: customer.email }] }],
      from: { email: "hello@webrealm.io", name: "WebRealm Support" },
      subject: `Order Confirmation - ${orderId}`,
      content: [{
        type: "text/plain",
        value: `
Hello ${customer.fullName},

Thank you for choosing WebRealm! We've received your order request.

ORDER ID: ${orderId}
STATUS: In Review

Our team will contact you via WhatsApp or Email within the next few hours to discuss your project requirements in detail.

Urgent? Message us on WhatsApp: https://wa.me/8801939888381

Best Regards,
The WebRealm Team
        `
      }]
    };

    // MailChannels Send Helper
    const sendMail = async (payload) => {
      return fetch("https://api.mailchannels.net/tx/v1/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    };

    // Trigger both emails
    const results = await Promise.allSettled([
      sendMail(adminEmailPayload),
      sendMail(customerEmailPayload)
    ]);

    console.log("Mail results:", results);

    return new Response(JSON.stringify({ 
      success: true, 
      orderId: orderId 
    }), {
      status: 200,
      headers: responseHeaders
    });

  } catch (err) {
    console.error("Critical Function Error:", err.message);
    return new Response(JSON.stringify({ 
      error: "INTERNAL_SERVER_ERROR", 
      details: err.message 
    }), { 
      status: 500,
      headers: responseHeaders
    });
  }
}
