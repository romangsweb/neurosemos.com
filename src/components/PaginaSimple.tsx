import React from 'react'

/** Plantilla para páginas de texto: título, entrada y contenido en prosa. */
export function PaginaSimple({ etiqueta, titulo, entrada, children }: { etiqueta?: string; titulo: string; entrada?: string; children: React.ReactNode }) {
  return (
    <article className="seccion contenedor">
      <div className="intro">
        {etiqueta ? <p className="etiqueta">{etiqueta}</p> : null}
        <h1>{titulo}</h1>
        {entrada ? <p style={{ fontSize: '1.1rem' }}>{entrada}</p> : null}
      </div>
      <div className="prosa">{children}</div>
    </article>
  )
}
