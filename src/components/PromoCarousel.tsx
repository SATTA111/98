
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const PromoCarousel = () => {
  const promoImages = [
    {
      src: "/lovable-uploads/3228c377-b647-4185-a168-bb6876d1b82b.png",
      alt: "Become an official agent"
    },
    {
      src: "/lovable-uploads/6be490f3-b469-4057-a293-11b75243bb8c.png",
      alt: "Official channel"
    },
    {
      src: "/lovable-uploads/b22eefde-8dda-4ed8-a01e-eb4076368792.png",
      alt: "Winstreak bonus"
    }
  ];

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {promoImages.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative aspect-[2.5/1] w-full overflow-hidden rounded-lg">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default PromoCarousel;
