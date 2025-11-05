import { Github, Instagram, Linkedin } from 'lucide-react';
import styles from './styles.module.css'
import Link from 'next/link';

import { motion } from 'framer-motion'

const animate = {
  rotate: 360,
  scale: 1,
}

export default function SocialBar() {
  return (
    <div className={styles.containerSocialBar}>
      <motion.div
        className={styles.imgLinkedin}
        initial={{ scale: .7 }}
        animate={animate}
        transition={{
          repeat: 999999999,
          repeatType: "loop",
          repeatDelay: 7
        }
        }>
        <Link target="_blank" href='https://www.linkedin.com/in/renato-saldanha-a318067b/'><Linkedin size={32} /></Link>
      </motion.div>

      <motion.div
        className={styles.imgInstagram}
        initial={{ scale: .4, decelerate: 3 }}
        animate={animate}
        transition={{
          repeat: 999999999,
          repeatType: "loop",
          repeatDelay: 7
        }
        }>
        <Link target="_blank" href='https://www.instagram.com/renato.saldanha.1/'><Instagram size={32} /></Link>
      </motion.div>

      <motion.div
        className={styles.imgGitHub}
        initial={{ scale: .4, decelerate: 3 }}
        animate={animate}
        transition={{
          repeat: 999999999,
          repeatType: "loop",
          repeatDelay: 7
        }
        }>
        <Link target="_blank" href='https://github.com/renato-saldanha/'><Github size={32} /></Link>
      </motion.div>

    </div>
  )
}