import React from "react";
import Image from "next/image";
import { Bath, BedDouble, MapPin, Ruler } from "lucide-react";

function Listings({ listing }) {
  return (
    <>
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
        {listing.length > 0
          ? listing.map((lis) => {
              return (
                <>
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
                  </div>
                </>
              );
            })
          : [1, 2, 3, 4, 5, 6, 7].map((items) => (
              <div
                key={items}
                className="h-[240px] w-[322px] bg-slate-400 animate-pulse"
              ></div>
            ))}
      </div>
    </>
  );
}

export default Listings;
