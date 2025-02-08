"use client";
import { supabase } from "@/utils/supabase";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FilterSelection from "./FilterSelection";

function ListingFilterForm({ setListing, type }) {
  const [search, setSearch] = useState("");
  const [bathroomFilter, setBathroomFilter] = useState(0);
  const [parkingFilter, setParkingFilter] = useState(0);
  const [bedroomFilter, setBedroomFilter] = useState(0);
  const [homeType, setHomeType] = useState("");

  const handleSearch = async (e) => {
    let query = supabase
      .from("listing")
      .select(`*,listingImages(*)`)
      .like("address", `%${search}%`)
      .gte("bedroom", bedroomFilter)
      .gte("bathroom", bathroomFilter)
      .gte("parking", parkingFilter)
      .eq("active", true)
      .eq("type", type);
    if (homeType) {
      query = query.eq("propertyType", homeType);
    }
    e.preventDefault();
    // console.log(homeType);
    const { data, error } = await query;

    if (error) console.log(error);
    else {
      console.log(data);
      setListing(data);
    }
  };
  return (
    <form onSubmit={handleSearch}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between items-center gap-5">
          <Input
            type="text"
            placeholder="Search Listing here"
            onChange={(e) => setSearch(e.target.value)}
          ></Input>
          <Button>Search</Button>
        </div>

        <div className="grid justify-items-center lg:justify-items-start  lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          <FilterSelection
            setBathroomFilter={setBathroomFilter}
            setParkingFilter={setParkingFilter}
            setBedroomFilter={setBedroomFilter}
            setHomeType={setHomeType}
          />
        </div>
      </div>
    </form>
  );
}

export default ListingFilterForm;
