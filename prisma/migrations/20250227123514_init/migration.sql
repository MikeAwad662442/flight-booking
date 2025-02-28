/*
  Warnings:

  - Added the required column `updatedAt` to the `Airport` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Airport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "iata_code" TEXT NOT NULL,
    "icao_code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Airport" ("city", "country", "iata_code", "icao_code", "id", "latitude", "longitude", "name") SELECT "city", "country", "iata_code", "icao_code", "id", "latitude", "longitude", "name" FROM "Airport";
DROP TABLE "Airport";
ALTER TABLE "new_Airport" RENAME TO "Airport";
CREATE UNIQUE INDEX "Airport_iata_code_key" ON "Airport"("iata_code");
CREATE UNIQUE INDEX "Airport_icao_code_key" ON "Airport"("icao_code");
CREATE INDEX "Airport_name_idx" ON "Airport"("name");
CREATE INDEX "Airport_iata_code_idx" ON "Airport"("iata_code");
CREATE INDEX "Airport_city_idx" ON "Airport"("city");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
