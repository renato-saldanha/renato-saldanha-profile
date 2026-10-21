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
import { DEFAULT_BLUR } from '@/constants'
import { deveCarregarImagem } from '@/lib/gallery'
import { cn } from '@/lib/utils'
import { GaleriaProps } from '@/types'

const GaleriaFotos: React.FC<GaleriaProps> = ({ itens, variant = 'default', onImageClick }: GaleriaProps) => {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideCount, setSlideCount] = useState(itens.length)

  // Na variante "sobre" o texto é o conteúdo do slide, ao lado da foto. Na padrão vira
  // legenda abaixo do carrossel, para as setas centralizarem só na imagem.
  const textoNoSlide = variant === 'sobre'
  const temLegenda = !textoNoSlide && itens.some(item => item.titulo)
  const loop = itens.length > 1

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
      {/* Primeiro filho de propósito: é absoluto (sr-only) e não pode ser o :last-child do CSS do modal */}
      {temLegenda && <p className="sr-only" aria-live="polite">{itens[currentSlide]?.titulo}</p>}
      <Carousel
        opts={{
          align: 'start',
          loop,
          duration: 20,
          dragFree: false,
        }}
        setApi={setApi}
        className="gallery-carousel"
      >
        <CarouselContent className="gallery-track ml-0" viewportClassName="gallery-viewport">
          {itens.map((item, i) => {
            const imagem = (
              <Image
                fill
                sizes={textoNoSlide ? '(max-width: 768px) 100vw, 450px' : '(max-width: 768px) 100vw, 1000px'}
                alt={item.titulo || `Imagem ${i + 1}`}
                src={item.imagem}
                priority={i === 0}
                loading={i === 0 ? undefined : deveCarregarImagem(i, currentSlide, itens.length, loop) ? 'eager' : 'lazy'}
                quality={75}
                placeholder="blur"
                blurDataURL={typeof item.imagem === 'string' ? DEFAULT_BLUR : undefined}
                className="gallery-image"
              />
            )

            return (
              <CarouselItem
                key={i}
                className="pl-0 flex flex-col"
                aria-label={`Slide ${i + 1} de ${itens.length}`}
              >
                <div className="gallery-panel">
                  {textoNoSlide && item.titulo && (
                    <div className="gallery-about-text">
                      <p className="m-0 opacity-90">{item.titulo}</p>
                    </div>
                  )}
                  <div className={cn('gallery-image-container', item.style)}>
                    {onImageClick ? (
                      <button
                        type="button"
                        className="gallery-zoom-button"
                        onClick={() => onImageClick(item)}
                        aria-label={`Ampliar imagem: ${item.titulo || `slide ${i + 1}`}`}
                      >
                        {imagem}
                      </button>
                    ) : imagem}
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        {loop && (
          <>
            <CarouselPrevious className="gallery-carousel-button gallery-carousel-button-prev" />
            <CarouselNext className="gallery-carousel-button gallery-carousel-button-next" />
          </>
        )}
      </Carousel>
      {temLegenda && (
        <div className="gallery-caption" aria-hidden="true">
          {itens.map((item, i) => (
            <p key={i} className={cn(i !== currentSlide && 'invisible')}>{item.titulo}</p>
          ))}
        </div>
      )}
      {slideCount > 1 && (
        <div className="gallery-dots">
          {Array.from({ length: slideCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => api?.scrollTo(i)}
              className="group flex h-6 w-6 items-center justify-center"
              aria-label={`Ir para slide ${i + 1}`}
              aria-current={i === currentSlide ? 'true' : undefined}
            >
              <span className={cn(
                'h-2 rounded-full transition-all',
                i === currentSlide ? 'w-6 bg-primary' : 'w-2 bg-secondary group-hover:bg-primary/50'
              )} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default GaleriaFotos;
