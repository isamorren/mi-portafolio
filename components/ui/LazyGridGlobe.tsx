"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const GridGlobe = dynamic(() => import("./GridGlobe"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-pulse">
        <div className="w-32 h-32 bg-[#6667AB]/20 rounded-full" />
      </div>
    </div>
  ),
});

export default function LazyGridGlobe() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse">
          <div className="w-32 h-32 bg-[#6667AB]/20 rounded-full" />
        </div>
      </div>
    }>
      <GridGlobe />
    </Suspense>
  );
}