"use client";
import { supabase } from "@/utils/supabase";
import React, { useEffect, useState } from "react";
import ImageSlider from "./_components/ImageSlider";
import Details from "./_components/Details";

const Page = ({ params }) => {
  const [home, setHome] = useState([]);
  useEffect(() => {
    viewListing();
  });
  const viewListing = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*, listingImages(*)")
      .eq("id", params.id);
    if (data) {
      console.log(data);
      setHome(data);
    } else {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-full">
        {home.map((data) => (
          <div key={data.id} className="px-3 md:px-32 lg:px-56">
            <ImageSlider data={data.listingImages} />
            <Details data={data} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
