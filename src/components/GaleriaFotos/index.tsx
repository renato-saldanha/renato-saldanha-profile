import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { GaleriaProps } from '@/types'

const DEFAULT_BLUR =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HwAFgwJ/lYtKuwAAAABJRU5ErkJggg==';

const GaleriaFotos: React.FC<GaleriaProps> = ({ itens, variant = 'default', onImageClick }: GaleriaProps) => {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideCount, setSlideCount] = useState(itens.length)

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap())
      setSlideCount(api.scrollSnapList().length)
    }

    onSelect()
    api.on('select', onSelect)
    api.on('reInit', onSelect)

    return () => {
      api.off('select', onSelect)
      api.off('reInit', onSelect)
    }
  }, [api])

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
        setApi={setApi}
        className="gallery-carousel"
      >
        <CarouselContent className="ml-0">
          {itens.map((item, i) => (
            <CarouselItem 
              key={i} 
              className="pl-0 flex-none min-w-0 basis-full"
              aria-label={`Slide ${i + 1} de ${itens.length}`}
            >
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
                    placeholder="blur"
                    blurDataURL={DEFAULT_BLUR}
                    className={cn(
                      "gallery-image",
                      onImageClick && "cursor-zoom-in hover:opacity-90 transition-opacity"
                    )}
                    onClick={onImageClick ? () => onImageClick(String(item.imagem)) : undefined}
                    role={onImageClick ? "button" : undefined}
                    aria-label={onImageClick ? `Ampliar slide ${i + 1}` : undefined}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="gallery-carousel-button gallery-carousel-button-prev" />
        <CarouselNext className="gallery-carousel-button gallery-carousel-button-next" />
      </Carousel>
      {slideCount > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: slideCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                i === currentSlide ? "bg-primary w-6" : "bg-secondary hover:bg-primary/50"
              )}
              aria-label={`Ir para slide ${i + 1}`}
              aria-pressed={i === currentSlide}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default GaleriaFotos;