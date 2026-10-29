'use client'

import { useEffect, useState } from 'react'

type Prefs = { grande: boolean; oscuro: boolean; quieto: boolean }
const CLAVE = 'neurosemos-lectura'

const leer = (): Prefs => {
  try {
    const raw = localStorage.getItem(CLAVE)
    if (raw) return { grande: false, oscuro: false, quieto: false, ...JSON.parse(raw) }
  } catch {}
  return { grande: false, oscuro: false, quieto: false }
}

const aplicar = (p: Prefs) => {
  const html = document.documentElement
  html.dataset.texto = p.grande ? 'grande' : 'normal'
  html.dataset.modo = p.oscuro ? 'oscuro' : 'claro'
  html.dataset.movimiento = p.quieto ? 'reducido' : 'normal'
}

/** Controles de lectura visibles: tamaño de texto, modo oscuro y sin animaciones. */
export function AjustesLectura() {
  const [prefs, setPrefs] = useState<Prefs>({ grande: false, oscuro: false, quieto: false })

  useEffect(() => {
    const p = leer()
    setPrefs(p)
    aplicar(p)
  }, [])

  const cambiar = (clave: keyof Prefs) => {
    const p = { ...prefs, [clave]: !prefs[clave] }
    setPrefs(p)
    aplicar(p)
    try {
      localStorage.setItem(CLAVE, JSON.stringify(p))
    } catch {}
  }

  return (
    <div className="lectura" role="group" aria-label="Ajustes de lectura">
      <span>Ajustes de lectura:</span>
      <button type="button" aria-pressed={prefs.grande} onClick={() => cambiar('grande')}>
        Aa tamaño
      </button>
      <button type="button" aria-pressed={prefs.oscuro} onClick={() => cambiar('oscuro')}>
        Modo oscuro
      </button>
      <button type="button" aria-pressed={prefs.quieto} onClick={() => cambiar('quieto')}>
        Sin animaciones
      </button>
    </div>
  )
}
