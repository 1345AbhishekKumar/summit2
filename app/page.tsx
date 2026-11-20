import { Navbar } from "@/app/components/Navbar";
import { Hero } from "@/app/components/Hero";
import { Editorial } from "@/app/components/Editorial";
import dynamic from "next/dynamic";

// Lazy load below-the-fold components for performance
const HorizontalGallery = dynamic(() => import("@/app/components/HorizontalGallery").then(mod => mod.HorizontalGallery));
const Creativity = dynamic(() => import("@/app/components/Creativity").then(mod => mod.Creativity));
const DeconstructedArchitecture = dynamic(() => import("@/app/components/DeconstructedArchitecture").then(mod => mod.DeconstructedArchitecture));
const KineticReassembly = dynamic(() => import("@/app/components/KineticReassembly").then(mod => mod.KineticReassembly));
const DynamicSpatialGrid = dynamic(() => import("@/app/components/DynamicSpatialGrid").then(mod => mod.DynamicSpatialGrid));
const MorphingGeometry = dynamic(() => import("@/app/components/MorphingGeometry").then(mod => mod.MorphingGeometry));
const FluidTopography = dynamic(() => import("@/app/components/FluidTopography").then(mod => mod.FluidTopography));
const Amenities = dynamic(() => import("@/app/components/Amenities").then(mod => mod.Amenities));
const Floorplans = dynamic(() => import("@/app/components/Floorplans").then(mod => mod.Floorplans));
const Footer = dynamic(() => import("@/app/components/Footer").then(mod => mod.Footer));

export default function Page() {
  return (
    <main className="min-h-screen bg-[#F5F5F0] text-[#1A1A1A] font-sans selection:bg-[#1A1A1A] selection:text-[#F5F5F0]">
      <Navbar />
      <Hero />
      <Editorial />
      <HorizontalGallery />
      <Creativity />
      <DeconstructedArchitecture />
      <KineticReassembly />
      <DynamicSpatialGrid />
      <MorphingGeometry />
      <FluidTopography />
      <Amenities />
      <Floorplans />
      <Footer />
    </main>
  );
}
