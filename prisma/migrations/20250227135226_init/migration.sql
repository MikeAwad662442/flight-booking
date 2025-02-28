/*
  Warnings:

  - You are about to drop the column `city` on the `Airport` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Airport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "iata_code" TEXT NOT NULL,
    "icao_code" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Airport" ("country", "createdAt", "iata_code", "icao_code", "id", "name", "updatedAt") SELECT "country", "createdAt", "iata_code", "icao_code", "id", "name", "updatedAt" FROM "Airport";
DROP TABLE "Airport";
ALTER TABLE "new_Airport" RENAME TO "Airport";
CREATE UNIQUE INDEX "Airport_iata_code_key" ON "Airport"("iata_code");
CREATE UNIQUE INDEX "Airport_icao_code_key" ON "Airport"("icao_code");
CREATE INDEX "Airport_name_idx" ON "Airport"("name");
CREATE INDEX "Airport_iata_code_idx" ON "Airport"("iata_code");
CREATE INDEX "Airport_country_idx" ON "Airport"("country");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
