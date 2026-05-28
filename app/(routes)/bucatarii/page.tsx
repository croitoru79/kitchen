import About from "@//components/About";
import Kitchens from "@//components/Kitchens";
import Pages_Intro from "@//components/Pages_Intro";
import { getKitchensData } from "@//actions/get_kitchens";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bucătării Croitoru | Bucătării",
  description: "Bucătării Croitoru - Bucătării la comandă cu design italian",
  keywords: "bucătării, mobilă, design, italian, comandă, croitoru",
  openGraph: {
    title: "Bucătării Croitoru | Bucătării",
    description: "Bucătării Croitoru - Bucătării la comandă cu design italian",
    url: "https://croitoru.md/bucatarii",
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

export default async function Bucatarii() {
  const { kitchens } = await getKitchensData(); 
  return (
    <div className="app">
      <Pages_Intro />
      <Kitchens kitchens={kitchens}/>
      <About />
    </div>
  );
}
