import Link from 'next/link'
import { EstadoVacio } from '@/components/EstadoVacio'

export default function NoEncontrada() {
  return (
    <section className="seccion contenedor">
      <EstadoVacio
        tema="rutas"
        etiqueta="Página no encontrada"
        titulo="Este camino no lleva a ninguna página"
        texto="Pasa: hay muchas formas de llegar al mismo lugar. Quizá el enlace cambió o se escribió distinto. Desde aquí puedes seguir por cualquiera de estas rutas."
        acciones={
          <>
            <Link href="/" className="boton boton-primario">Ir al inicio</Link>
            <Link href="/blog" className="boton">Leer el blog</Link>
            <Link href="/como-trabajo" className="boton">Cómo trabajo</Link>
          </>
        }
      />
    </section>
  )
}
