"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import Link from "next/link"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const banners = [
    {
        href: "https://ibb.co/yFfv9cfT",
        src: "https://i.ibb.co/JjB61wBL/Gemini-Generated-Image-ds5q8ds5q8ds5q8d-1.png",
        alt: "Promotional Banner",
        hint: "promotional banner"
    },
    {
        href: "https://ibb.co/fzkKH1pS",
        src: "https://i.ibb.co/YFcKhRkW/Gemini-Generated-Image-t6t2igt6t2igt6t2.png",
        alt: "Modern Living Room",
        hint: "modern living room"
    },
    {
        href: "https://ibb.co/B5K3py79",
        src: "https://i.ibb.co/YFTQCcKx/Gemini-Generated-Image.png",
        alt: "Luxury Kitchen",
        hint: "luxury kitchen"
    }
]

export function HomeCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {banners.map((banner, index) => (
          <CarouselItem key={index}>
            <Link href={banner.href} target="_blank">
                <div className="relative aspect-video w-full">
                    <Image
                    src={banner.src}
                    alt={banner.alt}
                    fill
                    className="rounded-lg object-cover"
                    data-ai-hint={banner.hint}
                    />
                </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
