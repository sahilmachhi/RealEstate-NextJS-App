"use client";
import { UserButton, UserProfile } from "@clerk/nextjs";
import React from "react";
import UserListing from "./_components/UserListing";
import { Building2 } from "lucide-react";
const page = () => {
  return (
    <>
      <div>
        <UserProfile>
          <UserButton.UserProfilePage
            label="Listings"
            labelIcon={<Building2 className="h-5 w-5" />}
            url="my-listing"
          >
            <UserListing />
          </UserButton.UserProfilePage>
        </UserProfile>
      </div>
    </>
  );
};

export default page;
