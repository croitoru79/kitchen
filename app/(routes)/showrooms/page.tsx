import About from '@//components/About';
import Showrooms from '@//components/Showrooms';
import Pages_Intro from '@//components/Pages_Intro';


import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Bucătării Croitoru | Showroom-uri",
  description: "Bucătării Croitoru - Bucătării la comandă cu design italian",
  keywords: "bucătării, mobilă, design, italian, comandă, croitoru",
  openGraph: {
    title: "Bucătării Croitoru | Showroom-uri",
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

export default function Showroom() {
    return(
        <div>
            <Pages_Intro/>
            <Showrooms/>
            <About/>
        </div>
    );
}
