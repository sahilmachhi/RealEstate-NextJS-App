// import { Button } from "@/components/ui/button";
// import Image from "next/image";
import Provider from "./Provider";
// import { Children } from "react";
import Header from './_components/Header'
import ListingMapView from "./_components/ListingMapView";
export default function Home({ children }) {
  return (
    <>
      <ListingMapView />
    </>
  );
}
