'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function FormEntrar() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [estado, setEstado] = useState<{ tipo: 'error' | 'info'; texto: string } | null>(null)
  const [enviando, setEnviando] = useState(false)

  const entrar = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return setEstado({ tipo: 'error', texto: 'Escribe tu correo y tu contraseña.' })
    setEnviando(true)
    setEstado(null)
    const res = await fetch('/api/pacientes/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    setEnviando(false)
    if (res.ok) {
      router.push('/mi-espacio')
      router.refresh()
    } else {
      setEstado({ tipo: 'error', texto: 'El correo o la contraseña no coinciden. Si tu cuenta es nueva, revisa el correo de invitación.' })
    }
  }

  const olvide = async () => {
    if (!email) return setEstado({ tipo: 'error', texto: 'Escribe tu correo arriba y vuelve a presionar.' })
    await fetch('/api/pacientes/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    // Misma respuesta exista o no la cuenta, para no revelar quién es paciente
    setEstado({ tipo: 'info', texto: 'Si ese correo tiene una cuenta, te llegará un enlace para crear una contraseña nueva.' })
  }

  return (
    <form className="formulario" onSubmit={entrar} noValidate>
      <h1 style={{ fontSize: '1.8rem' }}>Tu espacio</h1>
      <p className="texto-2" style={{ fontSize: '0.9rem' }}>
        Acceso para pacientes de Angela. Si aún no tienes cuenta, pídesela en tu próxima sesión.
      </p>
      <label className="campo">
        Correo
        <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label className="campo">
        Contraseña
        <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      {estado ? (
        <p role="status" className={`aviso${estado.tipo === 'error' ? ' aviso-error' : ''}`}>
          {estado.texto}
        </p>
      ) : null}
      <button type="submit" className="boton boton-primario" disabled={enviando}>
        {enviando ? 'Entrando…' : 'Entrar'}
      </button>
      <button type="button" className="enlace-boton" onClick={olvide}>
        Olvidé mi contraseña
      </button>
    </form>
  )
}
