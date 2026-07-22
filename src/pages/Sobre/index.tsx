import Img1 from '../../../public/assets/eu.png'
import Img2 from '../../../public/assets/parceira.jpeg'
import Link from 'next/link'
import { motion } from 'framer-motion'
import GaleriaFotos from '@/components/GaleriaFotos'
import { GaleriaItem } from '@/types'
import { Button } from '@/components/ui/button'
import SEO from '@/components/SEO'

const galeriaItens: GaleriaItem[] = [
  {
    titulo: `Natural de Cuiabá-MT, cresci em um bairro periférico onde conheci o skate no início da adolescência e sempre envolvido com jogos de console e fliperama,
            aos 15 anos conheci a lanhouse e os jogos eletrônicos e fiquei encantado, com isso fui aprendendo mais sobre os componentes internos, seus funcionamentos e como identificar prévios problemas.
            Já com 17 anos, comecei a dar manutenção em computadores e notebooks e com 18 anos abri minha empresa de manuteção de computadores e rede.`,
    imagem: Img1,
  },
  {
    titulo: `Formado em Análise e Desenvolvimento de Sistemas em 2018, desde 2015 desenvolvendo soluções robustas. 
            Desenvolvo soluções completas e escaláveis que integram IA para otimizar processos, automatizar tarefas e gerar valor real ao negócio. 
            Foco em engenharia de software, qualidade na entrega e inovação tecnológica, priorizando sempre o produto e serviço.`,
    imagem: Img2,
  }
]

export default function Sobre() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://renatosaldanha.dev';
  
  return (
    <>
      <SEO
        title="Sobre Mim"
        description="Conheça GenIA - Engenheiro de Softwares. Natural de Cuiabá-MT, com experiência em Delphi, React, React Native e soluções de IA. Formado em Análise e Desenvolvimento de Sistemas."
        keywords="Sobre GenIA, Desenvolvedor Cuiabá, Programador Mato Grosso, Experiência desenvolvimento, Delphi, React, React Native, Engenheiro de Software"
        url={`${baseUrl}/Sobre`}
      />
      <section className="pt-8 pb-6 md:pt-10 md:pb-8 relative">
      <div className="container mx-auto px-3 sm:px-6 relative z-10">
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-2xl mt-5 md:mt-5 2xl:mt-12 sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 px-1">
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
    </>
  )
}