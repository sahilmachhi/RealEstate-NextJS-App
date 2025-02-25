"use client";

import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MobileSidebar from "./MobileSidebar";
import { Menu } from "lucide-react";

function Header() {
  const path = usePathname();
  const { user, isSignedIn } = useUser();

  return (
    <>
      <div className="w-full flex justify-between items-center fixed top-0 bg-white shadow-sm px-20 py-2 z-50">
        <div>
          <Link href={"/"} className="w-20 relative h-20 flex items-center justify-center">
            {/* <Image src={"/logo.svg"} fill={true} alt="logo" /> */}
            <span className="text-lg font-black font-sarif">
              RealEstate Listing
            </span>
          </Link>
        </div>
        <ul className="hidden md:flex gap-14">
          <Link href={"/"}>
            <li
              className={`hover:font-bold text-sm  cursor-pointer ${
                path === "/" ? `font-bold` : ``
              }`}
            >
              for rent
            </li>
          </Link>
          <Link href={"/for-sell"}>
            <li
              className={`hover:font-bold text-sm  cursor-pointer ${
                path === "/for-sell" ? `font-bold` : ``
              }`}
            >
              for sell
            </li>
          </Link>
        </ul>
        <div className="md:flex hidden gap-2">
          <Link href={"/add-new-listing"}>
            <Button>Post Your AD</Button>
          </Link>
          {isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full" asChild>
                <Image
                  src={user?.imageUrl}
                  width={45}
                  height={45}
                  alt="userProfile"
                  className="rounded-full"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={"/user"}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"/user/my-listing"}>My Listing</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SignOutButton>Log Out</SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href={"/sign-in"}>
              <Button variant="outlined">Login</Button>
            </Link>
          )}
        </div>
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger>
            <Menu  />
            </SheetTrigger>
            <MobileSidebar
              path={path}
              user={user}
              isSignedIn={isSignedIn}
            ></MobileSidebar>
          </Sheet>
        </div>
      </div>
    </>
  );
}

export default Header;
