"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Bath, BedDouble, MapPin, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const UserListing = () => {
  const router = useRouter();
  const [listing, setlisting] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isDeleting, setDeleting] = useState(false);
  const { user } = useUser();

  const userListing = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("listing")
      .select("*, listingImages(*)")
      .eq("createdBy", user.emailAddresses[0].emailAddress);
    if (data) {
      console.log(data);
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
    setDeleting(true);
    const { data: imageList, error: dataFindError } = await supabase
      .from("listing")
      .select("*, listingImages(*)")
      .eq("id", id);

    if (dataFindError) {
      return console.log(error);
    }

    const images = imageList[0].listingImages;

    for (const image of images) {
      const { error: bucketDeleteError } = await supabase.storage
        .from("listingImages")
        .remove([image.imageName]);
      if (bucketDeleteError) {
        return console.log(bucketDeleteError);
      }
    }

    const { error: listingImagesDeleteError } = await supabase
      .from("listingImages")
      .delete()
      .eq("image_id", id);
    if (listingImagesDeleteError) {
      console.error(
        "Error deleting from listingImages:",
        listingImagesDeleteError
      );
      return;
    }
    const { data: deleteDone, error: listingDeleteError } = await supabase
      .from("listing")
      .delete()
      .eq("id", id);
    if (deleteDone) {
      userListing();
      setDeleting(false);
      return;
    } else {
      setDeleting(false);
      console.log(listingDeleteError);
      return;
    }
  };
  const handleEdit = (id) => {
    router.push(`/edit-listing/${id}`);
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
                {isDeleting ? (
                  <Button variant="ghost">deleting</Button>
                ) : (
                  <Button
                    variant="destructive"
                    onClick={() => deleteListing(lis.id)}
                  >
                    delete
                  </Button>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default UserListing;
