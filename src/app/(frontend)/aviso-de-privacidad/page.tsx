import type { Metadata } from 'next'
import { PaginaSimple } from '@/components/PaginaSimple'

export const metadata: Metadata = { title: 'Aviso de privacidad', robots: { index: false } }

// PENDIENTE: el texto definitivo debe validarlo alguien de legal (LFPDPPP).
// Debe cubrir datos sensibles (salud, orientación sexual) y consentimiento expreso para el portal de pacientes.
export default function AvisoPrivacidad() {
  return (
    <PaginaSimple titulo="Aviso de privacidad">
      <p>[PENDIENTE: texto del aviso de privacidad integral, validado legalmente.]</p>
      <p>
        Puntos a cubrir: responsable (Angela Beatriz Ojeda Patiño), datos que recaba el sitio y el portal de pacientes,
        finalidades, encargados del tratamiento (alojamiento en Cloudflare, envío de correos con Resend), derechos ARCO y
        medio para ejercerlos, y consentimiento expreso para datos sensibles.
      </p>
    </PaginaSimple>
  )
}
