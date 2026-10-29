import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { formatoMXN, getAjustes, getPayloadClient, urlWhatsApp } from '@/lib/payload'


type Props = { params: Promise<{ slug: string }> }

const buscar = async (slug: string) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'talleres', where: { slug: { equals: slug } }, limit: 1, depth: 1 })
  return docs[0]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const taller = await buscar((await params).slug)
  return taller ? { title: taller.titulo, description: taller.resumen } : {}
}

export default async function Taller({ params }: Props) {
  const [taller, ajustes] = await Promise.all([buscar((await params).slug), getAjustes()])
  if (!taller) notFound()
  const abierto = taller.estado !== 'completo'
  return (
    <article className="seccion contenedor">
      <div className="intro">
        <p className="etiqueta">Taller</p>
        <h1>{taller.titulo}</h1>
        <p style={{ fontSize: '1.1rem' }}>{taller.resumen}</p>
        <div className="chips">
          {taller.duracion ? <span className="chip chip-salvia">{taller.duracion}</span> : null}
          {formatoMXN(taller.precio) ? <span className="chip">{formatoMXN(taller.precio)}</span> : null}
          {taller.fechaInicio ? (
            <span className="chip">Inicia {new Date(taller.fechaInicio).toLocaleDateString('es-MX', { day: 'numeric', month: 'long' })}</span>
          ) : null}
        </div>
      </div>
      {taller.descripcion ? (
        <div className="prosa">
          <RichText data={taller.descripcion} />
        </div>
      ) : null}
      <div className="botones" style={{ marginTop: 32 }}>
        {abierto ? (
          <a className="boton boton-primario" href={urlWhatsApp(ajustes.whatsapp, `Hola, me interesa inscribirme al taller "${taller.titulo}".`)}>
            Quiero inscribirme
          </a>
        ) : (
          <a className="boton boton-secundario" href={urlWhatsApp(ajustes.whatsapp, `Hola, quiero saber cuándo abre otra generación de "${taller.titulo}".`)}>
            Avisarme de la próxima generación
          </a>
        )}
      </div>
    </article>
  )
}
