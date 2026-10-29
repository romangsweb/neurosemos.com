import type { FieldHook } from 'payload'

export const aSlug = (texto: string): string =>
  texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** Si el slug está vacío, lo genera a partir del campo indicado (p. ej. `titulo`). */
export const slugDesde =
  (campo: string): FieldHook =>
  ({ value, data }) => {
    if (typeof value === 'string' && value.length) return aSlug(value)
    const fuente = data?.[campo]
    return typeof fuente === 'string' ? aSlug(fuente) : value
  }
