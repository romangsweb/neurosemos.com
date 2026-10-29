import type { Metadata } from 'next'
import React from 'react'
import { Encabezado } from '@/components/Encabezado'
import { Pie } from '@/components/Pie'
import { getAjustes, urlWhatsApp } from '@/lib/payload'
import './styles.css'

const SITIO = process.env.NEXT_PUBLIC_SERVER_URL || 'https://neurosemos.com'

// Todo se renderiza por petición: los cambios del admin se ven al instante y el build no depende de la base
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  metadataBase: new URL(SITIO),
  title: {
    default: 'Neurosemos — Psicoterapia neuroafirmativa y afirmativa LGBTQ+ en CDMX',
    template: '%s · Neurosemos',
  },
  description:
    'Terapia cognitivo conductual y mindfulness compasivo para personas neurodivergentes (TDAH, autismo, AuDHD) y comunidad LGBTQ+. Presencial en CDMX y en línea.',
  openGraph: { type: 'website', locale: 'es_MX', siteName: 'Neurosemos' },
  icons: { icon: '/favicon.svg' },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const ajustes = await getAjustes()
  const agendaHref = ajustes.agendaUrl || urlWhatsApp(ajustes.whatsapp, 'Hola, me gustaría agendar una primera consulta.')

  return (
    <html lang="es-MX" data-modo="claro" data-texto="normal" data-movimiento="normal">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Fraunces:opsz,wght@9..144,400;9..144,500&family=Space+Mono:wght@400;700&display=swap"
        />
      </head>
      <body>
        <a href="#contenido" className="salto">
          Saltar al contenido
        </a>
        <Encabezado agendaHref={agendaHref} />
        <main id="contenido">{children}</main>
        <Pie ajustes={ajustes} />
      </body>
    </html>
  )
}
