import Intro from "./components/Intro.jsx";
import Recomended from "./components/Recomended";
import Info from "./components/Info.jsx";
import Testimonials from "./components/Testimonials.jsx";
import About from "./components/About.jsx";
import { db } from "@//lib/firebase"; 
import { collection, getDocs } from "firebase/firestore"; 
import type { Metadata } from "next";
import type { Kitchen } from "@//types/Kitchen";
import { getKitchensData } from "./actions/get_kitchens";


export const metadata: Metadata = {
  title: "Bucătării Croitoru | Acasă",
  description: "Bucătării Croitoru - Bucătării la comandă cu design italian",
  keywords: "bucătării, mobilă, design, italian, comandă, croitoru",
  openGraph: {
    title: "Bucătării Croitoru | Acasă",
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

export default async function Home() {  
  const { kitchens } = await getKitchensData(); 
  return (
    <div className="app">
      <Intro />
      <Recomended kitchens={kitchens} />
      <Info />
      <Testimonials />
      <About />
    </div>
  );
}
