import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Espacio } from '@/components/Espacio'
import { getAjustes, getPaciente, getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = { title: 'Tu espacio', robots: { index: false } }
export const dynamic = 'force-dynamic'

const INSIGNIA = { meditacion: '▶', guia: 'PDF', ejercicio: 'PDF' } as const

export default async function MiEspacio() {
  const paciente = await getPaciente()
  if (!paciente) redirect('/entrar')

  const [payload, ajustes] = await Promise.all([getPayloadClient(), getAjustes()])
  // overrideAccess: false → se aplica la regla `recursoVisible` con este paciente
  const { docs: recursos } = await payload.find({
    collection: 'recursos',
    user: { ...paciente, collection: 'pacientes' },
    overrideAccess: false,
    sort: '-createdAt',
    limit: 100,
    depth: 0,
  })

  const p = paciente.perfil ?? {}
  return (
    <Espacio
      id={paciente.id}
      nombre={paciente.nombre}
      pronombres={paciente.pronombres}
      proximaSesion={paciente.proximaSesion}
      whatsapp={ajustes.whatsapp}
      perfilInicial={{
        tema: p.tema ?? 'lavanda',
        letra: p.letra ?? 'legible',
        bateria: p.bateria ?? null,
        anclas: (p.anclas ?? []).map((a) => ({ texto: a.texto })),
      }}
    >
      <section className="caja" aria-labelledby="biblioteca">
        <h2 id="biblioteca">Tu biblioteca</h2>
        {recursos.length ? (
          <div className="biblioteca">
            {recursos.map((r) => (
              <div key={r.id} className="recurso">
                <div className="recurso-cabeza">
                  <span className="recurso-insignia" aria-hidden="true">{INSIGNIA[r.tipo]}</span>
                  <div>
                    <p>{r.titulo}</p>
                    <p className="suave">
                      {r.tipo === 'meditacion' ? `Meditación${r.duracionMin ? ` · ${r.duracionMin} min` : ''}` : r.tipo === 'guia' ? 'Guía' : 'Ejercicio'}
                    </p>
                  </div>
                </div>
                {r.descripcion ? <p className="suave">{r.descripcion}</p> : null}
                {r.url && r.mimeType?.startsWith('audio/') ? (
                  <audio controls preload="none" src={r.url}>
                    <a href={r.url}>Descargar audio</a>
                  </audio>
                ) : r.url ? (
                  <a href={r.url} target="_blank" rel="noopener">
                    Abrir PDF
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <p className="suave">Cuando Angela te asigne meditaciones o guías, aparecerán aquí.</p>
        )}
      </section>
    </Espacio>
  )
}
