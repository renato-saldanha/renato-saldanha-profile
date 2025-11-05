import { StaticImageData } from "next/image"

export interface GaleriaProps {
  itens: GaleriaItem[]
  texto?: JSX.Element
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
  galeria: GaleriaItem[]
}