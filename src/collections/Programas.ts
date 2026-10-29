import type { CollectionConfig } from 'payload'
import { soloAdmin } from '../access'

/** Grupos para asignar recursos en bloque: "Taller Serenidad — gen 3", "Pacientes TDAH", etc. */
export const Programas: CollectionConfig = {
  slug: 'programas',
  labels: { singular: 'Programa', plural: 'Programas' },
  admin: { useAsTitle: 'nombre', group: 'Pacientes' },
  access: { read: soloAdmin, create: soloAdmin, update: soloAdmin, delete: soloAdmin },
  fields: [
    { name: 'nombre', type: 'text', required: true },
    { name: 'descripcion', label: 'Descripción', type: 'textarea' },
  ],
}
