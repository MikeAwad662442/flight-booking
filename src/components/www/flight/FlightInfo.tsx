/*******************************
 * @author: Mike Awad
 * @description: Flight ID
 * =====================
 *******************************/
"use client";
import { FlightType, SearchFlightSchemaType } from "@/lib/Schema/SearchSchema";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type InfoProps = {
  id: string;
};
const FlightInfo = ({ id }: InfoProps) => {
  const FlightBookingT = useTranslations("FlightBooking");
  const [flight, setFlight] = useState<FlightType | null>(null);
  const [searchData, setSearchData] = useState<SearchFlightSchemaType | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      try {
        const flightData = localStorage.getItem("flights");
        const savedSearchData = localStorage.getItem("SaveFormData");

        if (flightData) {
          const parsedFlights: FlightType[] = JSON.parse(flightData);
          const found = parsedFlights.find((f) => f.id === id);
          setFlight(found || null);
        }

        if (savedSearchData) {
          setSearchData(JSON.parse(savedSearchData));
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (!flight) {
    return <div>notFound</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{FlightBookingT("FlightDetails")}</CardTitle>
        <CardDescription className="flex flex-row items-center justify-between">
          <p>
            {FlightBookingT("Airline")}: {flight.AirLineName}
          </p>
          <Image
            src={`${flight?.AirLineLogo}`}
            alt={`${flight?.AirLineName}`}
            width={250}
            height={250}
            className="h-16 w-16 object-contain"
          />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <h3 className="mb-4 text-xl font-semibold">
          {FlightBookingT("SearchDetails")}
        </h3>
        <div className="mx-16 flex w-full flex-row items-center justify-center gap-8">
          <p className="font-semibold">
            {FlightBookingT("Price")}: {flight.Price}
          </p>
          <p>
            <span className="font-medium">{FlightBookingT("From")}: </span>
            {flight?.OriginDisplayCode} /{flight.OriginCity} -
            {flight?.OriginCountry}
            <br />
            <span className="font-medium">{FlightBookingT("Date")}: </span>
            {format(flight.Departure, "yyyy / MM / dd - HH:mm")}
          </p>
          <p>
            <span className="font-medium">{FlightBookingT("To")}: </span>
            {flight.DestinationDisplayCode} /{flight?.DestinationCity} -
            {flight.DestinationCountry}
            <br />
            <span className="font-medium">{FlightBookingT("Date")}: </span>
            {format(flight.Arrival, "yyyy / MM / dd - HH:mm")}
          </p>
          {searchData && (
            <div>
              <p>
                <span className="font-medium">{FlightBookingT("Cabin")}:</span>{" "}
                {searchData.cabinClass}
              </p>
              <p>
                <span className="font-medium">
                  {FlightBookingT("Passengers")}:
                </span>
                <br />
                {FlightBookingT("Adults")}: {searchData.adults}
                <br />
                {FlightBookingT("Children")}: {searchData.children || 0}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightInfo;
