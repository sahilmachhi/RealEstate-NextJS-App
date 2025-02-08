import { Bath, BedDouble, MapPin, Ruler } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ListingCard = ({ lis }) => {
  return (
    <>
   <Link href={`view-listing/${lis.id}`} className="flex">
  <div className="flex flex-col flex-1 gap-4">
    {lis?.listingImages[0]?.url && (
      <Image
        src={lis.listingImages[0].url}
        alt="listing image"
        height={200}
        width={400}
        className="rounded-lg object-cover h-[200px] w-auto"
      />
    )}
    <div className="flex flex-col flex-1 mt-2">
      <div className="flex flex-col flex-1">
        <h2 className="font-bold text-xl">${lis.price}</h2>
        <h2 className="flex items-center gap-2 text-sm text-grey-400 py-2">
          <MapPin className="h-4 w-4" />
          {lis.address}
        </h2>
      </div>
      <div className="flex flex-col md:flex-row gap-2 mt-2">
        <div className="flex items-center justify-center gap-2 text-sm bg-slate-200 rounded-md text-gray-500 p-2 w-full">
          <BedDouble className="h-4 w-4" />
          {lis.bedroom}
        </div>
        <div className="flex items-center justify-center gap-2 text-sm bg-slate-200 rounded-md text-gray-500 p-2 w-full">
          <Bath className="h-4 w-4" />
          {lis.bathroom}
        </div>
        <div className="flex items-center justify-center gap-2 text-sm bg-slate-200 rounded-md text-gray-500 p-2 w-full">
          <Ruler className="h-4 w-4" />
          {lis.area}
        </div>
      </div>
    </div>
  </div>
</Link>

    </>
  );
};

export default ListingCard;
