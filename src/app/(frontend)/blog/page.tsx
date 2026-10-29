import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = { title: 'Recursos', description: 'Artículos sobre neurodivergencia, diversidad, ansiedad y mindfulness, sin tecnicismos.' }

export default async function Blog() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    sort: '-publicadoEn',
    limit: 30,
    depth: 1,
  })
  return (
    <section className="seccion contenedor">
      <div className="intro">
        <h1>Recursos abiertos</h1>
        <p>Artículos para entender lo que vives, escritos sin tecnicismos.</p>
      </div>
      {docs.length ? (
        <div className="rejilla">
          {docs.map((p) => (
            <Link key={p.id} href={`/blog/${p.slug}`} className="articulo-tarjeta">
              {typeof p.portada === 'object' && p.portada?.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="portada" src={p.portada.url} alt={p.portada.alt} />
              ) : (
                <div className="portada" />
              )}
              <span className="etiqueta">{p.categoria}</span>
              <h3>{p.titulo}</h3>
              <p className="texto-2" style={{ fontSize: '0.9rem' }}>{p.extracto}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="texto-2">Pronto habrá artículos aquí.</p>
      )}
    </section>
  )
}
