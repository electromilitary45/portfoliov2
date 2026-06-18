// src/components/ui/ImageCarousel.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import type { BlogPostImage } from "@/features/blog/blog-post.type";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
    images: BlogPostImage[];
    title: string;
    priority?: boolean;
}

export function ImageCarousel({ images, title, priority = true }: ImageCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    // Callback que se ejecuta cuando el carrusel cambia de slide
    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        // Obtener la lista de puntos (snaps) para los indicadores
        setScrollSnaps(emblaApi.scrollSnapList());

        // Suscribirse al evento 'select' (NO llamar a onSelect() directamente)
        emblaApi.on("select", onSelect);

        // Limpieza: desuscribirse al desmontar
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    if (images.length === 0) return null;

    return (
        <div className="relative">
            {/* Carrusel */}
            <div
                className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100"
                ref={emblaRef}
            >
                <div className="flex">
                    {images.map((image, index) => (
                        <div
                            key={image.order}
                            className="relative min-w-0 flex-[0_0_100%] aspect-[16/9]"
                        >
                            <Image
                                src={image.url}
                                alt={image.alt || `${title} - Imagen ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(min-width: 768px) 768px, 100vw"
                                priority={priority && index === 0}
                            />
                            {image.alt && (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white text-sm">
                                    {image.alt}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Flechas de navegación (solo si hay más de una imagen) */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={scrollPrev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-neutral-800 shadow-md backdrop-blur transition hover:bg-white hover:scale-105 disabled:opacity-30"
                        disabled={selectedIndex === 0}
                        aria-label="Imagen anterior"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-neutral-800 shadow-md backdrop-blur transition hover:bg-white hover:scale-105 disabled:opacity-30"
                        disabled={selectedIndex === images.length - 1}
                        aria-label="Imagen siguiente"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </>
            )}

            {/* Indicadores (puntos) */}
            {images.length > 1 && (
                <div className="mt-4 flex justify-center gap-2">
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => emblaApi?.scrollTo(index)}
                            className={`h-2 w-2 rounded-full transition ${index === selectedIndex ? "bg-neutral-800" : "bg-neutral-300"
                                }`}
                            aria-label={`Ir a imagen ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}