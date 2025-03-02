/*******************************
 * @author: Mike Awad
 * @description: Flight Booking Page
 * =====================
 *******************************/
"use client";
import FlightCard from "@/components/www/flight/card";
import SearchBar from "@/components/www/SearchAirport/SearchBar";
import { FlightType, SearchFlightSchemaType } from "@/lib/Schema/SearchSchema";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

const FlightBookingPage = () => {
  const FlightBookingT = useTranslations("FlightBooking");
  const [defaultCard, setDefaultCard] = useState<FlightType[]>([]);
  const [defaultValues, setDefaultValues] = useState<SearchFlightSchemaType>();

  useEffect(() => {
    const FlightData = localStorage.getItem("flights");
    const savedData = localStorage.getItem("SaveFormData");
    if (FlightData) {
      setDefaultCard(JSON.parse(FlightData));
    }
    if (savedData) {
      setDefaultValues(JSON.parse(savedData));
    }
  }, []);
  // ===================== //
  // == Get Value From localStorage == //

  // == Get Value From localStorage == //
  // ===================== //
  // console.log("Search", defaultValues);
  // console.log("Flight :", defaultCard);
  return (
    <section className="flex h-full w-full flex-col justify-start gap-16">
      <header className="min-h-96 bg-[url('/assets/Flight.jpeg')] bg-cover bg-center">
        <div className="mt-20">
          <SearchBar Value={defaultValues} />
        </div>
      </header>
      <article className="mx-auto flex h-full w-full flex-col">
        {defaultCard.length === 0 ? (
          <h2>{FlightBookingT("Error2")}</h2>
        ) : (
          defaultCard.map((ItemCard, index) => (
            <FlightCard
              ButtonName={FlightBookingT("Button")}
              FlightValue={ItemCard}
              key={index}
            />
          ))
        )}
      </article>
    </section>
  );
};

export default FlightBookingPage;
/*******************************
 * Notes:
 * =====================
 *
 *
 *
 *
 *
 *******************************/
