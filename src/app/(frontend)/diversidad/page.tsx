import type { Metadata } from 'next'
import { PaginaSimple } from '@/components/PaginaSimple'

export const metadata: Metadata = {
  title: 'Terapia afirmativa LGBTQ+',
  description: 'Psicoterapia afirmativa para personas de la diversidad sexual y de género. CDMX y en línea.',
}

// TODO(Angela): revisar y completar este texto con su enfoque y formación específica.
export default function Diversidad() {
  return (
    <PaginaSimple
      etiqueta="Diversidad sexual y de género"
      titulo="Tu identidad no es el problema a tratar"
      entrada="Terapia afirmativa para personas LGBTQ+ y para quienes están explorando su identidad."
    >
      <h2>Desde el primer mensaje</h2>
      <p>
        Usamos el nombre y los pronombres con los que te identificas. No necesitas explicar ni justificar tu identidad para
        recibir atención.
      </p>
      <h2>Con qué podemos trabajar</h2>
      <ul>
        <li>Ansiedad, depresión y estrés asociados a vivir en un entorno que no siempre es seguro.</li>
        <li>Procesos de salir del clóset, relaciones y familia.</li>
        <li>Exploración de identidad, a tu ritmo.</li>
      </ul>
      <h2>Formación</h2>
      <p>[PENDIENTE: cursos, certificaciones o experiencia específica de Angela en terapia afirmativa]</p>
    </PaginaSimple>
  )
}
