import About from "@//components/About";
import franke from "@images/franke.webp"
import Franke_List from "@//components/Franke_List";
import Image from "next/image"
import Info from "@//components/Info.jsx";
import { getKitchensData } from "@//actions/get_kitchens";
import type { Metadata } from "next";
import Recomended from "@//components/Recomended";


export const metadata: Metadata = {
  title: "Bucătării Croitoru | Franke",
  description: "Bucătării Croitoru - Bucătării la comandă cu design italian",
  keywords: "bucătării, mobilă, design, italian, comandă, croitoru",
  openGraph: {
    title: "Bucătării Croitoru | Franke",
    description: "Bucătării Croitoru - Bucătării la comandă cu design italian",
    images: [
      {
        url: "/images/og-image.png",
        width: 800,
        height: 600,
        alt: "Bucătării Croitoru",
      },
    ],
  },
};
export default async function Showroom() {
  const { kitchens } = await getKitchensData(); 
  return(
    <div className="app">
      <Image className="franke__intro" alt="Croitoru | Franke" src={franke}/>
      <Franke_List/>
      <Info />
      <Recomended kitchens={kitchens} />
      <About />
    </div>
  );
}

