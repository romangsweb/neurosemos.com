import Link from 'next/link'
import type { AjustesSitio } from '@/payload-types'
import { urlWhatsApp } from '@/lib/payload'

export function Pie({ ajustes }: { ajustes: AjustesSitio }) {
  return (
    <footer className="pie">
      <div className="contenedor pie-fila">
        <div className="marca marca-chica">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" width={32} height={32} />
          <span>© {new Date().getFullYear()} Neurosemos · {ajustes.ubicacion || 'CDMX'}</span>
        </div>
        <div className="pie-enlaces">
          <a href={urlWhatsApp(ajustes.whatsapp)}>WhatsApp {ajustes.telefonoVisible}</a>
          <Link href="/aviso-de-privacidad">Aviso de privacidad</Link>
        </div>
      </div>
      {ajustes.lineaCrisis ? <p className="contenedor pie-crisis">{ajustes.lineaCrisis}</p> : null}
    </footer>
  )
}
