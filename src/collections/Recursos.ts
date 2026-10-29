import type { CollectionConfig } from 'payload'
import { recursoVisible, soloAdmin } from '../access'

/**
 * Meditaciones (audio), guías y ejercicios (PDF). Cada recurso ES el archivo:
 * así la misma regla de acceso protege la ficha y la descarga en R2.
 */
export const Recursos: CollectionConfig = {
  slug: 'recursos',
  labels: { singular: 'Recurso', plural: 'Recursos' },
  admin: {
    useAsTitle: 'titulo',
    group: 'Pacientes',
    defaultColumns: ['titulo', 'tipo', 'visibilidad', 'updatedAt'],
  },
  access: { read: recursoVisible, create: soloAdmin, update: soloAdmin, delete: soloAdmin },
  upload: {
    mimeTypes: ['audio/*', 'application/pdf'],
  },
  fields: [
    { name: 'titulo', label: 'Título', type: 'text', required: true },
    {
      name: 'tipo',
      type: 'select',
      required: true,
      defaultValue: 'meditacion',
      options: [
        { label: 'Meditación', value: 'meditacion' },
        { label: 'Guía', value: 'guia' },
        { label: 'Ejercicio', value: 'ejercicio' },
      ],
    },
    { name: 'descripcion', label: 'Descripción', type: 'textarea' },
    {
      name: 'duracionMin',
      label: 'Duración (min)',
      type: 'number',
      admin: { condition: (data) => data?.tipo === 'meditacion' },
    },
    {
      name: 'visibilidad',
      type: 'select',
      required: true,
      defaultValue: 'asignado',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Público (cualquier visitante)', value: 'publico' },
        { label: 'Todos los pacientes', value: 'pacientes' },
        { label: 'Solo asignado', value: 'asignado' },
      ],
    },
    {
      name: 'programas',
      type: 'relationship',
      relationTo: 'programas',
      hasMany: true,
      admin: {
        position: 'sidebar',
        description: 'Quienes estén en estos programas verán el recurso.',
        condition: (data) => data?.visibilidad === 'asignado',
      },
    },
  ],
}
