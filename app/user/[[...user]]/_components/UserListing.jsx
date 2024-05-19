"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Bath, BedDouble, MapPin, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";

const UserListing = () => {
  const [listing, setlisting] = useState([]);
  const { user } = useUser();
  console.log(user.emailAddresses[0].emailAddress);
  useEffect(() => {
    userListing();
  }, []);
  const userListing = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*, listingImages(*)")
      .eq("createdBy", user.emailAddresses[0].emailAddress);
    if (data) setlisting(data);
    else console.log(error);
  };

  console.log("listing", listing);
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
      {listing.map((lis) => {
        return (
          <div key={lis.id} className="flex justify-between flex-col">
            <div>
              {lis?.listingImages[0]?.url ? (
                <Image
                  src={lis.listingImages[0].url}
                  alt="listing image"
                  height={150}
                  width={800}
                  className="rounded-lg object-cover"
                />
              ) : null}
            </div>
            <div className="flex flex-col mt-2">
              <h2 className="font-bold text-xl">$ {lis.price}</h2>
              <h2 className="flex gap-2 text-sm text-grey-400 items-center py-2">
                <MapPin className="h-4 w-4" />
                {lis.address}
              </h2>

              <div className="flex gap-2 justify-between mt-2">
                <div className="flex gap-2 text-sm bg-slate-200 rounded-md text-gray-500 items-center justify-center p-2 w-full">
                  <BedDouble className="h-4 w-4" />
                  {lis.bedroom}
                </div>
                <div className="flex gap-2 text-sm bg-slate-200 rounded-md text-gray-500 items-center justify-center p-2 w-full">
                  <Bath className="h-4 w-4" />
                  {lis.bathroom}
                </div>
                <div className="flex gap-2 text-sm bg-slate-200 rounded-md text-gray-500 items-center justify-center p-2 w-full">
                  <Ruler className="h-4 w-4" />
                  {lis.area}
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-3 w-full justify-between">
              <Link href={"/view-listing/" + lis.id}>
                <Button variant="secondary">view</Button>
              </Link>
              <Button>edit</Button>
              <Button variant="destructive">delete</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserListing;
