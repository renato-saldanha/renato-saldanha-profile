import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from '../../components/DotButton'
import Image from 'next/image'
import { motion } from 'framer-motion'

import styles from './styles.module.css'
import {  GaleriaProps } from '@/types'

const GaleriaFotos: React.FC<GaleriaProps> = ({itens} : GaleriaProps) => {
  const options: EmblaOptionsType = {
    align: 'start',
    loop: true,
    skipSnaps: false
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  return (
    <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {
        x: -150,
        opacity: 0
      },
      visible: {
        x: 10,
        opacity: 1,
        transition: {
          delay: .5
        }
      }
    }}
    className={styles.container}>

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
                  <div className={item.style}>
                    <Image                   
                      width={800}
                      height={600}           
                      sizes="(max-width: 480px) 100vw, (max-width: 768px) 90vw, (max-width: 1200px) 50vw, 40vw" 
                      alt={`Imagem ${i + 1}`} 
                      src={item.imagem}
                      style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '600px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        margin: '1px',
                      }}
                      priority={i === 0}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.embla__controls}>
          <div className={styles.embla__dots}>
            {scrollSnaps.map((_, i) => (
              <DotButton
                key={i}
                onClick={() => onDotButtonClick(i)}
                className={i === selectedIndex ? styles.embla__dot__selected : styles.embla__dot}
              />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default GaleriaFotos;