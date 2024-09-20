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
  const [isLoading, setLoading] = useState(true);
  const { user } = useUser();

  const userListing = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("listing")
      .select("*, listingImages(*)")
      .eq("createdBy", user.emailAddresses[0].emailAddress);
    if (data) {
      setLoading(false);
      setlisting(data);
      return;
    } else {
      setLoading(false);
      console.log(data);
      return;
    }
  };

  const deleteListing = async (id) => {
    const { error: listingImagesError } = await supabase
      .from("listingImages")
      .delete()
      .eq("image_id", id);

    if (listingImagesError) {
      console.error("Error deleting from listingImages:", listingImagesError);
      return;
    }

    const { data, error } = await supabase
      .from("listing")
      .delete()
      .eq("id", id);

    if (data) {
      await userListing();
      return;
    } else return console.log(error);
  };
  const handleEdit = () => {
    console.log("handle edit called");
  };

  useEffect(() => {
    userListing();
  }, []);
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
      {isLoading ? (
        <h1>loading</h1>
      ) : listing.length < 1 ? (
        <div className="flex justify-center flex-col items-center w-full h-full">
          <h1>listings not found</h1>
        </div>
      ) : (
        listing.map((lis) => {
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
                <Button
                  onClick={() => {
                    handleEdit(lis.id);
                  }}
                >
                  edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteListing(lis.id)}
                >
                  delete
                </Button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default UserListing;
