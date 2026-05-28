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
    url: "https://croitoru.md/franke",
    siteName: "Bucătării Croitoru",
    locale: "ro_MD",
    type: "website",
    images: [
      {
        url: "https://croitoru.md/images/og-image.png",
        width: 1200,
        height: 630,
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

