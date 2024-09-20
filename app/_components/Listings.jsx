/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import ListingsSkeleton from "./ListingsSkeleton";
import ListingCard from "./ListingCard";

function Listings({ listing, isLoading }) {
  console.log(listing);
  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {isLoading ? (
          [1, 2, 3, 4, 5, 6, 7, 8, 9].map((items) => (
            <ListingsSkeleton key={items} />
          ))
        ) : listing.length < 1 ? (
          <h1>error listing not found</h1>
        ) : (
          listing.map((lis) => <ListingCard lis={lis} key={lis.id} />)
        )}
      </div>
    </>
  );
}

export default Listings;
