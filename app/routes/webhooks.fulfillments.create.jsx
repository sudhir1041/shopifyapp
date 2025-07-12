import { authenticate } from "../shopify.server";
import { getWhatsappConfig } from "../models.whatsapp.server";
import { sendWhatsappTemplate } from "../whatsapp.server";

export const action = async ({ request }) => {
  const { payload, shop, topic } = await authenticate.webhook(request);
  console.log(`Received ${topic} webhook for ${shop}`);

  const config = await getWhatsappConfig(shop);
  if (!config || !config.status || !config.fulfillTemplate) {
    return new Response();
  }
  const phone =
    payload?.order?.customer?.phone ||
    payload?.order?.shipping_address?.phone ||
    payload?.order?.billing_address?.phone;

  if (phone) {
    await sendWhatsappTemplate({
      phoneNumberId: config.phoneNumberId,
      accessToken: config.accessToken,
      to: phone,
      template: config.fulfillTemplate,
    });
  }
  return new Response();
};
