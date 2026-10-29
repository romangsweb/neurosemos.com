import type { Metadata } from 'next'
import { FormCrearContrasena } from '@/components/FormCrearContrasena'

export const metadata: Metadata = { title: 'Crea tu contraseña', robots: { index: false } }

export default async function CrearContrasena({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams
  return (
    <div className="contenedor">
      <FormCrearContrasena token={token ?? ''} />
    </div>
  )
}
