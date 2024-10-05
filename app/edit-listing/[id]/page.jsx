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
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";

function Page({ params }) {
  let postId = params.id;
  const [images, setImages] = useState([]);
  const router = useRouter();
  const [listing, setlisting] = useState({});

  const initialValues = {
    area: listing?.area,
    bathroom: listing?.bathroom,
    bedroom: listing?.bedroom,
    builtIn: listing?.builtIn,
    description: listing?.description,
    hoa: listing?.hoa,
    lotSize: listing?.lotSize,
    parking: listing?.parking,
    price: listing?.price,
    propertyType: listing?.propertyType,
    type: listing?.type,
    listingImages: listing?.listingImages,
  };

  // const values = {
  //   area: listing?.area,
  //   bathroom: listing?.bathroom,
  //   bedroom: listing?.bedroom,
  //   builtIn: listing?.builtIn,
  //   description: listing?.description,
  //   hoa: listing?.hoa,
  //   lotSize: listing?.lotSize,
  //   parking: listing?.parking,
  //   price: listing?.price,
  //   propertyType: listing?.propertyType,
  //   type: listing?.type,
  // };

  const getPost = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*, listingImages(*)")
      .eq("id", params.id);
    if (error) {
      return console.log(error);
    }
    setlisting(data[0]);
    console.log(data[0]);
    setImages(data[0].listingImages);
    // set data to listing object
  };

  const formSubmit = async (formValue) => {
    console.log(formValue);

    // const { error: imageReplaceError } = await supabase
    //   .from("listingImages")
    //   .delete()
    //   .insert([
    //     { url: publicUrl, image_id: postId, imageName: imageData.path },
    //   ]);

    const inputData = formValue;

    // delete inputData.listingImages;

    console.log(inputData);
    const { error: errorUpdateListing } = await supabase
      .from("listing")
      .update(inputData)
      .eq("id", postId)
      .select();

    if (errorUpdateListing) {
      console.log(errorUpdateListing);
      return;
    }

    const ImageArray = formValue.listingImages;
    console.log(ImageArray);
    console.log(formValue);

    for (const image of ImageArray) {
      const fileName = Date.now().toString();
      const { data: imageData, error: imageUploadError } =
        await supabase.storage.from("listingImages").upload(fileName, image, {
          cacheControl: "3600",
          upsert: false,
        });
      if (imageUploadError) {
        console.log(imageUploadError);
        continue;
      }
    }

    //

    //   const { data } = supabase.storage
    //     .from("listingImages")
    //     .getPublicUrl(imageData.path);

    //   const publicUrl = data.publicUrl;

    //   const { error: imageAssignError } = await supabase
    //     .from("listingImages")
    //     .insert([
    //       { url: publicUrl, image_id: postId, imageName: imageData.path },
    //     ])
    //     .eq("id", 1);
    //   if (imageAssignError) {
    //     console.log(imageAssignError);
    //     return;
    //   }
    //   return;
    // }
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

  const publishbtn = async (e) => {
    console.log("publish btn called");
    e.preventDefault();
    const { error } = await supabase
      .from("listing")
      .update({ active: true })
      .eq("id", postId)
      .select();
    if (error) console.log(error);

    console.log("function called");
    router.push("/");
  };

  return (
    <>
      <div className="self-start text-left w-full px-10">
        <h2 className="font-bold text-xl">
          Enter some more details about your form listing
        </h2>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            formSubmit(values);
          }}
          enableReinitialize
        >
          {({ handleChange, handleSubmit, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <div className="shadow-md p-8 rounded-lg ">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg text-slate-700">Rent or Sell</h2>
                    <RadioGroup
                      defaultValue={initialValues.type}
                      onValueChange={(e) =>
                        handleChange({ target: { name: "type", value: e } })
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="rent" id="rent" />
                        <Label htmlFor="rent">Rent</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sell" id="sell" />
                        <Label htmlFor="sell">Sell</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg text-slate-700">select type</h2>
                    <Select
                      onValueChange={(e) =>
                        handleChange({
                          target: {
                            name: "propertyType",
                            value: e,
                          },
                        })
                      }
                      defaultValue={initialValues.propertyType}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue
                          placeholder={
                            listing.propertyType
                              ? listing.propertyType
                              : "Select Property type"
                          }
                        />
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
                      defaultValue={initialValues.bedroom}
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
                      defaultValue={initialValues.bathroom}
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
                      defaultValue={initialValues.builtIn}
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
                      defaultValue={initialValues.parking}
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
                      defaultValue={initialValues.lotSize}
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
                      defaultValue={initialValues.area}
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
                      defaultValue={initialValues.price}
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
                      defaultValue={initialValues.hoa}
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
                      defaultValue={initialValues.description}
                      className="resize-none w-full"
                    ></Textarea>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-700">
                    Upload property Images
                  </h2>
                  <FileUpload
                    setImages={setImages}
                    images={images}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                </div>
                <div className="flex gap-5">
                  <Button type="submit" className="mt-5">
                    save
                  </Button>
                  <Button
                    type="button"
                    className="mt-5"
                    onClick={(e) => {
                      publishbtn(e);
                    }}
                  >
                    publish now
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Page;
