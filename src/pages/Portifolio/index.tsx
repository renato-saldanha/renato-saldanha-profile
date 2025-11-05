import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import styles from './styles.module.css'
import type { Portifolio } from '@/types'
import GaleriaFotos from '@/components/GaleriaFotos'

const portifolios: Portifolio[] = [
  {
    id: 'crm-leads',
    titulo: 'CRM Leads',
    descricao: 'Mini CRM para gerenciamento de leads e oportunidades de venda',
    galeria: [
      { imagem: `/assets/crm_leads/crm_leads.png` },
      { imagem: `/assets/crm_leads/crm_leads2.png` },
    ]
  },
  // Adicione mais portfólios aqui conforme necessário
  // {
  //   id: 'outro-projeto',
  //   titulo: 'Outro Projeto',
  //   descricao: 'Descrição do outro projeto',
  //   galeria: [
  //     { imagem: `/assets/outro-projeto/img1.png` },
  //     { imagem: `/assets/outro-projeto/img2.png` },
  //   ]
  // }
]

export default function Portifolio() {
  const [modalAberto, setModalAberto] = useState(false)
  const [portifolioSelecionado, setPortifolioSelecionado] = useState<Portifolio | null>(null)

  // Fechar modal com ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalAberto) {
        setModalAberto(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [modalAberto])

  // Prevenir scroll do body quando modal está aberto
  useEffect(() => {
    if (modalAberto) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [modalAberto])

  const abrirModal = (portifolio: Portifolio) => {
    setPortifolioSelecionado(portifolio)
    setModalAberto(true)
  }

  const fecharModal = () => {
    setModalAberto(false)
    // Delay para permitir animação de saída
    setTimeout(() => {
      setPortifolioSelecionado(null)
    }, 300)
  }

  return (
    <div className={styles.container}>
      {/* Lista de Portfólios */}
      <div className={styles.portifoliosLista}>
        <h2 className={styles.tituloLista}>Meus Portfólios</h2>
        <div className={styles.portifoliosGrid}>
          {portifolios.map((portifolio) => (
            <button
              key={portifolio.id}
              className={styles.portifolioCard}
              onClick={() => abrirModal(portifolio)}
              type="button"
            >
              <h3 className={styles.portifolioCardTitulo}>{portifolio.titulo}</h3>
              <p className={styles.portifolioCardDescricao}>{portifolio.descricao}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Modal com Galeria */}
      <AnimatePresence>
        {modalAberto && portifolioSelecionado && (
          <motion.div
            className={styles.modalOverlay}
            onClick={fecharModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Header do Modal */}
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitulo}>{portifolioSelecionado.titulo}</h2>
                <button
                  className={styles.modalCloseButton}
                  onClick={fecharModal}
                  aria-label="Fechar modal"
                  type="button"
                >
                  <X className={styles.modalCloseIcon} />
                </button>
              </div>

              {/* Galeria no Modal */}
              <div className={styles.modalGaleria}>
                <GaleriaFotos itens={portifolioSelecionado.galeria} />
              </div>

              {/* Descrição no Modal */}
              <div className={styles.modalDescricao}>
                <p>{portifolioSelecionado.descricao}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}