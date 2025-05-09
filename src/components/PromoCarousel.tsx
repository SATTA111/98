
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const PromoCarousel = () => {
  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        <CarouselItem>
          <div className="relative aspect-[2/1] w-full overflow-hidden">
            <img
              src="/lovable-uploads/d9e250a4-2f5f-4cd7-82c1-6c01a821981b.png"
              alt="Special attendance bonus"
              className="w-full h-full object-cover"
            />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="relative aspect-[2/1] w-full overflow-hidden">
            <img
              src="/lovable-uploads/b22eefde-8dda-4ed8-a01e-eb4076368792.png"
              alt="Winstreak bonus"
              className="w-full h-full object-cover"
            />
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default PromoCarousel;
