import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const { SheetContent, SheetClose } = require("@/components/ui/sheet");

const MobileSidebar = ({ path, user, isSignedIn }) => {
  console.log(user);
  return (
    <>
      <SheetContent>
        <div className=" flex w-full flex-col gap-4 mt-5">
          {isSignedIn ? (
            <div className="flex w-full gap-4">
              <Image
                src={user?.imageUrl}
                width={45}
                height={45}
                alt="userProfile"
                className="rounded-full"
              />

              <div className="w-full">
                <div>welcome</div>
                <div className="font-bold">{user?.username}</div>
              </div>
            </div>
          ) : (
            <SheetClose asChild>
              <Link href={"/sign-in"}>
                <Button className="w-full">Login</Button>
              </Link>
            </SheetClose>
          )}
          <ul className="flex flex-col items-baseline text-center text-3xl  w-full gap-6">
            <SheetClose asChild>
              <Link href={"/"} className="">
                <li
                  className={`hover:text-black text-gray-300  cursor-pointer ${
                    path === "/" ? `text-black` : ``
                  }`}
                >
                  For rent
                </li>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href={"/for-sell"} className="">
                <li
                  className={`hover:text-black text-gray-300  cursor-pointer ${
                    path === "/for-sell" ? `text-black` : ``
                  }`}
                >
                  For sell
                </li>
              </Link>
            </SheetClose>
          </ul>
          {isSignedIn ? (
            <div className="flex flex-col gap-4 w-full">
              <SheetClose asChild>
                <Link href={"/user"}>
                  <Button className="w-full">Profile</Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href={"/add-new-listing"}>
                  <Button className="w-full">Post Your AD</Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href={"/user/my-listing"}>
                  <Button className="w-full">My Listing</Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <SignOutButton>
                  <Button className="w-full">Log Out</Button>
                </SignOutButton>
              </SheetClose>
            </div>
          ) : null}
        </div>
      </SheetContent>
    </>
  );
};

export default MobileSidebar;
