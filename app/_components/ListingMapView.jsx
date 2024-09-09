"use client";
import ListingFilterForm from "./ListingFilterForm";
import Listings from "./Listings";
import { supabase } from "@/utils/supabase";
import react, { useEffect, useState } from "react";

const ListingMapView = ({ type }) => {
  const [listing, setListing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getListing();
  }, []);
  const getListing = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("listing")
      .select(`*,listingImages(*)`)
      .eq("active", true)
      .eq("type", type);
    if (error) {
      setIsLoading(false);
      console.log(error);
    } else {
      setIsLoading(false);
      setListing(data);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-4">
        <ListingFilterForm setListing={setListing} type={type} />
        <Listings listing={listing} isLoading={isLoading} />
      </div>
    </>
  );
};

export default ListingMapView;
