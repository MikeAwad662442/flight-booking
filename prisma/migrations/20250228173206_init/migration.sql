/*
  Warnings:

  - You are about to drop the column `skyId` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Airport` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Airport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "iata" TEXT NOT NULL,
    "icao" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Airport" ("createdAt", "iata", "icao", "id", "location", "name", "updatedAt") SELECT "createdAt", "iata", "icao", "id", "location", "name", "updatedAt" FROM "Airport";
DROP TABLE "Airport";
ALTER TABLE "new_Airport" RENAME TO "Airport";
CREATE UNIQUE INDEX "Airport_iata_key" ON "Airport"("iata");
CREATE UNIQUE INDEX "Airport_icao_key" ON "Airport"("icao");
CREATE INDEX "Airport_name_idx" ON "Airport"("name");
CREATE INDEX "Airport_iata_idx" ON "Airport"("iata");
CREATE INDEX "Airport_location_idx" ON "Airport"("location");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
