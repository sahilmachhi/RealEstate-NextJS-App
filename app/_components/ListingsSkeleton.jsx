import { Bath, BedDouble, MapPin, Ruler } from "lucide-react";

const ListingsSkeleton = () => {
  return (
    <>
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-between flex-col w-full">
          <div className="rounded-lg object-cover bg-gray-400 h-[175px] w-full"></div>
          <div className="flex flex-col mt-2">
            <div className="h-5 w-28 bg-gray-400"></div>
            <h2 className="flex gap-2 text-sm text-grey-400 items-center py-2">
              <MapPin className="h-4 w-4" />
              <div className="h-5 w-20 bg-gray-400"></div>
            </h2>

            <div className="flex gap-2 justify-between md:flex-row flex-col mt-2">
              <div className="flex gap-2 text-sm bg-slate-200 rounded-md text-gray-500 items-center justify-center p-2 w-full">
                <BedDouble className="h-4 w-4" />
                <div className="h-5 w-4 bg-gray-400"></div>
              </div>
              <div className="flex gap-2 text-sm bg-slate-200 rounded-md text-gray-500 items-center justify-center p-2 w-full">
                <Bath className="h-4 w-4" />
                <div className="h-5 w-4 bg-gray-400"></div>
              </div>
              <div className="flex gap-2 text-sm bg-slate-200 rounded-md text-gray-500 items-center justify-center p-2 w-full">
                <Ruler className="h-4 w-4" />
                <div className="h-5 w-4 bg-gray-400"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingsSkeleton;
