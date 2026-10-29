import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers.js'
import { cache } from 'react'
import config from '@payload-config'
import type { AjustesSitio, Paciente } from '@/payload-types'

export const getPayloadClient = cache(async () => getPayload({ config: await config }))

export const getAjustes = cache(async (): Promise<AjustesSitio> => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'ajustes-sitio', depth: 0 })
})

/** Devuelve el paciente con sesión iniciada, o null (también si la cuenta está inactiva). */
export const getPaciente = cache(async (): Promise<Paciente | null> => {
  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: await getHeaders() })
  if (!user || user.collection !== 'pacientes') return null
  const paciente = user as Paciente & { collection: 'pacientes' }
  return paciente.activo === false ? null : paciente
})

export const urlWhatsApp = (numero: string, texto?: string) =>
  `https://wa.me/${numero}${texto ? `?text=${encodeURIComponent(texto)}` : ''}`

export const formatoMXN = (n?: number | null) =>
  typeof n === 'number' ? `$${n.toLocaleString('es-MX')} MXN` : null
