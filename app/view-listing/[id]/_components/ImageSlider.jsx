import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";

const ImageSlider = ({ data }) => {
  return (
    <>
      <Carousel>
        <CarouselContent>
          {data.map((img, index) => (
            <CarouselItem key={index}>
              <Image
                src={img.url}
                alt="1"
                width={800}
                height={300}
                className="object-cover rounded-xl h-[300px] w-full"
              ></Image>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default ImageSlider;
