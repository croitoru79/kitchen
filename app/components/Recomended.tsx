"use client";
import placeholder from "@images/Img-15.jpg";
import Image from "next/image";
import Link from "next/link";
import type { Kitchen } from "@//types/Kitchen";

interface RecomendedProps {
  kitchens: Kitchen[];
}

export default function Recomended({ kitchens }: RecomendedProps) {

  return (
    <section className="recomended">
      <div className="recomended__header">
        <h2 className="recomended__header-title">PROIECTELE NOASTRE</h2>
        <p className="recomended__header-text">
          Deja peste 5000 de bucătării finisate au fost livrate și instalate în
          casele clienților noștri și în continuare menținem relații bune.
        </p>
      </div>
      <div className="recomended__list">
      {kitchens && kitchens.length > 0 && kitchens
  .filter((kitchen) => kitchen.favourite)
  .map((kitchen) => (
    <div className="recomended__item" key={kitchen.id}>
      <Link href={`/preview/${kitchen.title}`} key={kitchen.title}>
        <Image
          src={kitchen.imageUrls[kitchen.imageUrls.length - 1]}
          alt={kitchen.title}
          width={1400}
          height={500}
          unoptimized
        />
      </Link>
      <h3 className="recomended__item-name">{kitchen.title}</h3>
    </div>
  ))}
      </div>
    </section>
  );
}
