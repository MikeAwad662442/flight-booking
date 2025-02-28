-- CreateTable
CREATE TABLE "Airport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "iata_code" TEXT NOT NULL,
    "icao_code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Airport_iata_code_key" ON "Airport"("iata_code");

-- CreateIndex
CREATE UNIQUE INDEX "Airport_icao_code_key" ON "Airport"("icao_code");
