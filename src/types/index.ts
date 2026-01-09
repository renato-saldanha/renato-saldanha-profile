import { StaticImageData } from "next/image"

export interface GaleriaProps {
  itens: GaleriaItem[]
  texto?: JSX.Element
  variant?: 'default' | 'sobre'
  onImageClick?: (src: string) => void
}

export interface GaleriaItem {
  titulo?: string,
  imagem: StaticImageData | string,
  style?: string
}

export interface Portifolio {
  id: string
  titulo: string
  descricao: string
  altImagem?: string
  galeria: GaleriaItem[]
}