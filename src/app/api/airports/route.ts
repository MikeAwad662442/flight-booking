/*******************************
 * @author: Mike Awad
 * @description: Airport
 * =====================
 * [X] Get Airport From db
 * [X] Get Flight From RAPIDAPI

 *******************************/

"use server";
import { prisma } from "@/lib/prisma";
import { SearchFlightSchema } from "@/lib/Schema/SearchSchema";
import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { ExtractFlights } from "./flight";

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

/*******************************
 * =====================
 * = Get Airports from backUp JSON File
 * =====================
 *******************************/
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

    // console.log("airportsData :", airportsData.length);
    const chunkSize = 100;
    for (let i = 0; i < airportsData.length; i += chunkSize) {
      const chunk = airportsData.slice(i, i + chunkSize);

      // === send & save data to database === //
      await prisma.$transaction(async (tx) => {
        for (const airport of chunk) {
          //  === Check if Airport Info is OK === //
          if (!airport.iata || !airport.name || !airport.location) {
            // console.warn("Airport missing data:", airport);
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

/*******************************
 * =====================
 * = Get Airports from backUp JSON File
 * =====================
 * = Get Airport From DB
 *******************************/

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
/*******************************
 * =====================
 * = Get Airport From DB
 * =====================
 * = Get Airport From DB
 *******************************/
const onSubmitSearchAction = async (data: FormData) => {
  try {
    const formData = Object.fromEntries(data);
    // console.log("formData", formData);

    const Flight = SearchFlightSchema.safeParse(formData);
    // console.log("GetFlight", Flight);

    if (!Flight.success) {
      return {
        success: false,
        message: "An error occurred while processing the request",
        issues: Flight.error.issues.map((issue) => issue.message),
      };
    }

    const {
      FromAirport,
      FromDate,
      ToAirport,
      ToDate,
      cabinClass,
      children,
      adults,
    } = Flight.data;
    // console.log("return Date", ToDate);

    let options;

    if (!ToDate) {
      options = {
        method: "GET",
        url: `${urlRapidApi}search-one-way`,
        params: {
          fromEntityId: FromAirport,
          toEntityId: ToAirport,
          departDate: FromDate,
          cabinClass: cabinClass,
          adults: adults,
          children: children || "0",
        },
        headers: {
          "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
          "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
        },
      };
    } else {
      options = {
        method: "GET",
        url: `${urlRapidApi}search-roundtrip`,
        params: {
          fromEntityId: FromAirport,
          toEntityId: ToAirport,
          departDate: FromDate,
          cabinClass: cabinClass,
          adults: adults,
          children: children || "0",
        },
        headers: {
          "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
          "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
        },
      };
    }

    const GetFlight = await axios.request(options);
    // console.log("GetFlight :", GetFlight.data);
    // console.log("GetFlight itineraries:", GetFlight.data.itineraries);
    const DataReceived = ExtractFlights(GetFlight.data);
    // console.log("DataReceived", DataReceived);
    return {
      success: true,
      message: "Flight data retrieved successfully",
      data: DataReceived,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "API request failed",
      issues: [axios.isAxiosError(error) ? error.message : "Unknown error"],
    };
  }
};

export { GetAirPort, onSubmitSearchAction };

/*******************************
 * Notes:
 * =====================
 *
 *
 *
 *******************************/
