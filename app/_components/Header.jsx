"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

function Header() {
  const path = usePathname();
  const { user, isSignedIn } = useUser();
  useEffect(() => {
    console.log(path);
  }, []);
  return (
    <>
      <div className="w-full flex justify-between items-center fixed top-0 bg-white shadow-sm px-20 py-7 z-50">
        <div>
          <Link href={"/"}>
            <Image src={"/logo.svg"} width={50} height={50} alt="logo" />
          </Link>
        </div>
        <ul className="hidden md:flex gap-14">
          <Link href={"/"}>
            <li
              className={`hover:font-bold text-sm  cursor-pointer ${
                path === "/" ? `font-bold` : ``
              }`}
            >
              for sale
            </li>
          </Link>
          <Link href={"/rent"}>
            <li
              className={`hover:font-bold text-sm  cursor-pointer ${
                path === "/rent" ? `font-bold` : ``
              }`}
            >
              for rent
            </li>
          </Link>
          <Link href={"/"}>
            <li
              className={`hover:font-bold text-sm  cursor-pointer ${
                path === "/agent" ? `font-bold` : ``
              }`}
            >
              agent finder
            </li>
          </Link>
        </ul>
        <div className="flex gap-2">
          <Link href={"add-new-listing"}>
            <Button>Post Your AD</Button>
          </Link>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <Link href={"/sign-in"}>
              <Button variant="outlined">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
