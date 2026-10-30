import type { Metadata } from 'next'
import Link from 'next/link'
import type { Where } from 'payload'
import { EstadoVacio } from '@/components/EstadoVacio'
import { Portada } from '@/components/Portada'
import { NOMBRE_CATEGORIA } from '@/lib/animaciones'
import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Artículos sobre neurodivergencia, diversidad, ansiedad y mindfulness, escritos sin tecnicismos.',
}

type Props = { searchParams: Promise<{ tema?: string }> }

export default async function Blog({ searchParams }: Props) {
  const { tema } = await searchParams
  const filtro = tema && NOMBRE_CATEGORIA[tema] ? tema : undefined
  const payload = await getPayloadClient()
  const where: Where = filtro
    ? { and: [{ _status: { equals: 'published' } }, { categoria: { equals: filtro } }] }
    : { _status: { equals: 'published' } }
  const { docs } = await payload.find({ collection: 'posts', where, sort: '-publicadoEn', limit: 30, depth: 1 })
  const [destacado, ...resto] = docs

  return (
    <section className="seccion contenedor">
      <div className="intro">
        <p className="etiqueta">Blog</p>
        <h1>Para entender lo que vives, sin tecnicismos</h1>
        <p>Artículos de Angela sobre neurodivergencia, diversidad, ansiedad y mindfulness.</p>
      </div>

      <nav className="filtros" aria-label="Filtrar por tema">
        <Link href="/blog" aria-current={!filtro ? 'page' : undefined}>
          Todos
        </Link>
        {Object.entries(NOMBRE_CATEGORIA)
          .filter(([valor]) => valor !== 'general')
          .map(([valor, nombre]) => (
            <Link key={valor} href={`/blog?tema=${valor}`} aria-current={filtro === valor ? 'page' : undefined}>
              {nombre}
            </Link>
          ))}
      </nav>

      {destacado ? (
        <>
          <Link href={`/blog/${destacado.slug}`} className="destacado">
            <Portada post={destacado} alto={280} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '8px 12px' }}>
              <span className="etiqueta">
                {NOMBRE_CATEGORIA[destacado.categoria] ?? destacado.categoria}
                {destacado.minutosLectura ? ` · ${destacado.minutosLectura} min de lectura` : ''}
              </span>
              <h2>{destacado.titulo}</h2>
              <p className="texto-2">{destacado.extracto}</p>
              <span style={{ fontWeight: 700, color: 'var(--ciruela)' }}>Leer artículo →</span>
            </div>
          </Link>
          {resto.length ? (
            <div className="rejilla">
              {resto.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="articulo-tarjeta">
                  <Portada post={p} alto={180} />
                  <span className="etiqueta">
                    {NOMBRE_CATEGORIA[p.categoria] ?? p.categoria}
                    {p.minutosLectura ? ` · ${p.minutosLectura} min` : ''}
                  </span>
                  <h3>{p.titulo}</h3>
                  <p className="texto-2" style={{ fontSize: '0.9rem' }}>
                    {p.extracto}
                  </p>
                </Link>
              ))}
            </div>
          ) : null}
        </>
      ) : (
        filtro ? (
          <EstadoVacio
            tema="desenredar"
            etiqueta={NOMBRE_CATEGORIA[filtro]}
            titulo="Este tema todavía está en el tintero"
            texto={`Aún no hay artículos de ${NOMBRE_CATEGORIA[filtro]}. Mientras, mira los de otros temas.`}
            accion={{ href: '/blog', texto: 'Ver todos los artículos' }}
          />
        ) : (
          <EstadoVacio
            tema="recargar"
            titulo="Estamos cargando las primeras ideas"
            texto="Angela está escribiendo sobre neurodivergencia, diversidad, ansiedad y mindfulness. Vuelve pronto."
            accion={{ href: '/como-trabajo', texto: 'Mientras, conoce cómo trabajo' }}
          />
        )
      )}
    </section>
  )
}
