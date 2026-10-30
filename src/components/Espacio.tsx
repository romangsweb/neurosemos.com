'use client'

import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { EstadoVacio } from './EstadoVacio'

type Perfil = {
  tema: 'lavanda' | 'neo' | 'bosque' | 'contraste'
  letra: 'legible' | 'mono' | 'serif'
  bateria: number | null
  anclas: { texto: string }[]
}

const TEMAS: { valor: Perfil['tema']; nombre: string }[] = [
  { valor: 'lavanda', nombre: 'Lavanda' },
  { valor: 'neo', nombre: 'Neo' },
  { valor: 'bosque', nombre: 'Bosque' },
  { valor: 'contraste', nombre: 'Alto contraste' },
]
const LETRAS: { valor: Perfil['letra']; nombre: string }[] = [
  { valor: 'legible', nombre: 'Hiperlegible' },
  { valor: 'mono', nombre: 'Mono' },
  { valor: 'serif', nombre: 'Serif' },
]

const ERROR_GUARDAR = 'error'

type Props = {
  id: number | string
  nombre: string
  pronombres?: string | null
  proximaSesion?: string | null
  whatsapp: string
  perfilInicial: Perfil
  children: React.ReactNode
}

/** Envoltura del portal: tema, letra, batería social y anclas que el paciente edita y se guardan en su cuenta. */
export function Espacio({ id, nombre, pronombres, proximaSesion, whatsapp, perfilInicial, children }: Props) {
  const router = useRouter()
  const [perfil, setPerfil] = useState<Perfil>(perfilInicial)
  const [nuevaAncla, setNuevaAncla] = useState('')
  const [guardado, setGuardado] = useState('')
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null)

  const guardar = (p: Perfil) => {
    setPerfil(p)
    setGuardado('Guardando…')
    if (temporizador.current) clearTimeout(temporizador.current)
    temporizador.current = setTimeout(async () => {
      const res = await fetch(`/api/pacientes/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ perfil: p }),
      })
      setGuardado(res.ok ? 'Guardado' : ERROR_GUARDAR)
    }, 500)
  }
  const reintentar = () => guardar(perfil)

  const agregarAncla = (e: React.FormEvent) => {
    e.preventDefault()
    const texto = nuevaAncla.trim()
    if (!texto || perfil.anclas.length >= 8) return
    guardar({ ...perfil, anclas: [...perfil.anclas, { texto }] })
    setNuevaAncla('')
  }

  const salir = async () => {
    await fetch('/api/pacientes/logout', { method: 'POST', credentials: 'include' })
    router.push('/')
    router.refresh()
  }

  const iniciales = nombre.slice(0, 2)
  const sesion = proximaSesion
    ? new Date(proximaSesion).toLocaleString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', timeZone: 'America/Mexico_City' })
    : null

  return (
    <div className="espacio" data-tema={perfil.tema} data-letra={perfil.letra}>
      <div className="espacio-banner">
        <div className="contenedor">
          <div className="avatar" aria-hidden="true">{iniciales}</div>
          <div style={{ flex: 1 }}>
            <p className="espacio-nombre">{nombre} ✶</p>
            {pronombres ? <p style={{ fontSize: '0.8rem' }}>{pronombres}</p> : null}
          </div>
          <button type="button" className="enlace-boton" style={{ color: 'inherit' }} onClick={salir}>
            Salir
          </button>
        </div>
      </div>

      <div className="contenedor espacio-cuerpo">
        <aside className="espacio-lateral" aria-label="Tu perfil">
          <div className="caja caja-punteada">
            <p className="suave">Solo tú ves esta página</p>
            <h2 style={{ marginTop: 8 }}>Batería social de hoy</h2>
            <div className="bateria" role="group" aria-label="Batería social, de 1 a 5">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-label={`${n} de 5`}
                  aria-pressed={perfil.bateria === n}
                  data-lleno={(perfil.bateria ?? 0) >= n}
                  onClick={() => guardar({ ...perfil, bateria: n })}
                />
              ))}
            </div>
          </div>

          <div className="caja caja-punteada">
            <h2>Mis anclas</h2>
            {perfil.anclas.length ? (
              <ul className="anclas">
                {perfil.anclas.map((a, i) => (
                  <li key={i}>
                    {a.texto}{' '}
                    <button
                      type="button"
                      className="enlace-boton"
                      aria-label={`Quitar "${a.texto}"`}
                      onClick={() => guardar({ ...perfil, anclas: perfil.anclas.filter((_, j) => j !== i) })}
                    >
                      quitar
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <EstadoVacio
                compacto
                tema="abrazo"
                titulo="¿Qué te ayuda a volver a ti?"
                texto="Un sonido, un lugar, una rutina. Agrega la primera cuando quieras."
              />
            )}
            <form className="ancla-nueva" onSubmit={agregarAncla}>
              <label className="sr-only" htmlFor="ancla">Nueva ancla</label>
              <input id="ancla" value={nuevaAncla} maxLength={80} onChange={(e) => setNuevaAncla(e.target.value)} placeholder="Escuchar lluvia 5 minutos" />
              <button type="submit" className="boton boton-primario" style={{ padding: '6px 14px', minHeight: 40 }}>
                Agregar
              </button>
            </form>
          </div>

          <div className="caja caja-punteada">
            <h2>Personaliza tu espacio</h2>
            <p className="suave" style={{ marginBottom: 8 }}>Tema</p>
            <div className="opciones" style={{ marginBottom: 14 }}>
              {TEMAS.map((t) => (
                <button key={t.valor} type="button" aria-pressed={perfil.tema === t.valor} onClick={() => guardar({ ...perfil, tema: t.valor })}>
                  {t.nombre}
                </button>
              ))}
            </div>
            <p className="suave" style={{ marginBottom: 8 }}>Letra</p>
            <div className="opciones">
              {LETRAS.map((l) => (
                <button key={l.valor} type="button" aria-pressed={perfil.letra === l.valor} onClick={() => guardar({ ...perfil, letra: l.valor })}>
                  {l.nombre}
                </button>
              ))}
            </div>
            {guardado === ERROR_GUARDAR ? (
              <div className="estado-guardado-error">
                <EstadoVacio
                  compacto
                  aviso
                  tema="desenredar"
                  titulo="Se nos enredó la conexión"
                  texto="Tus cambios siguen aquí en pantalla."
                />
                <button type="button" className="boton" onClick={reintentar}>Intentar de nuevo</button>
              </div>
            ) : (
              <p className="estado-guardado" role="status">{guardado}</p>
            )}
          </div>
        </aside>

        <div className="espacio-principal">
          {children}
          <div className="caja">
            <h2>Próxima sesión</h2>
            {sesion ? (
              <p style={{ fontFamily: 'var(--mono)', fontSize: '1.1rem', color: 'var(--e-acento-2)', textTransform: 'capitalize' }}>{sesion}</p>
            ) : (
              <EstadoVacio
                compacto
                tema="oleaje"
                titulo="Tu próxima sesión aún no tiene fecha"
                texto="Cuando la acuerden, aparecerá aquí."
              />
            )}
            <p className="suave" style={{ marginBottom: 14 }}>Si necesitas cambiarla, escríbele a Angela.</p>
            <a className="boton boton-primario" href={`https://wa.me/${whatsapp}`}>
              Escribir a Angela
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
