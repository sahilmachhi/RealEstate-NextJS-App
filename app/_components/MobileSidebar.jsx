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
                  className={`hover:text-black text-gray-500  cursor-pointer ${
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
                  className={`hover:text-black text-gray-500  cursor-pointer ${
                    path === "/for-sell" ? `text-black` : ``
                  }`}
                >
                  For sell
                </li>
              </Link>
            </SheetClose>
          </ul>
          {isSignedIn ? (
            <div className="flex flex-col gap-4">
              <SheetClose asChild>
                <Button>
                  <Link href={"/user"}>Profile</Link>
                </Button>
              </SheetClose>

              <SheetClose asChild>
                <Button>
                  <Link href={"/user/my-listing"}>My Listing</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button>
                  <SignOutButton>Log Out</SignOutButton>
                </Button>
              </SheetClose>
            </div>
          ) : null}
        </div>
      </SheetContent>
    </>
  );
};

export default MobileSidebar;
