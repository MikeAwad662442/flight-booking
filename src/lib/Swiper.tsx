/*******************************
 * @author: Mike Awad
 * @description: Swiper Hero Section
 * =====================
 * [X] Swiper
 * [x] Info
 *******************************/
"use client";
import React from "react";
import Image from "next/image";
// import { cn } from "@/lib/utils";
// ===================== //
// ======= Swiper ====== //
// ===================== //
// Import Swiper React components
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// ===================== //
// Import Swiper styles
import "swiper/css/bundle";
// ===================== //
// ======= Swiper ====== //

type SwiperProps = {
  BodyImages: string[];
  BodyText: string | React.ReactNode;
};
const SwiperSection = ({ BodyImages, BodyText }: SwiperProps) => {
  return (
    <Swiper
      spaceBetween={5}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      loop={true}
      className="mySwiper"
      // className="relative"
    >
      {BodyImages.map((src, index) => (
        <SwiperSlide key={index}>
          <Image
            src={src}
            alt={`Hero ${index + 1}`}
            width={1920} // Use a larger width for responsiveness
            height={1080} // Use a larger height for responsiveness
          />
          {BodyText}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperSection;
/*******************************
 * Notes:
 * =====================
 * Despite all my attempts to control
 * the dimensions of this section,
 * I have not yet reached what I want.
 *******************************/
