/*******************************
 * @author: Mike Awad
 * @description: Flight Cards
 * =====================
 * [-]
 * [-]
 *
 *
 * ????? shadcn/UI
 *******************************/
"use client";
import { FlightType } from "@/lib/Schema/SearchSchema";
import { Plane, PlaneLanding, PlaneTakeoff } from "lucide-react";
import Image from "next/image";
import React from "react";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
type FlightCardProps = {
  FlightValue: FlightType;
  ButtonName: string;
};

const FlightCard = ({ FlightValue, ButtonName }: FlightCardProps) => {
  const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="mx-8 my-4 flex flex-col items-center justify-between rounded-lg border-4 border-double p-2 md:flex-row">
      <div className="flex w-full flex-row items-center justify-center gap-2 md:w-72 md:flex-col">
        <Image
          src={`${FlightValue.AirLineLogo}` || `/assets/Logo.jpeg`}
          alt={FlightValue.AirLineName || `SkyTravel`}
          width={50}
          height={50}
        />
        <p>{FlightValue.AirLineName}</p>
      </div>
      <div className="mx-2 flex w-full flex-row items-center justify-between">
        {/* Origin */}
        <div className="flex flex-col items-center">
          <PlaneTakeoff />
          <p className="text-xs">
            {format(FlightValue.Departure, "yyyy-MM-dd")}
          </p>
          <p className="text-xs">{format(FlightValue.Departure, "HH:mm")}</p>
          <p className="font-bold">{FlightValue.OriginDisplayCode}</p>
        </div>
        <div className="m-2 flex w-full flex-col items-center justify-center">
          <p className="flex flex-row gap-4">
            <Plane />
            {formatMinutes(FlightValue.Duration)}
          </p>
          <Separator className="w-full" />
        </div>
        {/* Destination */}
        <div className="flex flex-col items-center">
          <PlaneLanding />
          <p className="text-xs">{format(FlightValue.Arrival, "yyyy-MM-dd")}</p>
          <p className="text-xs">{format(FlightValue.Arrival, "HH:mm")}</p>
          <p className="font-bold">{FlightValue.DestinationDisplayCode}</p>
        </div>
      </div>
      <div className="flex w-full flex-row items-center justify-center gap-2 md:w-72 md:flex-col">
        <h3>{FlightValue.Price}</h3>
        <Button asChild>
          <Link href={`/flight-booking/${FlightValue.id}`}>{ButtonName}</Link>
        </Button>
      </div>
    </div>
  );
};

export default FlightCard;
