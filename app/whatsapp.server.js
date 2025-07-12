export async function sendWhatsappTemplate({
  phoneNumberId,
  accessToken,
  to,
  template,
  language = "en_US",
  components = [],
}) {
  const url = `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`;
  const body = {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template: {
      name: template,
      language: { code: language },
      components,
    },
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    console.error("WhatsApp API error", await response.text());
  }
  return response.json().catch(() => ({}));
}
