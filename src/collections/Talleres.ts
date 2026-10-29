import type { CollectionConfig } from 'payload'
import { publico, soloAdmin } from '../access'
import { slugDesde } from '../hooks/slug'

export const Talleres: CollectionConfig = {
  slug: 'talleres',
  labels: { singular: 'Taller', plural: 'Talleres' },
  admin: { useAsTitle: 'titulo', group: 'Contenido', defaultColumns: ['titulo', 'estado', 'precio', 'orden'] },
  defaultSort: 'orden',
  access: { read: publico, create: soloAdmin, update: soloAdmin, delete: soloAdmin },
  fields: [
    { name: 'titulo', label: 'Título', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: { position: 'sidebar', description: 'Se genera solo a partir del título.' },
      hooks: { beforeValidate: [slugDesde('titulo')] },
    },
    { name: 'resumen', type: 'textarea', required: true },
    { name: 'descripcion', label: 'Descripción', type: 'richText' },
    { name: 'duracion', label: 'Duración', type: 'text', admin: { description: 'Ej. "4 sesiones × 2 h"' } },
    { name: 'precio', label: 'Precio (MXN)', type: 'number' },
    {
      name: 'estado',
      type: 'select',
      defaultValue: 'abierto',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Inscripciones abiertas', value: 'abierto' },
        { label: 'Próximamente', value: 'proximamente' },
        { label: 'Cupo lleno', value: 'completo' },
      ],
    },
    { name: 'fechaInicio', label: 'Fecha de inicio', type: 'date', admin: { position: 'sidebar' } },
    { name: 'imagen', type: 'upload', relationTo: 'media' },
    { name: 'orden', type: 'number', defaultValue: 10, admin: { position: 'sidebar' } },
  ],
}
