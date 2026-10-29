import React from 'react'
import { ANIMACIONES, type TemaAnimacion } from '@/lib/animaciones'

/**
 * Stock de animaciones de Neurosemos. Trazo redondeado como el logo, paleta B,
 * ciclos de 6 a 12 s. Los @keyframes viven en styles.css y se detienen con
 * "reducir movimiento" del sistema o el botón "Sin animaciones" del sitio.
 */
export function Animacion({
  tema,
  alto = 300,
  decorativa = false,
  className,
}: {
  tema: TemaAnimacion
  alto?: number
  decorativa?: boolean
  className?: string
}) {
  const a11y = decorativa
    ? { 'aria-hidden': true as const }
    : { role: 'img', 'aria-label': ANIMACIONES[tema].descripcion }
  return (
    <svg
      {...a11y}
      viewBox="0 0 240 180"
      className={`anim ${className ?? ''}`}
      style={{ width: '100%', height: alto, display: 'block' }}
    >
      {DIBUJOS[tema]}
    </svg>
  )
}

const RUTA_1 = 'M30 90 C 80 20, 140 160, 210 90'
const RUTA_2 = 'M30 90 L 70 60 L 110 110 L 150 55 L 210 90'
const RUTA_3 = 'M30 90 C 60 140, 100 150, 120 110 C 135 80, 95 70, 110 110 C 125 150, 190 140, 210 90'
const OLA_1 = 'M0 90 Q 15 60 30 90 T 60 90 T 90 90 T 120 90 T 150 90 T 180 90 T 210 90 T 240 90 T 270 90 T 300 90 T 330 90 T 360 90'
const OLA_2 = 'M0 112 Q 15 92 30 112 T 60 112 T 90 112 T 120 112 T 150 112 T 180 112 T 210 112 T 240 112 T 270 112 T 300 112 T 330 112 T 360 112'
const linea = { fill: 'none', strokeLinecap: 'round' as const }
const retraso = (s: number): React.CSSProperties => ({ animationDelay: `${s}s` })

