import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getPayloadClient } from '@/lib/payload'


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
  const fecha = post.publicadoEn ? new Date(post.publicadoEn).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }) : null
  return (
    <article className="seccion contenedor">
      <div className="intro">
        <p className="etiqueta">{post.categoria}{fecha ? ` · ${fecha}` : ''}</p>
        <h1>{post.titulo}</h1>
        <p style={{ fontSize: '1.1rem' }}>{post.extracto}</p>
      </div>
      {typeof post.portada === 'object' && post.portada?.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="portada" style={{ height: 'auto', maxWidth: 720, marginBottom: 32 }} src={post.portada.url} alt={post.portada.alt} />
      ) : null}
      <div className="prosa">
        <RichText data={post.contenido} />
      </div>
    </article>
  )
}
