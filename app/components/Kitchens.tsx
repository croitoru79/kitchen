"use client";
import placeholder from "@images/Img-15.jpg"
import Image from "next/image"
import { useEffect, useState } from "react";
import { db } from "../lib/firebase"; 
import { collection, getDocs } from "firebase/firestore";
import { Kitchen } from "../types/Kitchen";
import Link from "next/link";
interface RecomendedProps {
    kitchens: Kitchen[];
  }
export default function Recomended({ kitchens }: RecomendedProps) {
    const[f, setf] = useState(0);

return <section className="kitchens">
    <div className="recomended__header">
        <h2 className="recomended__header-title">PROIECTELE NOASTRE</h2>
        <p className="recomended__header-text">Deja peste 2000 de bucătării finisate au fost livrate și instalate în casele clienților noștri și în continuare menținem relații bune.</p>
    </div>
    <div className="kitchens__list">
    {kitchens.map(kitchen => (
                    <Link href={`/preview/${kitchen.title}`} className="kitchens__item" key={kitchen.title}>
                        <Image
                            src={kitchen.imageUrls[kitchen.imageUrls.length - 1]}
                            alt={kitchen.title}
                            width={1400} 
                            height={500}
                            unoptimized
                        />
                        <h3 className="kitchens__item-name">{kitchen.title}</h3>
                    </Link>
                ))}
    </div>

</section>

}
