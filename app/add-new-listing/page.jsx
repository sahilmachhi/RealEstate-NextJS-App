"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
function Page() {
  const [address, setAddress] = useState("");
  const { user } = useUser();
  const route = useRouter();
  useEffect(() => {
    if (!user) {
      route.push("/sign-in");
    } else {
      console.log(user);
      console.log(user.primaryEmailAddress.emailAddress);
      console.log(address);
    }
  }, [user, route, address]);

  if (!user) {
    return null;
  }

  const handleSubmit = async (e) => {
    username;
    e.preventDefault();
    const { error, data } = await supabase
      .from("listing")
      .insert([
        {
          address: address,
          createdBy: user?.primaryEmailAddress.emailAddress,
          username: user?.username,
          profileImage: user?.imageUrl,
        },
      ])
      .select();
    if (error) console.log(error);
    else route.push(`edit-listing/${data[0].id}`);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex md:flex-row flex-col gap-2 md:w-1/3 w-2/3 mt-[5rem]"
      >
        <Input
          type="text"
          placeholder="enter address here"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          value={address}
        />
        <Button type="submit">submit</Button>
      </form>
    </>
  );
}

export default Page;
