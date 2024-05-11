import React from "react";
import Map from "../_components/Map";

function page() {
  return (
    <>
      <div className="flex items-center flex-col justify-center w-full p-10 gap-5">
        <h2 className="text-2xl font-bold">add new listing</h2>
        <div className="w-[75vw] flex items-center justify-center flex-col">
          <h2 className="text-gray-500 text-lg">add listing from map</h2>
          <Map />
        </div>
      </div>
    </>
  );
}

export default page;
