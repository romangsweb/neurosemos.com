import { Animacion } from '@/components/Animacion'
import { ANIMACION_POR_CATEGORIA, type TemaAnimacion } from '@/lib/animaciones'

/** Portada de artículo: imagen si existe; si no, la animación del tema. */
export function Portada({
  post,
  alto,
}: {
  post: { portada?: unknown; animacion?: string | null; categoria: string }
  alto: number
}) {
  const imagen = typeof post.portada === 'object' && post.portada ? (post.portada as { url?: string; alt?: string }) : null
  if (imagen?.url) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="portada" style={{ height: alto }} src={imagen.url} alt={imagen.alt ?? ''} />
  }
  const tema = (post.animacion as TemaAnimacion) || ANIMACION_POR_CATEGORIA[post.categoria] || 'desenredar'
  return (
    <div className="lienzo-anim" style={{ borderRadius: 20 }}>
      <Animacion tema={tema} alto={alto} decorativa />
    </div>
  )
}
