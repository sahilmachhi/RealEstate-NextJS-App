"use client";
import { supabase } from "@/utils/supabase";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function ListingFilterForm({ setListing, type }) {
  const [search, setSearch] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(`handle search called`);
    const { data, error } = await supabase
      .from("listing")
      .select(`*,listingImages(*)`)
      .like("address", `%${search}%`)
      .eq("active", true)
      .eq("type", type);
    if (error) console.log(error);
    else {
      console.log(data);
      setListing(data);
    }
  };
  return (
    <form onSubmit={handleSearch}>
      <div className="flex flex-row items-center justify-between gap-5">
        <Input
          type="text"
          placeholder="text"
          onChange={(e) => setSearch(e.target.value)}
        ></Input>
        <Button>Search</Button>
      </div>
    </form>
  );
}

export default ListingFilterForm;
