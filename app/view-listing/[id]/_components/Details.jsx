import React from "react";
import { Button } from "@/components/ui/button";

const Details = ({ data }) => {
  return (
    <>
      <div className="flex flex-col gap-8 mt-10">
        <div className="flex justify-between  items-center">
          <div>
            <h2 className="font-extrabold text-3xl">$ {data.price}</h2>
            <div className="pt-4">
              {/* sticker */}
              {data.address}
            </div>
          </div>
          <Button>Share</Button>
        </div>
        <div>
          <h1 className="font-extrabold text-3xl">keyfeature</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 justify-center items-center gap-4 pt-4">
            <div className=" bg-purple-200 flex item-center justify-center rounded-md p-3">
              {/* sticker */}
              {data.propertyType}
            </div>

            <div className=" p-3 bg-purple-200 flex item-center justify-center rounded-md">
              {/* sticker */}
              {data.builtIn} Build-In
            </div>
            <div className="p-3 bg-purple-200 flex item-center justify-center rounded-md">
              {/* sticker */}
              {data.area} Area
            </div>

            <div className="bg-purple-200 p-3 flex item-center justify-center rounded-md">
              {/* sticker */}
              {data.bedroom} Bedroom
            </div>
            <div className="bg-purple-200 p-3 flex item-center justify-center rounded-md">
              {/* sticker */}
              {data.parking} Parking
            </div>
            <div className="bg-purple-200 p-3 flex item-center justify-center rounded-md">
              {/* sticker */}
              {data.bathroom} Bathroom
            </div>
          </div>
        </div>
        <div>
          <h1 className="font-extrabold text-3xl">What&#39;s Spacial</h1>
          <p className="pt-4">{data.description}</p>
        </div>
      </div>
    </>
  );
};

export default Details;
