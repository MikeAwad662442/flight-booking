/*******************************
 * @author: Mike Awad
 * @description: Home
 * ============================
 * [X]
 *******************************/
import SearchBar from "@/components/www/SearchAirport/SearchBar";
import React from "react";

const Homepage = () => {
  return (
    <section className="flex h-full w-full flex-col justify-start gap-16">
      <header className="min-h-96 bg-[url('/assets/Flight02.jpeg')] bg-cover bg-center">
        <div className="mt-20">
          <SearchBar />
        </div>
      </header>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore dolorem
        odit cupiditate voluptate natus praesentium esse nam? Vero deleniti
        architecto ipsam aspernatur aperiam ratione, et neque suscipit possimus
        nulla. Ex placeat debitis nihil quia corrupti error sapiente dolorum
        necessitatibus optio a architecto sunt modi odit itaque similique odio
        consequuntur voluptas perferendis unde, aliquam, ducimus dignissimos,
        expedita ullam. Eligendi, mollitia magni! Veniam, ut quaerat. Iure
        consectetur quam ullam repellat? Cum magni molestias, dolorem unde
        consequuntur optio dolore culpa officia voluptate dolores fuga aliquam
        neque hic nihil rem officiis quod! Repudiandae atque itaque sed sunt eos
        perferendis nihil delectus repellat cupiditate? Maiores?
      </p>
    </section>
  );
};

export default Homepage;
