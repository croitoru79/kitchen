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
    url: "https://croitoru.md/showrooms",
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

export default function Showroom() {
    return(
        <div>
            <Pages_Intro/>
            <Showrooms/>
            <About/>
        </div>
    );
}
