import type { Metadata } from 'next'
import { PaginaSimple } from '@/components/PaginaSimple'
import { formatoMXN, getAjustes } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Cómo trabajo',
  description: 'Terapia cognitivo conductual, mindfulness compasivo y ACT. Sesiones de 50 minutos, presenciales en CDMX o por Zoom.',
}

export default async function ComoTrabajo() {
  const ajustes = await getAjustes()
  return (
    <PaginaSimple etiqueta="Cómo trabajo" titulo="Un proceso claro, a tu ritmo" entrada="Terapia cognitivo conductual integrada con mindfulness compasivo y terapia de aceptación y compromiso.">
      <h2>El enfoque</h2>
      <p>
        La terapia cognitivo conductual se enfoca en identificar y modificar los pensamientos y comportamientos que mantienen
        el malestar. Integrada con mindfulness compasivo, te ayuda a construir una relación más amable contigo.
      </p>
      <h2>Las sesiones</h2>
      <ul>
        <li>Duran aproximadamente 50 minutos, por lo general una vez por semana.</li>
        <li>Presenciales en {ajustes.ubicacion || 'CDMX'} o por Zoom.</li>
        {formatoMXN(ajustes.costoSesion) ? <li>Costo por sesión individual: {formatoMXN(ajustes.costoSesion)}.</li> : null}
      </ul>
      <h2>Especialidades</h2>
      <p>Ansiedad, depresión, TDAH, autismo, adicciones, estrés y burnout, crisis emocionales y regulación emocional.</p>
    </PaginaSimple>
  )
}
