'use client'

import React, { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from 'next/image'
import { Card, CardBody } from '@nextui-org/react';
import { cn } from '@/lib/utils';

const CardCarousel = ({ postMedia, className, size, radius}) => {
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
        className={cn(
          `w-full h-72 lg:h-[300px] rounded-xl overflow-hidden ${radius === 'none' && 'rounded-none'} ${className} ${size}`
        )}
      >
        <CarouselContent>
          {postMedia?.map((media, index) => (
            <CarouselItem key={index}>
              <Card radius={radius}>
                <CardBody className="flex items-center justify-center p-0 overflow-visible aspect-auto">
                  {media.type.includes("image") ? (
                    <Image
                      src={media.url || URL.createObjectURL(media)}
                      alt={media.url}
                      className={cn(`w-full h-full object-cover ${size}`)}
                      width={500}
                      height={500}
                    />
                  ) : (
                    <video
                      className={cn(`w-full h-full object-cover ${size}`)}
                      autoPlay
                      loop
                      playsInline
                    >
                      <source src={media.url || URL.createObjectURL(media)} />
                    </video>
                  )}
                </CardBody>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 z-10 invisible lg:visible" />
        <CarouselNext className="absolute right-4 z-10 invisible lg:visible" />
      </Carousel>
      <div className="flex justify-center gap-2 absolute top-[90%] right-0 left-0 z-10">
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