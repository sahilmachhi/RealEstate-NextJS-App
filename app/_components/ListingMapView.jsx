"use client";
import ListingFilterForm from "./ListingFilterForm";
import Listings from "./Listings";
import { supabase } from "@/utils/supabase";
import react, { useEffect, useState } from "react";
const ListingMapView = ({ type }) => {
  const [listing, setListing] = useState([]);
  useEffect(() => {
    getListing();
  }, []);
  const getListing = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select(`*,listingImages(*)`)
      .eq("active", true)
      .eq("type", type);
    if (error) console.log(error);
    else {
      setListing(data);
    }
  };
  return (
    <>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 w-full">
        <div className="flex flex-col gap-4">
          <ListingFilterForm setListing={setListing} type={type} />
          <Listings listing={listing} />
        </div>
        <div>for map</div>
      </div>
    </>
  );
};

export default ListingMapView;
