import prisma from "../db.server";

export async function getWhatsappConfig(shop) {
  return prisma.whatsappConfig.findUnique({ where: { shop } });
}

export async function saveWhatsappConfig(shop, data) {
  return prisma.whatsappConfig.upsert({
    where: { shop },
    create: { shop, ...data },
    update: data,
  });
}
