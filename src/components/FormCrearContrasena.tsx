'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function FormCrearContrasena({ token }: { token: string }) {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 10) return setError('Usa al menos 10 caracteres. Una frase corta funciona bien.')
    if (password !== confirmar) return setError('Las dos contraseñas no coinciden.')
    setEnviando(true)
    setError(null)
    const res = await fetch('/api/pacientes/reset-password', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    })
    setEnviando(false)
    if (res.ok) {
      router.push('/mi-espacio')
      router.refresh()
    } else {
      setError('El enlace ya no es válido o venció. Pide uno nuevo desde "Olvidé mi contraseña".')
    }
  }

  if (!token) {
    return (
      <div className="formulario">
        <h1 style={{ fontSize: '1.8rem' }}>Enlace incompleto</h1>
        <p className="texto-2">Abre el enlace completo del correo, o pide uno nuevo desde la página de acceso.</p>
        <a className="boton boton-secundario" href="/entrar">Ir a la página de acceso</a>
      </div>
    )
  }

  return (
    <form className="formulario" onSubmit={guardar} noValidate>
      <h1 style={{ fontSize: '1.8rem' }}>Crea tu contraseña</h1>
      <p className="texto-2" style={{ fontSize: '0.9rem' }}>Con ella entrarás a tu espacio de meditaciones y guías.</p>
      <label className="campo">
        Contraseña nueva
        <input type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label className="campo">
        Escríbela otra vez
        <input type="password" autoComplete="new-password" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} />
      </label>
      {error ? <p role="alert" className="aviso aviso-error">{error}</p> : null}
      <button type="submit" className="boton boton-primario" disabled={enviando}>
        {enviando ? 'Guardando…' : 'Guardar y entrar'}
      </button>
    </form>
  )
}
