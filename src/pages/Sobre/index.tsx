import styles from './styles.module.css'
import Img1 from '../../../public/assets/eu.png'
import Img2 from '../../../public/assets/parceira.jpeg'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import GaleriaFotos from '@/components/GaleriaFotos'
import { GaleriaItem, GaleriaProps } from '@/types'

const galeriaItens: GaleriaItem[] = [
  {
    titulo: `Natural de Cuiabá-MT, cresci em um bairro periférico onde conheci o skate no início da adolescência e sempre envolvido com jogos de console e fliperama,
            aos 15 anos conheci a lanhouse e os jogos eletrônicos e fiquei encantado, com isso fui aprendendo mais sobre os componentes internos, seus funcionamentos e como identificar prévios problemas.
            Já com 17 anos, comecei a dar manutenção em computadores e notebooks e com 18 anos abri minha empresa de manuteção de computadores e rede.`,
    imagem: Img1,
    style: styles.containerImg1
  },
  {
    titulo: `Formado em Análise e Desenvolvimento de Sistemas em 2018, desde 2015 desenvolvendo soluções em Delphi pelas empresas em que passei. 
            Com Delphi, ReactNative e ReactJS, desenvolvo soluções englobando as necessidade das três partes: 
            Desktop, Mobile e Web. Foco em flexibilidade e qualidade na entrega do produto priorizando sempre a satisfação do cliente.`,
    imagem: Img2,
    style: styles.containerImg2
  }
]

export default function Sobre() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          x: -350,
          opacity: 0
        },
        visible: {
          x: 0,
          opacity: 1,
          transition: {
            delay: .4
          }
        }
      }}
      className={styles.container}>

      <GaleriaFotos itens={galeriaItens} />
      <p className={styles.contato}>
        <br /> Estou sempre aberto a novas oportunidades e desafios, entre em <Link href="/Contato">Contato</Link> comigo!
      </p>

    </motion.div>
  )
}