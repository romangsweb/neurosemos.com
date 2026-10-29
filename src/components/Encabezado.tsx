import Link from 'next/link'

export function Encabezado({ agendaHref }: { agendaHref: string }) {
  return (
    <header className="encabezado">
      <nav aria-label="Principal" className="contenedor nav">
        <Link href="/" className="marca">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" width={40} height={40} />
          <span>Neurosemos</span>
        </Link>
        <div className="nav-enlaces">
          <Link href="/como-trabajo">Cómo trabajo</Link>
          <Link href="/neurodivergencia">Neurodivergencia</Link>
          <Link href="/diversidad">Diversidad</Link>
          <Link href="/#preguntas">Preguntas</Link>
          <Link href="/talleres">Talleres</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/mi-espacio">Acceso pacientes</Link>
          <a href={agendaHref} className="boton boton-primario">
            Agendar consulta
          </a>
        </div>
      </nav>
    </header>
  )
}
