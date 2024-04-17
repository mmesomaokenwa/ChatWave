'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from 'next/image'

const CardCarousel = ({ postMedia, className}) => {
  const [api, setApi] = useState()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
 
  useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api])
  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        className={`w-full h-72 lg:h-[300px] rounded-xl overflow-hidden ${className}`}
      >
        <CarouselContent>
          {postMedia?.map((media, index) => (
            <CarouselItem key={index}>
              <Card className="rounded-xl">
                <CardContent className="flex aspect-square items-center justify-center p-0">
                  {media.type.includes("image") ? (
                    <Image
                      src={media.url || URL.createObjectURL(media)}
                      alt={media.url}
                      className="w-full h-full object-cover"
                      width={500}
                      height={500}
                    />
                  ) : (
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      playsInline
                    >
                      <source src={media.url || URL.createObjectURL(media)} />
                    </video>
                  )}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center gap-2 absolute top-[90%] right-0 left-0 z-50">
        {count > 1 &&
          Array.from({ length: count }).map((file, index) => (
            <div
              key={index}
              className={`size-2 rounded-full transition ${
                index === current - 1 ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
      </div>
    </div>
  );
}

export default CardCarousel