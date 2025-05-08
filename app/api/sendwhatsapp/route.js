export async function POST(req, res) {
  // console.log("Request received:", req);

  if (req.method !== "POST") {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    // const { phone } = req.body;
    // console.log("Phone received:", phone);
    const phone = "5492614607020";
    // console.log("Phone received:", phone);

    if (!phone) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    const messages = [
      { to: phone, body: "Tu lavado está procesándose" },
      { to: process.env.NEXT_PUBLIC_YOUR_BUSINESS_WHATSAPP_NUMBER, body: `Nueva reserva de lavado de ${phone}` },
    ];

    const responses = await Promise.all(
      messages.map(async (msg) => {
        try {
          const response = await fetch(`https://graph.facebook.com/v17.0/${process.env.NEXT_PUBLIC_YOUR_PHONE_NUMBER_ID}/messages`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_YOUR_ACCESS_TOKEN}`,
            },
            body: JSON.stringify({
              messaging_product: "whatsapp",
              to: msg.to,
              type: "text",
              text: { body: msg.body },
            }),
          });

          const data = await response.json();
          console.log("WhatsApp API response:", data);
          return response.ok;
        } catch (err) {
          console.error("Error sending WhatsApp message:", err);
          return false;
        }
      })
    );

    if (responses.every((res) => res)) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ error: "Failed to send some messages" });
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "Server error", details: error });
  }
}