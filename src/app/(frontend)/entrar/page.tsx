import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { FormEntrar } from '@/components/FormEntrar'
import { getPaciente } from '@/lib/payload'

export const metadata: Metadata = { title: 'Acceso pacientes', robots: { index: false } }

export default async function Entrar() {
  if (await getPaciente()) redirect('/mi-espacio')
  return (
    <div className="contenedor">
      <FormEntrar />
    </div>
  )
}
