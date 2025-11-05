import { Github, Instagram, Linkedin } from 'lucide-react'
import styles from './styles.module.css'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className={styles.containerFooter}>
      <div className={styles.contentTopo}>
        <div className={styles.descricao}>
          <h1>Renato Saldanha</h1>
          <p>Desenvolvendo soluções multiplataforma que facilitam a viver melhor.</p>
        </div>
        <div className={styles.mediaSocial}>
          <Link target="_blank" href='https://www.linkedin.com/in/renato-saldanha-a318067b/'><Linkedin size={32} /></Link>
          <Link target="_blank" href='https://www.instagram.com/renato.saldanha.1/'><Instagram size={32} /></Link>
          <Link target="_blank" href='https://github.com/renato-saldanha/'><Github size={32} /></Link>
        </div>
      </div>
      <hr />
      <div className={styles.contentRodape}>
        <p>ranalisesaldanha@gmail.com</p>
        <p>©Todos os direitos reservados - Renato Saldanha - 2024</p>
      </div>
    </div>
  )
}