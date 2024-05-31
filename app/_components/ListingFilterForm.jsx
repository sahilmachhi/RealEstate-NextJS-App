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
    e.preventDefault();
    console.log(`handle search called`);
    const { data, error } = await supabase
      .from("listing")
      .select(`*,listingImages(*)`)
      .like("address", `%${search}%`)
      .gte("bedroom", bedroomFilter)
      .gte("bathroom", bathroomFilter)
      .gte("parking", parkingFilter)
      .eq("active", true)
      .eq("type", type)
      .eq("propertyType", homeType);
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
            placeholder="text"
            onChange={(e) => setSearch(e.target.value)}
          ></Input>
          <Button>Search</Button>
        </div>

        <div className="grid justify-start lg:grid-cols-4 grid-cols-2  items-center gap-5">
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
