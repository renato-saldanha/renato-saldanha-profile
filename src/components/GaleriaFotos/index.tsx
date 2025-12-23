import React from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { GaleriaProps } from '@/types'

const GaleriaFotos: React.FC<GaleriaProps> = ({ itens, variant = 'default' }: GaleriaProps) => {
  return (
    <div className={cn(
      'gallery-container',
      variant === 'sobre' && 'gallery-about-variant'
    )}>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
          duration: 20,
          dragFree: false,
        }}
        className="gallery-carousel"
      >
        <CarouselContent className="ml-0">
          {itens.map((item, i) => (
            <CarouselItem key={i} className="pl-0 flex-none min-w-0 basis-full">
              <div className="gallery-panel">
                {item.titulo && (
                  <div className="gallery-about-text">
                    <p className="m-0 opacity-90 rounded-lg">{item.titulo}</p>
                  </div>
                )}
                <div className={cn(
                  'gallery-image-container',
                  item?.style
                )}>
                  <Image
                    width={1200}
                    height={900}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                    alt={item.titulo || `Imagem ${i + 1}`}
                    src={item.imagem}
                    priority={i === 0}
                    quality={75}
                    className="gallery-image"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="gallery-carousel-button gallery-carousel-button-prev" />
        <CarouselNext className="gallery-carousel-button gallery-carousel-button-next" />
      </Carousel>
    </div>
  )
}

export default GaleriaFotos;