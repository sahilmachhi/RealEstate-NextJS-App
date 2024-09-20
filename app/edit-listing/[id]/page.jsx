"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Formik, Form } from "formik";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import FileUpload from "../_components/FileUpload";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function Page({ params }) {
  let postId = params.id;
  const [images, setImages] = useState([]);
  const router = useRouter();
  let { user } = useUser();

  const getPost = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*, listingImages(*)")
      .eq("id", params.id);
    if (error) {
      return console.log(error);
    }
    console.log(data);
    // set data to listing object
  };
  const formSubmit = async (formValue) => {
    const { data, error } = await supabase
      .from("listing")
      .update(formValue)
      .eq("id", postId)
      .select();
    if (error) console.log(error);

    for (const image of images) {
      const fileName = Date.now().toString();
      const { data, error } = await supabase.storage
        .from("listingImages")
        .upload(`${fileName}`, image, {
          cacheControl: "3600",
          upsert: false,
        });
      if (error) {
        console.log(error);
      } else {
        const imageUrl = process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL + fileName;
        const { error } = await supabase
          .from("listingImages")
          .insert([{ url: imageUrl, image_id: postId }])
          .eq("id", 1);
        if (error) console.log(error);
      }
    }
  };

  useEffect(() => {
    // verifyUserRecord();
    getPost();
  }, []);

  const verifyUserRecord = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*")
      .eq("createdBy", user?.primaryEmailAddress.emailAddress)
      .eq("id", postId);

    if (data.length < 1) {
      router.replace("/");
    }
  };

  const publishbtn = async () => {
    const { error, data } = await supabase
      .from("listing")
      .update({ active: true })
      .eq("id", postId)
      .select();
    if (error) console.log(error);
    else {
      console.log("function called");
    }
  };
  return (
    <>
      <div className="self-start text-left w-full px-10">
        <h2 className="font-bold text-xl">
          Enter some more details about your form listing
        </h2>
        <Formik
          initialValues={{
            type: "",
            propertyType: "",
            username: user?.username,
            profileImage: user?.imageUrl,
          }}
          onSubmit={(values) => {
            formSubmit(values);
            publishbtn();
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="shadow-md p-8 rounded-lg ">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg text-slate-700">Rent or Sell</h2>
                    <RadioGroup
                      defaultValue="rent"
                      onValueChange={(e) => (values.type = e)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="rent" id="rent" />
                        <Label htmlFor="rent">Rent</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sell" id="sell" />
                        <Label htmlFor="rent">Sell</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg text-slate-700">select type</h2>
                    <Select onValueChange={(e) => (values.propertyType = e)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single family house">
                          Single family house
                        </SelectItem>
                        <SelectItem value="Town house">Town house</SelectItem>
                        <SelectItem value="Condo">Condo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg text-slate-700">Bedroom</h2>
                    <Input
                      type="number"
                      className="w-32"
                      placeholder="ex.2"
                      name="bedroom"
                      onChange={handleChange}
                    ></Input>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg text-slate-700">Bathroom</h2>
                    <Input
                      type="number"
                      className="w-32"
                      placeholder="ex.2"
                      name="bathroom"
                      onChange={handleChange}
                    ></Input>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg text-slate-700">built-In</h2>
                    <Input
                      type="number"
                      className="w-32"
                      placeholder="ex.1200 Sq.ft"
                      name="builtIn"
                      onChange={handleChange}
                    ></Input>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg text-slate-700">Parking</h2>
                    <Input
                      type="number"
                      className="w-32"
                      placeholder="ex.2"
                      name="parking"
                      onChange={handleChange}
                    ></Input>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg text-slate-700">Lot Size (Sq.Ft)</h2>
                    <Input
                      type="number"
                      className="w-32"
                      placeholder="ex.2"
                      name="lotSize"
                      onChange={handleChange}
                    ></Input>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg text-slate-700">Area (Sq.Ft)</h2>
                    <Input
                      type="number"
                      className="w-48"
                      placeholder="ex. 3200 Sq.ft"
                      name="area"
                      onChange={handleChange}
                    ></Input>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg text-slate-700">
                      Selling Price ($)
                    </h2>
                    <Input
                      type="number"
                      className="w-48"
                      placeholder="12000$"
                      name="price"
                      onChange={handleChange}
                    ></Input>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg text-slate-700">
                      HOA (Per Month) ($)
                    </h2>
                    <Input
                      type="number"
                      className="w-32"
                      placeholder="20$"
                      name="hoa"
                      onChange={handleChange}
                    ></Input>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg text-slate-700">Description</h2>
                    <Textarea
                      type="textarea"
                      placeholder="write description here"
                      name="description"
                      onChange={handleChange}
                      className="resize-none w-full"
                    ></Textarea>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-700">
                    Upload property Images
                  </h2>
                  <FileUpload setImages={(value) => setImages(value)} />
                </div>
                <Button type="submit" className="mt-5">
                  save and publish
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Page;
