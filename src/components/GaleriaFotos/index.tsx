import React, { useCallback, useEffect, useState } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from '../../components/DotButton'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import styles from './styles.module.css'
import { GaleriaProps } from '@/types'

const GaleriaFotos: React.FC<GaleriaProps> = ({ itens }: GaleriaProps) => {
  const options: EmblaOptionsType = {
    align: 'start',
    loop: true,
    skipSnaps: false,
    duration: 15,
    dragFree: false
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev()
    }
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext()
    }
  }, [emblaApi])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    // Com loop ativo, sempre permitir scroll (loop infinito)
    if (options.loop) {
      setCanScrollPrev(true)
      setCanScrollNext(true)
    } else {
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    }
  }, [options.loop])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)

    // Usar 'settle' para atualizar estado apenas após a transição completar
    // Isso evita atualizações durante a animação do loop e previne o reset
    const handleSettle = () => {
      // Delay reduzido para transição mais rápida
      setTimeout(() => {
        onSelect(emblaApi)
      }, 20)
    }

    // Usar 'select' apenas para atualizações imediatas (sem loop)
    const handleSelect = () => {
      if (!options.loop) {
        onSelect(emblaApi)
      }
    }

    emblaApi
      .on('settle', handleSettle)
      .on('select', handleSelect)
      .on('reInit', onSelect)

    return () => {
      emblaApi.off('settle', handleSettle)
      emblaApi.off('select', handleSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect, options.loop])

  // Navegação por teclado (apenas quando o carrossel está em foco)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Só navega se não estiver em um input, textarea ou elemento editável
      const target = event.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        scrollNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [scrollPrev, scrollNext])

  return (
    <div
      className={styles.container}
      role="region"
      aria-label="Galeria de fotos"
    >
      <section className={styles.embla}>
        <div className={styles.embla__viewport} ref={emblaRef}>
          <div className={styles.embla__container}>
            {itens.map((item, i) => (
              <div className={styles.embla__slide} key={i}>
                <div className={styles.containerPainel}>
                  {item.titulo && (
                    <div className={styles.containerSobre}>
                      <p>
                        {item.titulo}
                      </p>
                    </div>
                  )}
                  <div className={item ? item.style : styles.embla__slide__number}>
                    <Image
                      width={800}
                      height={600}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                      alt={item.titulo || `Imagem ${i + 1}`}
                      src={item.imagem}
                      style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '600px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                      priority={i === 0}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      quality={75}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botões de navegação */}
        <div className={styles.embla__navigation}>
          <button
            className={styles.embla__button}
            onClick={scrollPrev}
            disabled={options.loop ? false : !canScrollPrev}
            aria-label="Imagem anterior"
            type="button"
          >
            <ChevronLeft className={styles.embla__button__icon} />
          </button>
          <button
            className={styles.embla__button}
            onClick={scrollNext}
            disabled={options.loop ? false : !canScrollNext}
            aria-label="Próxima imagem"
            type="button"
          >
            <ChevronRight className={styles.embla__button__icon} />
          </button>
        </div>
      </section>
    </div>
  )
}

export default GaleriaFotos;