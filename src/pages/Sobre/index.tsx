import Img1 from '../../../public/assets/eu.png'
import Img2 from '../../../public/assets/parceira.jpeg'
import Link from 'next/link'
import { motion } from 'framer-motion'
import GaleriaFotos from '@/components/GaleriaFotos'
import { GaleriaItem } from '@/types'
import { Button } from '@/components/ui/button'

const galeriaItens: GaleriaItem[] = [
  {
    titulo: `Natural de Cuiabá-MT, cresci em um bairro periférico onde conheci o skate no início da adolescência e sempre envolvido com jogos de console e fliperama,
            aos 15 anos conheci a lanhouse e os jogos eletrônicos e fiquei encantado, com isso fui aprendendo mais sobre os componentes internos, seus funcionamentos e como identificar prévios problemas.
            Já com 17 anos, comecei a dar manutenção em computadores e notebooks e com 18 anos abri minha empresa de manuteção de computadores e rede.`,
    imagem: Img1,
  },
  {
    titulo: `Formado em Análise e Desenvolvimento de Sistemas em 2018, desde 2015 desenvolvendo soluções em Delphi pelas empresas em que passei. 
            Com Delphi, ReactNative e ReactJS, desenvolvo soluções englobando as necessidade das três partes: 
            Desktop, Mobile e Web. Foco em flexibilidade e qualidade na entrega do produto priorizando sempre a satisfação do cliente.`,
    imagem: Img2,
  }
]

export default function Sobre() {
  return (
    <section className="pt-8 pb-6 md:pt-10 md:pb-8 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="gradient-text">Sobre Mim</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card p-2 md:p-3 mb-4">
            <GaleriaFotos itens={galeriaItens} variant="sobre" />
          </div>

          
        </motion.div>
      </div>
    </section>
  )
}