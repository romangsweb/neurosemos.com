import Link from 'next/link'
import React from 'react'
import { Animacion } from './Animacion'
import type { TemaAnimacion } from '@/lib/animaciones'

/**
 * Estado vacío o de error con una animación del stock.
 * Tono: invitar, no disculparse; nunca culpar a quien lee; siempre un siguiente paso.
 * `compacto` es la versión del portal de pacientes; `aviso` lo anuncia a lectores de pantalla.
 */
export function EstadoVacio({
  tema,
  etiqueta,
  titulo,
  texto,
  accion,
  acciones,
  compacto = false,
  aviso = false,
}: {
  tema: TemaAnimacion
  etiqueta?: string
  titulo: string
  texto?: React.ReactNode
  accion?: { href: string; texto: string; externo?: boolean }
  acciones?: React.ReactNode
  compacto?: boolean
  aviso?: boolean
}) {
  return (
    <div className={`estado-vacio${compacto ? ' estado-vacio--compacto' : ''}`} role={aviso ? 'status' : undefined}>
      <div className="estado-vacio-anim">
        <Animacion tema={tema} alto={compacto ? 110 : 170} decorativa />
      </div>
      {etiqueta ? <p className="estado-vacio-etiqueta">{etiqueta}</p> : null}
      <p className="estado-vacio-titulo">{titulo}</p>
      {texto ? <p className="estado-vacio-texto">{texto}</p> : null}
      {accion ? (
        accion.externo ? (
          <a href={accion.href} className="estado-vacio-accion" target="_blank" rel="noopener">
            {accion.texto} →
          </a>
        ) : (
          <Link href={accion.href} className="estado-vacio-accion">
            {accion.texto} →
          </Link>
        )
      ) : null}
      {acciones ? <div className="estado-vacio-acciones">{acciones}</div> : null}
    </div>
  )
}
