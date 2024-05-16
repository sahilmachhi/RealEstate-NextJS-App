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
      <div className="flex gap-4 md:flex-col flex-row">
        {data.map((lis) => (
          <div
            key={lis.id}
            className="shadow-slate-950 shadow-md flex w-12 h-12"
          >
            <h1>{lis.id}</h1>
          </div>
        ))}
      </div>
    </>
  );
}

export default Listings;
