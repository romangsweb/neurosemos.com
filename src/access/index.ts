import type { Access, FieldAccess, Where } from 'payload'

type AnyUser = { id: number | string; collection?: string; activo?: boolean | null } | null | undefined

/** Admin = cualquier cuenta de la colección `users` (Angela y soporte técnico). */
export const esAdmin = (user: AnyUser): boolean => user?.collection === 'users'

/** Paciente con cuenta activa. */
export const esPacienteActivo = (user: AnyUser): boolean =>
  user?.collection === 'pacientes' && user.activo !== false

export const soloAdmin: Access = ({ req: { user } }) => esAdmin(user as AnyUser)

export const campoSoloAdmin: FieldAccess = ({ req: { user } }) => esAdmin(user as AnyUser)

export const publico: Access = () => true

/** Admin ve todo; un paciente solo su propio registro. */
export const adminOSiMisme: Access = ({ req: { user } }) => {
  const u = user as AnyUser
  if (esAdmin(u)) return true
  if (u?.collection === 'pacientes') return { id: { equals: u.id } }
  return false
}

/** Posts: el público solo ve publicados; admin ve también borradores. */
export const publicadoOAdmin: Access = ({ req: { user } }) => {
  if (esAdmin(user as AnyUser)) return true
  return { _status: { equals: 'published' } }
}

const ids = (rel: unknown): (number | string)[] =>
  Array.isArray(rel)
    ? rel.map((r) => (typeof r === 'object' && r !== null ? (r as { id: number | string }).id : (r as number | string)))
    : []

/**
 * Quién puede ver (y descargar) un recurso. Se aplica a la lista, a cada documento
 * y también a la descarga del archivo en R2, porque los archivos se sirven a través de Payload.
 *
 * - publico   → cualquiera
 * - pacientes → cualquier paciente con cuenta activa
 * - asignado  → solo pacientes a quienes se les asignó directo o por programa
 */
export const recursoVisible: Access = ({ req: { user } }) => {
  const u = user as (AnyUser & { recursosAsignados?: unknown; programas?: unknown }) | null
  if (esAdmin(u)) return true

  const esPublico: Where = { visibilidad: { equals: 'publico' } }
  if (!u || !esPacienteActivo(u)) return esPublico

  const condiciones: Where[] = [esPublico, { visibilidad: { equals: 'pacientes' } }]
  const asignados = ids(u.recursosAsignados)
  const programas = ids(u.programas)
  if (asignados.length) condiciones.push({ id: { in: asignados } })
  if (programas.length) condiciones.push({ programas: { in: programas } })
  return { or: condiciones }
}