const DIBUJOS: Record<TemaAnimacion, React.ReactNode> = {
  respirar: (
    <>
      <circle cx="120" cy="90" r="62" {...linea} stroke="var(--anim-lavanda)" strokeWidth="2" strokeDasharray="3 7" />
      <circle cx="120" cy="90" r="56" fill="var(--anim-lavanda)" stroke="var(--anim-ciruela)" strokeWidth="2.5" className="a-respira" />
      <text x="120" y="96" textAnchor="middle" fontSize="15" fill="var(--anim-tinta)" className="a-inhala">inhala</text>
      <text x="120" y="96" textAnchor="middle" fontSize="15" fill="var(--anim-tinta)" className="a-exhala">exhala</text>
    </>
  ),
  rutas: (
    <>
      <path d={RUTA_1} {...linea} stroke="var(--anim-lila)" strokeWidth="2.5" />
      <path d={RUTA_2} {...linea} stroke="var(--anim-salvia)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d={RUTA_3} {...linea} stroke="var(--anim-arena)" strokeWidth="2.5" />
      <circle r="5" fill="var(--anim-ciruela)" className="a-ruta" style={{ offsetPath: `path('${RUTA_1}')`, animationDuration: '7s' }} />
      <circle r="5" fill="var(--anim-salvia-tinta)" className="a-ruta" style={{ offsetPath: `path('${RUTA_2}')`, animationDuration: '9s' }} />
      <circle r="5" fill="var(--anim-arena-tinta)" className="a-ruta" style={{ offsetPath: `path('${RUTA_3}')`, animationDuration: '11s' }} />
      <circle cx="30" cy="90" r="7" fill="var(--anim-fondo)" stroke="var(--anim-ciruela)" strokeWidth="2.5" />
      <circle cx="210" cy="90" r="9" fill="var(--anim-ciruela)" />
    </>
  ),
  espectro: (
    <>
      {[
        ['M40 140 A 80 80 0 0 1 200 140', 'var(--anim-ciruela)'],
        ['M55 140 A 65 65 0 0 1 185 140', 'var(--anim-lila)'],
        ['M70 140 A 50 50 0 0 1 170 140', 'var(--anim-arena)'],
        ['M85 140 A 35 35 0 0 1 155 140', 'var(--anim-salvia)'],
        ['M100 140 A 20 20 0 0 1 140 140', 'var(--anim-salvia-tinta)'],
      ].map(([d, color], i) => (
        <path key={d} d={d} {...linea} stroke={color} strokeWidth="9" strokeDasharray="260" className="a-arco" style={retraso(i * 0.6)} />
      ))}
    </>
  ),
  oleaje: (
    <g className="a-calma">
      <path d={OLA_1} {...linea} stroke="var(--anim-ciruela)" strokeWidth="3" className="a-ola" style={{ animationDuration: '4s' }} />
      <path d={OLA_2} {...linea} stroke="var(--anim-salvia)" strokeWidth="3" className="a-ola" style={{ animationDuration: '6s' }} />
    </g>
  ),
  desenredar: (
    <>
      <path
        d="M45 90 C 70 30, 110 150, 95 85 C 80 30, 150 40, 120 100 C 95 150, 170 140, 160 80 C 150 40, 200 60, 195 90"
        {...linea}
        stroke="var(--anim-ciruela)"
        strokeWidth="2.5"
        strokeDasharray="520"
        className="a-enredo"
      />
      <path d="M45 90 L 195 90" {...linea} stroke="var(--anim-salvia-tinta)" strokeWidth="3" strokeDasharray="150" className="a-recta" />
      <circle cx="45" cy="90" r="6" fill="var(--anim-fondo)" stroke="var(--anim-ciruela)" strokeWidth="2.5" />
      <circle cx="195" cy="90" r="6" fill="var(--anim-salvia-tinta)" />
    </>
  ),
  abrazo: (
    <>
      <circle cx="120" cy="92" r="30" fill="var(--anim-arena)" className="a-halo" />
      <circle cx="120" cy="92" r="13" fill="var(--anim-ciruela)" />
      <path d="M120 32 A 60 60 0 0 0 120 152" {...linea} stroke="var(--anim-ciruela)" strokeWidth="3" className="a-abrazo-i" />
      <path d="M120 32 A 60 60 0 0 1 120 152" {...linea} stroke="var(--anim-salvia)" strokeWidth="3" className="a-abrazo-d" />
    </>
  ),
  recargar: (
    <>
      <rect x="50" y="62" width="130" height="56" rx="12" fill="var(--anim-fondo)" stroke="var(--anim-ciruela)" strokeWidth="3" />
      <rect x="182" y="78" width="10" height="24" rx="4" fill="var(--anim-ciruela)" />
      <rect x="58" y="70" width="114" height="40" rx="7" className="a-carga" />
    </>
  ),
  vinculos: (
    <>
      {[
        ['M70 60 L 170 60', 'var(--anim-lila)'],
        ['M170 60 L 195 110', 'var(--anim-salvia)'],
        ['M195 110 L 120 145', 'var(--anim-arena)'],
        ['M120 145 L 45 110', 'var(--anim-lila)'],
        ['M45 110 L 70 60', 'var(--anim-salvia)'],
        ['M70 60 L 120 145', 'var(--anim-lavanda)'],
      ].map(([d, color], i) => (
        <path key={d} d={d} {...linea} stroke={color} strokeWidth="2.5" strokeDasharray="120" className="a-vinculo" style={retraso(i * 0.8)} />
      ))}
      {[
        [70, 60, 'var(--anim-ciruela)'],
        [170, 60, 'var(--anim-salvia-tinta)'],
        [195, 110, 'var(--anim-arena-tinta)'],
        [120, 145, 'var(--anim-ciruela)'],
        [45, 110, 'var(--anim-salvia-tinta)'],
      ].map(([cx, cy, color], i) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="8"
          fill={color as string}
          className="a-nodo"
          style={{ transformOrigin: `${cx}px ${cy}px`, ...retraso(i) }}
        />
      ))}
    </>
  ),
}
