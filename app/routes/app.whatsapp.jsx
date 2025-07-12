import { Form, useLoaderData } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  TextField,
  Button,
  BlockStack,
  InlineStack,
  Checkbox,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import {
  getWhatsappConfig,
  saveWhatsappConfig,
} from "../models.whatsapp.server";

export const loader = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);
  const config = await getWhatsappConfig(session.shop);
  return { config };
};

export const action = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const form = await request.formData();
  const data = {
    accessToken: form.get("accessToken") || "",
    phoneNumberId: form.get("phoneNumberId") || "",
    orderTemplate: form.get("orderTemplate") || null,
    fulfillTemplate: form.get("fulfillTemplate") || null,
    status: form.get("status") === "on",
  };
  await saveWhatsappConfig(session.shop, data);
  return null;
};

export default function WhatsappSettings() {
  const { config } = useLoaderData();
  return (
    <Page>
      <TitleBar title="WhatsApp Settings" />
      <Layout>
        <Layout.Section>
          <Card>
            <Form method="post">
              <BlockStack gap="300">
                <TextField
                  name="phoneNumberId"
                  label="Phone Number ID"
                  defaultValue={config?.phoneNumberId || ""}
                  autoComplete="off"
                />
                <TextField
                  name="accessToken"
                  label="Access Token"
                  defaultValue={config?.accessToken || ""}
                  autoComplete="off"
                />
                <TextField
                  name="orderTemplate"
                  label="Order Template Name"
                  defaultValue={config?.orderTemplate || ""}
                  autoComplete="off"
                />
                <TextField
                  name="fulfillTemplate"
                  label="Fulfillment Template Name"
                  defaultValue={config?.fulfillTemplate || ""}
                  autoComplete="off"
                />
                <Checkbox
                  name="status"
                  label="Enable notifications"
                  defaultChecked={config?.status ?? true}
                />
                <InlineStack>
                  <Button submit primary>
                    Save
                  </Button>
                </InlineStack>
              </BlockStack>
            </Form>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
