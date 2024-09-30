"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

function FileUpload({ setImages, images }) {
  // console.log(images);
  // // console.log(imageArray);
  let [imagePreview, setImagePreview] = useState([]);

  // useEffect(() => {
  // if (images) {
  // // console.log("usestate called");
  // setImagePreview(images);
  // }
  // }, []);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    // console.log(`its image file ${files}`);

    const previews = files.map((file) => {
      return URL.createObjectURL(file);
    });
    // console.log(previews);
    setImagePreview(previews);
  };
  return (
    <>
      <div>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              multiple
              className="hidden"
              onChange={handleChange}
              name="image"
            />
          </label>
        </div>
        <div className="grid grid-cols-4">
          {imagePreview.length < 1
            ? images.map((image, index) => {
                return (
                  <div key={index}>
                    <Image
                      src={image.url ? image.url : image}
                      width={150}
                      height={150}
                      alt={image.imageName ? image.imageName : image.name}
                      className="rounded-xl bg-cover"
                    />
                  </div>
                );
              })
            : null}
          {imagePreview.length > 0
            ? imagePreview.map((image, index) => {
                return (
                  <div key={index}>
                    <Image
                      src={image.url ? image.url : image}
                      width={150}
                      height={150}
                      alt={image.imageName ? image.imageName : image.name}
                      className="rounded-xl bg-cover"
                    />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
}

export default FileUpload;
