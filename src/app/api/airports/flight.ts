/*******************************
 * =====================
 * = Type of Flight will be saved
 * =====================
 * = The Data that received from API
 *******************************/

import { FlightType } from "@/lib/Schema/SearchSchema";

const ExtractFlights = (data: any) => {
  // console.log("extractFlights :", data);
  const flights: FlightType[] = [];

  if (data?.data?.itineraries) {
    for (const itinerary of data.data.itineraries) {
      const leg = itinerary.legs[0];
      const flight: FlightType = {
        id: itinerary.id,
        Price: itinerary.price.formatted,
        AirLineLogo: leg.carriers.marketing[0].logoUrl,
        AirLineName: leg.carriers.marketing[0].name,
        Duration: leg.durationInMinutes,
        Stops: leg.stopCount,
        Departure: leg.departure,
        Arrival: leg.arrival,
        OriginDisplayCode: leg.origin.displayCode,
        OriginCity: leg.origin.name,
        OriginCountry: leg.origin.country,
        DestinationDisplayCode: leg.destination.displayCode,
        DestinationCity: leg.destination.name,
        DestinationCountry: leg.destination.country,
      };
      flights.push(flight);
    }
  }
  // console.log("flights :", flights);
  return flights;
};

/*******************************
 * =====================
 * = The Data that received from API
 * =====================
 *******************************/

export { ExtractFlights };
