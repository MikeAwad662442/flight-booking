/*******************************
 * @author: Mike Awad
 * @description: Airport Search
 * =====================
 *
 *******************************/
"use client";
import { GetAirPort } from "@/app/api/airports/route";
import { useState, forwardRef, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";

type Airport = {
  iata: string;
  name: string;
  location: string;
};

interface AirportSearchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onLocationSelected: (value: string) => void;
}
export default forwardRef<HTMLInputElement, AirportSearchProps>(
  function AirportSearch(
    { value, onLocationSelected, ...props }: AirportSearchProps,
    ref,
  ) {
    const SearchT = useTranslations("Search.SearchComponent");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedAirport, setSelectedAirport] = useState("");
    const [results, setResults] = useState<Airport[]>([]);
    const [hasFocus, setHasFocus] = useState(false);
    // === Get Value From Form === //
    useEffect(() => {
      if (value && !selectedAirport) {
        setSelectedAirport(value);
      }
    }, [value]);

    useMemo(() => {
      const FetchAirports = async () => {
        if (!searchQuery.trim()) {
          setResults([]);
          return;
        }
        try {
          const response = await GetAirPort(searchQuery);
          if (response.success) {
            setResults(response.data ?? []);
          } else {
            setResults([]);
            console.error("Failed to fetch airports");
          }
        } catch (error) {
          console.error("Error fetching airports:", error);
          setResults([]);
        }
      };

      const debounceTimer = setTimeout(FetchAirports, 300);
      return () => clearTimeout(debounceTimer);
    }, [searchQuery]);

    const handleSelect = (airport: Airport) => {
      onLocationSelected(airport.iata);

      setSelectedAirport(`${airport.name} (${airport.iata})`);

      setSearchQuery("");
      setResults([]);
      setHasFocus(false);
    };

    return (
      <div className="relative">
        <Input
          type="search"
          placeholder={SearchT("Placeholder")}
          value={hasFocus ? searchQuery : selectedAirport}
          onChange={(e) => {
            if (!hasFocus) setHasFocus(true);
            setSearchQuery(e.target.value);
          }}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setTimeout(() => setHasFocus(false), 200)}
          {...props}
          ref={ref}
          className="w-64"
        />

        {hasFocus && searchQuery.trim() && (
          <div className="absolute z-10 mt-2 w-[500px] divide-y rounded-lg rounded-b-lg border border-x border-b bg-white shadow-lg">
            {results.length === 0 ? (
              <p className="p-4 text-gray-500">{SearchT("NoResults")}</p>
            ) : (
              results.map((airport: Airport) => (
                <button
                  key={airport.iata}
                  className="block w-full p-2 text-start text-primary"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(airport);
                  }}
                >
                  {airport.name} - {airport.location}
                </button>
              ))
            )}
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
