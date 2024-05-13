import React from "react";
import Listings from "./Listings";

const ListingMapView = () => {
  return (
    <>
      <div className="grid md:grid-cols-2 grid-cols-1">
        <Listings />
        <div>for map</div>
      </div>
    </>
  );
};

export default ListingMapView;
