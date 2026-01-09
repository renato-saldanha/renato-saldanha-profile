import SocialIcons from '@/components/SocialIcons';

export default function SocialBar() {
  return (
    <>
      {/* Mobile: posicionado no rodapé para não sobrepor conteúdo */}
      <div className="fixed bottom-4 right-3 z-40 lg:hidden">
        <SocialIcons 
          orientation="vertical" 
          withAnimation={true}
          size="small"
        />
      </div>
      
      {/* Desktop: Lateral direita centralizada */}
      <div className="fixed right-4 xl:right-[50px] top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <SocialIcons 
          orientation="vertical" 
          withAnimation={true}
        />
      </div>
    </>
  )
}