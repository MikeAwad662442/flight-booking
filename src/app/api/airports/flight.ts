type Flight = {
  Price: string;
  AirLineLogo: string;
  AirLineName: string;
  Duration: number;
  Stops: number;
  Departure: string;
  Arrival: string;
  OriginDisplayCode: string;
  OriginCity: string;
  OriginCountry: string;
  DestinationDisplayCode: string;
  DestinationCity: string;
  DestinationCountry: string;
};

/*******************************
 * =====================
 * = Type of Flight will be saved
 * =====================
 * = The Data that received from API
 *******************************/

const ExtractFlights = (data: any) => {
  // console.log("extractFlights :", data);
  const flights: Flight[] = [];

  if (data?.data?.itineraries) {
    for (const itinerary of data.data.itineraries) {
      const leg = itinerary.legs[0];
      const flight: Flight = {
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
