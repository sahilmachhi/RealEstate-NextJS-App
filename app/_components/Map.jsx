"use client";

import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

export default function Map() {
  const api = process.env.MAP_TILER_API_KEY;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const india = { lng: 77.1025, lat: 23.5741 };
  const [zoom] = useState(3);
  maptilersdk.config.apiKey = "Zg3flKpadeM041v2Cxrr";

  console.log(api);

  useEffect(() => {
    if (map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [india.lng, india.lat],
      zoom: zoom,
    });
  }, [india.lng, india.lat, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
