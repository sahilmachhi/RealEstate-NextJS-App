"use client";
import ListingMapView from "./_components/ListingMapView";
export default function Home() {
  return (
    <>
      <div className="relative block mx-auto md:px-8 px-2 container">
        <ListingMapView type="sell" />
      </div>
    </>
  );
}
