
export async function onRequest(context) {
  const { request } = context;

  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const data = await request.json();
    const { orderId, customer, items, total, paymentMode, paymentMethod, senderNumber } = data;

    const itemsList = items.map(i => `- ${i.name}: ${i.price}`).join('\n');
    const timestamp = new Date().toLocaleString();

    const adminEmailPayload = {
      personalizations: [{ to: [{ email: "ikraismam23@gmail.com" }] }],
      from: { email: "no-reply@webrealm.com", name: "WebRealm System" },
      subject: `New Order Received: ${orderId}`,
      content: [{
        type: "text/plain",
        value: `
          New WebRealm Order Notification
          -------------------------------
          Order ID: ${orderId}
          Time: ${timestamp}

          Customer Details:
          Name: ${customer.fullName}
          Email: ${customer.email}
          Phone: ${customer.phone}
          Business: ${customer.business}

          Project Brief:
          ${customer.details}

          Ordered Services:
          ${itemsList}
          Total: ${total} BDT

          Payment Info:
          Type: ${paymentMode === 'now' ? 'Paid Immediately' : 'Pay Later Request'}
          Method: ${paymentMethod || 'N/A'}
          Sender Info/TXN: ${senderNumber || 'N/A'}
        `
      }]
    };

    const customerEmailPayload = {
      personalizations: [{ to: [{ email: customer.email }] }],
      from: { email: "ikraismam23@gmail.com", name: "WebRealm Support" },
      subject: `Confirmation: Order ${orderId} Received`,
      content: [{
        type: "text/plain",
        value: `
          Dear ${customer.fullName},

          Thank you for choosing WebRealm for your project! We have received your order (ID: ${orderId}).

          Our team is currently reviewing your project brief. We will contact you shortly via WhatsApp (+8801939888381) to discuss the next steps.

          Order Summary:
          - ID: ${orderId}
          - Total Investment: ${total} BDT
          - Status: Processing

          Need to reach us faster?
          - WhatsApp: https://wa.me/8801939888381
          - Email: ikraismam23@gmail.com

          Best Regards,
          The WebRealm Team
        `
      }]
    };

    const sendEmail = async (payload) => {
      try {
        const response = await fetch("https://api.mailchannels.net/tx/v1/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        return { ok: response.ok, status: response.status };
      } catch (e) {
        return { ok: false, error: e.message };
      }
    };

    // Use allSettled to ensure we don't block the response even if one email fails
    await Promise.allSettled([
      sendEmail(adminEmailPayload),
      sendEmail(customerEmailPayload)
    ]);

    // Always return success to the UI to avoid infinite loading
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error("API Error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 200, // Return 200 even on error so UI proceeds
      headers: { "Content-Type": "application/json" }
    });
  }
}
