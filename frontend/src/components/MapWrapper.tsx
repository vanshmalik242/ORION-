"use client";

import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/MapComponent"), { ssr: false });

export function MapWrapper({ points }: { points: any }) {
  return <MapComponent points={points} />;
}
