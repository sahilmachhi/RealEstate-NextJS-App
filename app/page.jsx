"use client";
import ListingMapView from "./_components/ListingMapView";
export default function Home() {
  return (
    <>
      <div className="relative block">
        <ListingMapView type="sell" />
      </div>
    </>
  );
}
