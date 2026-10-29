import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Portada } from '@/components/Portada'
import { NOMBRE_CATEGORIA } from '@/lib/animaciones'
import { getAjustes, getPayloadClient, urlWhatsApp } from '@/lib/payload'

type Props = { params: Promise<{ slug: string }> }

const buscar = async (slug: string) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
    limit: 1,
    depth: 1,
  })
  return docs[0]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await buscar((await params).slug)
  if (!post) return {}
  return {
    title: post.seo?.metaTitulo || post.titulo,
    description: post.seo?.metaDescripcion || post.extracto,
    openGraph: { type: 'article', publishedTime: post.publicadoEn ?? undefined },
  }
}

export default async function Articulo({ params }: Props) {
  const post = await buscar((await params).slug)
  if (!post) notFound()
  const [ajustes, payload] = await Promise.all([getAjustes(), getPayloadClient()])
  const { docs: relacionados } = await payload.find({
    collection: 'posts',
    where: { and: [{ _status: { equals: 'published' } }, { categoria: { equals: post.categoria } }, { id: { not_equals: post.id } }] },
    sort: '-publicadoEn',
    limit: 2,
    depth: 1,
  })
  const fecha = post.publicadoEn
    ? new Date(post.publicadoEn).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
    : null
  const agenda = ajustes.agendaUrl || urlWhatsApp(ajustes.whatsapp, `Hola, leí "${post.titulo}" y me gustaría agendar una consulta.`)

  return (
    <article className="seccion contenedor" style={{ maxWidth: 820 }}>
      <div className="intro" style={{ maxWidth: 'none' }}>
        <p className="etiqueta">
          <Link href={`/blog?tema=${post.categoria}`}>{NOMBRE_CATEGORIA[post.categoria] ?? post.categoria}</Link>
          {post.minutosLectura ? ` · ${post.minutosLectura} min de lectura` : ''}
          {fecha ? ` · ${fecha}` : ''}
        </p>
        <h1>{post.titulo}</h1>
        <p style={{ fontSize: '1.1rem' }}>{post.extracto}</p>
      </div>
      <div style={{ marginBottom: 32 }}>
        <Portada post={post} alto={260} />
      </div>
      <div className="prosa">
        <RichText data={post.contenido} />
      </div>

      <div className="autor">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/angela.jpg" alt="" />
        <div>
          <p style={{ fontWeight: 700 }}>Angela Beatriz Ojeda Patiño</p>
          <p className="texto-2" style={{ fontSize: '0.85rem' }}>
            Psicoterapeuta · TCC y mindfulness compasivo
          </p>
        </div>
      </div>

      <div className="cierre" style={{ marginTop: 32, padding: '32px 28px' }}>
        <h2 style={{ fontSize: '1.4rem' }}>¿Te reconociste en este artículo? Podemos trabajarlo juntes.</h2>
        <a href={agenda} className="boton boton-claro">
          Agendar primera consulta
        </a>
      </div>

      {relacionados.length ? (
        <section style={{ marginTop: 56 }} aria-labelledby="relacionados">
          <h2 id="relacionados" style={{ fontSize: '1.4rem', marginBottom: 20 }}>
            Sigue leyendo
          </h2>
          <div className="rejilla">
            {relacionados.map((p) => (
              <Link key={p.id} href={`/blog/${p.slug}`} className="articulo-tarjeta">
                <Portada post={p} alto={150} />
                <h3>{p.titulo}</h3>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
}
