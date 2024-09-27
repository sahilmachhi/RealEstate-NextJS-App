import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterSelection = ({
  setBathroomFilter,
  setParkingFilter,
  setBedroomFilter,
  setHomeType,
}) => {
  return (
    <>
      <Select onValueChange={setBedroomFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Bedroom" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">all</SelectItem>
          <SelectItem value="1">1+</SelectItem>
          <SelectItem value="2">2+</SelectItem>
          <SelectItem value="3">3+</SelectItem>
          <SelectItem value="4">4+</SelectItem>
          <SelectItem value="5">5+</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setParkingFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Parking" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">all</SelectItem>
          <SelectItem value="1">1+</SelectItem>
          <SelectItem value="2">2+</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setBathroomFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Bathroom" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">all</SelectItem>
          <SelectItem value="1">1+</SelectItem>
          <SelectItem value="2">2+</SelectItem>
          <SelectItem value="3">3+</SelectItem>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(e) => (e === "all" ? setHomeType("") : setHomeType(e))}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Home Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="Single family house">
            Single Family House
          </SelectItem>
          <SelectItem value="Town House">Town House</SelectItem>
          <SelectItem value="Condo">Condo</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default FilterSelection;
