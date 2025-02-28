/*******************************
 * @author: Mike Awad
 * @description: Airport
 * =====================
 * [-] Get Airport From db
 * [-]
 *
 * NEXT_PUBLIC_RAPIDAPI_KEY="b91d2affe6msh3711cb7bbee71aap131bfcjsnf9a862b2e1a9"
 * NEXT_PUBLIC_RAPIDAPI_HOST="sky-scanner3.p.rapidapi.com"
 * NEXT_PUBLIC_RAPIDAPI_URL="https://sky-scanner3.p.rapidapi.com/flights/"
 *******************************/

"use server";
import { prisma } from "@/lib/prisma";
import { SearchFlightSchema } from "@/lib/Schema/SearchSchema";
import axios from "axios";
// import { readFileSync } from "fs";
import fs from "fs/promises";
import path from "path";

type AirportApi = {
  iata: string;
  name: string;
  location: string;
};
const urlRapidApi = process.env.NEXT_PUBLIC_RAPIDAPI_URL;
/**
 * iata: 'AEA',
 * icao: 'NGTB',
 * name: 'Abemama Atoll Airport',
 * location: 'Abemama Atoll, Kiribati',
 * time: 'UTC+12:00',
 * id: 'eyJlIjoiMTI5MDU0NDgyIiwicyI6IkFFQSIsImgiOiI4MTk3NjA0OSIsInQiOiJBSVJQT1JUIn0=',
 * skyId: 'AEA'
 */
const NewAirportDB = async () => {
  try {
    // === Get Full PATH === //
    const projectRoot = process.cwd();
    // console.log("projectRoot", projectRoot);
    // === Join PATH  data file=== //
    const airportsPath = path.join(projectRoot, "scripts", "airports.json");
    // console.log("airportsPath", airportsPath);

    // === Check the file === //
    await fs.access(airportsPath, fs.constants.F_OK);

    const rawData = await fs.readFile(airportsPath, "utf-8");

    // === Check the JSON Data === //
    const airportsData = JSON.parse(rawData) as AirportApi[];

    if (!Array.isArray(airportsData)) {
      throw new Error("Data must be arrayed");
    }

    console.log("airportsData :", airportsData.length);
    const chunkSize = 100;
    for (let i = 0; i < airportsData.length; i += chunkSize) {
      const chunk = airportsData.slice(i, i + chunkSize);

      // === send & save data to database === //
      await prisma.$transaction(async (tx) => {
        for (const airport of chunk) {
          //  === Check if Airport Info is OK === //
          if (!airport.iata || !airport.name || !airport.location) {
            console.warn("Airport missing data:", airport);
            continue;
          }
          await tx.airport.upsert({
            where: { iata: airport.iata },
            update: {
              name: airport.name,
              location: airport.location,
            },
            create: {
              iata: airport.iata,
              name: airport.name,
              location: airport.location,
            },
          });
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
};
const GetAirPort = async (data: string) => {
  try {
    const AirportName = await prisma.airport.count();

    if (AirportName === 0) await NewAirportDB();

    const FindAirport = await prisma.airport.findMany({
      where: {
        OR: [
          { name: { contains: data } },
          { iata: { contains: data } },
          { location: { contains: data } },
        ],
      },
      select: {
        iata: true,
        name: true,
        location: true,
      },
      take: 10,
    });

    return { success: true, data: FindAirport };
  } catch (error) {
    return {
      issues: `the issues : ${error}`,
      message: "We did not find an airport with this name",
      success: false,
    };
  }
};

const onSubmitSearchAction = async (data: FormData) => {
  const formData = Object.fromEntries(data);
  console.log("formData", formData);
  try {
    const Flight = SearchFlightSchema.safeParse(formData);
    // console.log("GetFlight", GetFlight);
    if (!Flight.success) {
      return {
        message: "An error occurred while processing the request",
        issues: Flight.error.issues.map((issue) => issue.message),
        result: false,
      };
    }

    const { FromAirport, FromDate, ToAirport, ToDate } = Flight.data;
    console.log("return Date", ToDate);
    const options = {
      method: "GET",
      url: `${urlRapidApi}search-one-way`,
      params: {
        fromEntityId: FromAirport,
        toEntityId: ToAirport,
        yearMonth: FromDate,
      },
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_URL,
      },
    };

    try {
      const GetFlight = await axios.request(options);
      console.log(GetFlight.data);
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export { GetAirPort, onSubmitSearchAction };

/*******************************
 * Notes:
 * =====================
 *
 *
 *
 *
 *******************************/
