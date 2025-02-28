/*******************************
 * @author: Mike Awad
 * @description: Airport
 * =====================
 * [-] Get Airport From db
 * [-]
 *
 *
 *******************************/

"use server";
import { prisma } from "@/lib/prisma";
// import { SearchFlightSchema } from "@/lib/Schema/SearchSchema";
import axios from "axios";

const validateAirportData = (airport: any) => {
  return (
    airport.iata_code &&
    airport.icao_code &&
    airport.airport_name &&
    airport.country_name
  );
};

const AirportApi = async () => {
  try {
    const Response = await axios.get(
      "http://api.aviationstack.com/v1/airports",
      {
        params: {
          access_key: process.env.NEXT_AVIATIONSTACK_API_KEY,
          limit: 1000,
        },
      },
    );
    const validAirports = Response.data.data.filter(
      (a: any) =>
        validateAirportData(a) &&
        a.iata_code.length === 3 &&
        a.icao_code.length === 4,
    );

    // === save to db
    const chunkSize = 100;
    for (let i = 0; i < validAirports.length; i += chunkSize) {
      const chunk = validAirports.slice(i, i + chunkSize);

      await prisma.$transaction(async (tx) => {
        for (const airport of chunk) {
          await tx.airport.upsert({
            where: { iata_code: airport.iata_code },
            update: {
              name: airport.airport_name,
              icao_code: airport.icao_code,
              country: airport.country_name,
            },
            create: {
              name: airport.airport_name,
              iata_code: airport.iata_code,
              icao_code: airport.icao_code,
              country: airport.country_name,
            },
          });
        }
      });
    }

    // console.log("add Airport No.", validAirports.length);
  } catch (error) {
    // console.error("the error", error);
    throw error;
  }
};

const GetAirPort = async (data: string) => {
  try {
    const AirportName = await prisma.airport.count();

    if (AirportName === 0) await AirportApi();

    const FindAirport = await prisma.airport.findMany({
      where: {
        OR: [
          { name: { contains: data } },
          { iata_code: { contains: data } },
          { country: { contains: data } },
        ],
      },
    });

    // console.log("data", data);
    // console.log("AirportName", AirportName);
    // console.log("FindAirport", FindAirport);
    return FindAirport;
  } catch (error) {
    return {
      issues: `the issues : ${error}`,
      message: "We did not find an airport with this name",
      result: false,
    };
  }
};

const onSubmitSearchAction = async (data: FormData) => {
  const formData = Object.fromEntries(data);
  console.log("formData", formData);
  try {
    // const GetFlight = SearchFlightSchema.safeParse(formData);
    // console.log("GetFlight", GetFlight);
    // if (!GetFlight.success) {
    //   return {
    //     message: "An error occurred while processing the request",
    //     issues: GetFlight.error.issues.map((issue) => issue.message),
    //     result: false,
    //   };
    // }

    const { FindAirport, FormData, ToAirport, ToDate } = formData.data;
    const params = {
      access_key: process.env.NEXT_AVIATIONSTACK_API_KEY,
      dep_iata: FindAirport,
      arr_iata: ToAirport,
      flight_date: FormData,
      limit: 50,
    };
    axios
      .get("http://api.aviationstack.com/v1/flights", { params })
      .then((response) => {
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    return {
      message: "An error occurred while processing the request",
      issues: `the issues : ${error}`,
      result: false,
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
 *
 *
 *******************************/
