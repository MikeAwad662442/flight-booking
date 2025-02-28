/*******************************
 * @author: Mike Awad
 * @description: Airport Search
 * =====================
 *
 *******************************/
"use client";
import { GetAirPort } from "@/app/api/airports/route";
import { useState, forwardRef, useMemo } from "react";
import { Input } from "../../ui/input";
import { useTranslations } from "next-intl";

type Airport = {
  iata_code: string;
  icao_code: string;
  name: string;
  country: string;
};

interface AirportSearchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onLocationSelected: (value: string) => void;
}
export default forwardRef<HTMLInputElement, AirportSearchProps>(
  function AirportSearch(
    { onLocationSelected, ...props }: AirportSearchProps,
    ref,
  ) {
    const SearchT = useTranslations("Search.SearchComponent");
    const [airportSearchInput, setAirportSearchInput] = useState("");
    const [results, setResults] = useState<Airport[]>([]);
    const [hasFocus, setHasFocus] = useState(false);
    // === Get Value From Form === //
    // useMemo(() => {
    //   setQuery(value);
    // }, [value]);

    useMemo(() => {
      const FetchAirports = async () => {
        if (!airportSearchInput.trim()) {
          return [];
        }
        try {
          const data = await GetAirPort(airportSearchInput);
          setResults(data);
          // console.log("results : ", results);
        } catch (error) {
          console.error("Error fetching airports:", error);
        }
      };

      const debounceTimer = setTimeout(FetchAirports, 300);
      return () => clearTimeout(debounceTimer);
    }, [airportSearchInput]);

    return (
      <div className="relative">
        <Input
          type="search"
          placeholder={SearchT("Placeholder")}
          value={airportSearchInput}
          onChange={(e) => setAirportSearchInput(e.target.value)}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          {...props}
          ref={ref}
        />

        {airportSearchInput.trim() && hasFocus && (
          <div className="absolute z-10 mt-2 w-full divide-y rounded-lg rounded-b-lg border border-x border-b bg-white shadow-lg">
            {!results.length && (
              <p className="p-4 text-gray-500">{SearchT("Searching")}</p>
            )}
            {results.map((airport: Airport) => (
              <button
                key={airport.iata_code}
                className="block w-full p-2 text-start text-primary"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onLocationSelected(airport.iata_code);
                  setAirportSearchInput("");
                }}
              >
                {airport.name}-{airport.country}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);
// export default forwardRef<HTMLInputElement, AirportSearchProps>(AirportSearch);
/*******************************
 * Notes:
 * =====================
 *
 *
 *
 *
 *
 *******************************/
