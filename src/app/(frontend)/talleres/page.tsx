import type { Metadata } from 'next'
import Link from 'next/link'
import { formatoMXN, getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = { title: 'Talleres', description: 'Talleres grupales de mindfulness, regulación emocional y comunicación.' }

const ESTADO = { abierto: 'Inscripciones abiertas', proximamente: 'Próximamente', completo: 'Cupo lleno' } as const

export default async function Talleres() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'talleres', limit: 50, sort: 'orden', depth: 0 })
  return (
    <section className="seccion contenedor">
      <div className="intro">
        <h1>Talleres grupales</h1>
        <p>Espacios pequeños para aprender y practicar en compañía.</p>
      </div>
      <div className="rejilla">
        {docs.map((t) => (
          <Link key={t.id} href={`/talleres/${t.slug}`} className="tarjeta-borde articulo-tarjeta">
            <div className="chips">
              {t.duracion ? <span className="chip chip-salvia">{t.duracion}</span> : null}
              {t.estado ? <span className="chip">{ESTADO[t.estado]}</span> : null}
            </div>
            <h3>{t.titulo}</h3>
            <p>{t.resumen}</p>
            {formatoMXN(t.precio) ? <p className="precio">{formatoMXN(t.precio)}</p> : null}
          </Link>
        ))}
      </div>
    </section>
  )
}
