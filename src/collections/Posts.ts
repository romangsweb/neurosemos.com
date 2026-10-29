import type { CollectionConfig } from 'payload'
import { publicadoOAdmin, soloAdmin } from '../access'
import { slugDesde } from '../hooks/slug'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Artículo', plural: 'Blog' },
  admin: { useAsTitle: 'titulo', group: 'Contenido', defaultColumns: ['titulo', 'categoria', '_status', 'publicadoEn'] },
  defaultSort: '-publicadoEn',
  versions: { drafts: true },
  access: { read: publicadoOAdmin, create: soloAdmin, update: soloAdmin, delete: soloAdmin },
  fields: [
    { name: 'titulo', label: 'Título', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: { position: 'sidebar' },
      hooks: { beforeValidate: [slugDesde('titulo')] },
    },
    {
      name: 'categoria',
      label: 'Categoría',
      type: 'select',
      required: true,
      defaultValue: 'general',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Neurodivergencia', value: 'neurodivergencia' },
        { label: 'Diversidad', value: 'diversidad' },
        { label: 'Mindfulness', value: 'mindfulness' },
        { label: 'Ansiedad y ánimo', value: 'ansiedad' },
        { label: 'General', value: 'general' },
      ],
    },
    { name: 'publicadoEn', label: 'Fecha de publicación', type: 'date', admin: { position: 'sidebar' } },
    { name: 'extracto', type: 'textarea', required: true, maxLength: 220 },
    { name: 'portada', type: 'upload', relationTo: 'media' },
    { name: 'contenido', type: 'richText', required: true },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitulo', label: 'Meta título', type: 'text', maxLength: 60 },
        { name: 'metaDescripcion', label: 'Meta descripción', type: 'textarea', maxLength: 160 },
      ],
    },
  ],
}
