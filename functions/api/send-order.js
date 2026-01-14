
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
    console.log("Handling OPTIONS preflight");
    return new Response(null, { status: 204, headers: responseHeaders });
  }

  if (request.method !== "POST") {
    console.log(`Method ${request.method} not allowed`);
    return new Response(JSON.stringify({ error: "Method not allowed" }), { 
      status: 405, 
      headers: responseHeaders 
    });
  }

  try {
    const data = await request.json();
    console.log("Order Data Received:", JSON.stringify(data));
    
    const { orderId, customer, items, total, paymentMode, paymentMethod, senderNumber } = data;

    const itemsList = items && items.length > 0 
      ? items.map(i => `- ${i.name}: ${i.price}`).join('\n')
      : (data.maintenance ? "Web Maintenance Service" : "No items listed");
      
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' });

    // Build the plain text bodies
    const adminBody = `
WebRealm New Order Event
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
`;

    const customerBody = `
Hello ${customer.fullName},

Thank you for choosing WebRealm! We've received your project order.

ORDER ID: ${orderId}
STATUS: Queued for Review

What happens next?
1. Our engineering lead will review your project brief.
2. We will contact you via WhatsApp (${customer.phone}) or Email to discuss the roadmap.
3. Once requirements are locked, work begins immediately.

Need to talk now? Message us: https://wa.me/8801939888381

Best Regards,
The WebRealm Team
`;

    // MailChannels Sending Function
    const sendMail = async (toEmail, subject, body, fromEmail, fromName) => {
      const payload = {
        personalizations: [{ to: [{ email: toEmail }] }],
        from: { email: fromEmail, name: fromName },
        subject: subject,
        content: [{ type: "text/plain", value: body }]
      };

      console.log(`Attempting to send email to ${toEmail}...`);
      const res = await fetch("https://api.mailchannels.net/tx/v1/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      const status = res.status;
      const text = await res.text();
      console.log(`MailChannels response for ${toEmail}: ${status} - ${text}`);
      
      return { status, text };
    };

    // Execute mail sending
    // We attempt these but even if they fail, we return success for the order itself
    // as it's logged in the Cloudflare Function logs.
    const results = await Promise.allSettled([
      sendMail("ikraismam23@gmail.com", `[NEW ORDER] ${orderId} - ${customer.fullName}`, adminBody, "orders@webrealm.io", "WebRealm Orders"),
      sendMail(customer.email, `Order Confirmation - ${orderId}`, customerBody, "support@webrealm.io", "WebRealm Support")
    ]);

    console.log("Final Mail Transaction Results:", JSON.stringify(results));

    return new Response(JSON.stringify({ 
      success: true, 
      orderId: orderId,
      timestamp: timestamp
    }), {
      status: 200,
      headers: responseHeaders
    });

  } catch (err) {
    console.error("CRITICAL API FAILURE:", err.message);
    return new Response(JSON.stringify({ 
      error: "SERVER_TRANS_ERROR", 
      details: err.message 
    }), { 
      status: 500,
      headers: responseHeaders
    });
  }
}
