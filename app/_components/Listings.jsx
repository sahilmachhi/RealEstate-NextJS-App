import React from "react";
import { supabase } from "@/utils/supabase";
export const revalidate = 3600;
async function Listings() {
  const { data, error } = await supabase
    .from("listing")
    .select(`*,listingImages(*)`);
  if (error) console.log(error);
  else console.log(data);

  return (
    <>
      <h1>Listing</h1>
    </>
  );
}

export default Listings;
