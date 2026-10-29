import type { Metadata } from 'next'
import { PaginaSimple } from '@/components/PaginaSimple'

export const metadata: Metadata = {
  title: 'Terapia para personas neurodivergentes',
  description: 'Psicoterapia neuroafirmativa para adultos con TDAH, autismo y AuDHD, con o sin diagnóstico formal. CDMX y en línea.',
}

// TODO(Angela): revisar y completar este texto con su enfoque y formación específica.
export default function Neurodivergencia() {
  return (
    <PaginaSimple
      etiqueta="Neurodivergencia"
      titulo="Terapia que parte de cómo funciona tu mente"
      entrada="TDAH, autismo y AuDHD en la adultez, con o sin diagnóstico formal."
    >
      <h2>Qué significa un enfoque neuroafirmativo</h2>
      <p>
        La meta no es que te comportes como una persona neurotípica. Trabajamos sobre lo que a ti te genera malestar
        —sobrecarga, ansiedad, agotamiento por enmascarar, dificultades con la organización— usando herramientas de la
        terapia cognitivo conductual adaptadas a tu forma de procesar.
      </p>
      <h2>Ajustes que puedes pedir</h2>
      <ul>
        <li>Sesiones con cámara apagada, luz baja o pausas.</li>
        <li>Instrucciones por escrito después de cada sesión.</li>
        <li>Comunicación por mensaje si hablar por teléfono te cuesta.</li>
      </ul>
      <h2>Formación</h2>
      <p>[PENDIENTE: cursos, certificaciones o experiencia específica de Angela en neurodivergencia]</p>
    </PaginaSimple>
  )
}
