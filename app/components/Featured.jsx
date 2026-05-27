"use client";
import Image from "next/image"
import { useEffect, useState } from "react";
import { db } from "../lib/firebase"; 
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
export default function Featured() {
    const [kitchens, setKitchens] = useState([]);

    useEffect(() => {
        const fetchKitchens = async () => {
            try {
                const kitchensCollection = collection(db, "kitchen");
                const kitchensSnapshot = await getDocs(kitchensCollection);
                const kitchensList = kitchensSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setKitchens(kitchensList);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        };

        fetchKitchens();
    }, []);
return <section className="info">
    <div className="info__top">
        <div className="info__header">
            <h2 className="info__header-title">CONFIGURARI POPULARE</h2>
            <p className="info__header-text">Pentru cele mai noi noutați, urmăriți-ne în <a href="">Instagram</a></p>
        </div>
    </div>
    <div className="kitchens__list featured">
    {kitchens.slice(0, 2).map(kitchen => (
                    <Link href={`/preview/${kitchen.title}`} className="kitchens__item">
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
