/**
 * Stock de animaciones de Neurosemos: una por tema, en SVG + CSS (sin librerías).
 * Este archivo no tiene JSX para que Payload (el admin) pueda importar las opciones.
 * El dibujo de cada una vive en src/components/Animacion.tsx.
 */
export const ANIMACIONES = {
  respirar: { nombre: 'Respirar', uso: 'Mindfulness, meditaciones', descripcion: 'Círculo que se expande y contrae para guiar la respiración' },
  rutas: { nombre: 'Rutas propias', uso: 'Neurodivergencia', descripcion: 'Tres caminos distintos que llegan al mismo punto' },
  espectro: { nombre: 'Espectro', uso: 'Diversidad sexual y de género', descripcion: 'Arcos de varios tonos que se dibujan uno tras otro' },
  oleaje: { nombre: 'Oleaje que se calma', uso: 'Ansiedad, regulación emocional', descripcion: 'Una ola agitada que poco a poco se vuelve calma' },
  desenredar: { nombre: 'Desenredar', uso: 'TCC, pensamientos', descripcion: 'Una línea enredada que se transforma en una línea clara' },
  abrazo: { nombre: 'Abrazo', uso: 'Autocompasión, ánimo', descripcion: 'Dos trazos que rodean con cuidado un punto central' },
  recargar: { nombre: 'Recargar', uso: 'Burnout, energía, descanso', descripcion: 'Una batería que se recarga lentamente' },
  vinculos: { nombre: 'Vínculos', uso: 'Comunidad, talleres, relaciones', descripcion: 'Puntos que se van conectando entre sí' },
} as const

export type TemaAnimacion = keyof typeof ANIMACIONES

export const OPCIONES_ANIMACION = (Object.keys(ANIMACIONES) as TemaAnimacion[]).map((valor) => ({
  label: `${ANIMACIONES[valor].nombre} — ${ANIMACIONES[valor].uso}`,
  value: valor,
}))

/** Animación por defecto según la categoría del artículo. */
export const ANIMACION_POR_CATEGORIA: Record<string, TemaAnimacion> = {
  neurodivergencia: 'rutas',
  diversidad: 'espectro',
  ansiedad: 'oleaje',
  mindfulness: 'respirar',
  vinculos: 'vinculos',
  general: 'desenredar',
}

export const NOMBRE_CATEGORIA: Record<string, string> = {
  neurodivergencia: 'Neurodivergencia',
  diversidad: 'Diversidad',
  ansiedad: 'Ansiedad y ánimo',
  mindfulness: 'Mindfulness',
  vinculos: 'Vínculos',
  general: 'General',
}
