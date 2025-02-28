/*******************************
 * @author: Mike Awad
 * @description: connect to the API
 * =====================
 *
 *******************************/

interface FlightSearchParams {
  origin: string;
  destination: string;
  date: string;
}

interface Flight {
  id: string;
  price: {
    formatted: string;
    numeric: number;
  };
  legs: Array<{
    origin: { name: string; id: string };
    destination: { name: string; id: string };
    departure: string;
  }>;
}

type ApiResponse<T> = {
  data?: T;
  error?: string;
};

const searchFlights = async (
  params: FlightSearchParams,
): Promise<ApiResponse<Flight[]>> => {
  const { origin, destination, date } = params;
  const url = `https://sky-scanner3.p.rapidapi.com/flights/search-one-way?fromEntityId=${origin}&toEntityId=${destination}&departDate=${date}`;

  try {
    const response = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "",
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST || "",
      },
      cache: "force-cache",
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch flights");
    }

    const { data } = await response.json();
    return { data };
  } catch (error) {
    console.error("API Error:", error);
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

export default searchFlights;
