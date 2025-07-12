-- CreateTable
CREATE TABLE "WhatsappConfig" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "phoneNumberId" TEXT NOT NULL,
    "orderTemplate" TEXT,
    "fulfillTemplate" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true
);

-- CreateIndex
CREATE UNIQUE INDEX "WhatsappConfig_shop_key" ON "WhatsappConfig"("shop");
