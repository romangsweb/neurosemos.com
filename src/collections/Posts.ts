import type { CollectionConfig } from 'payload'
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import { publicadoOAdmin, soloAdmin } from '../access'
import { slugDesde } from '../hooks/slug'
import { ANIMACION_POR_CATEGORIA, OPCIONES_ANIMACION } from '../lib/animaciones'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Artículo', plural: 'Blog' },
  admin: { useAsTitle: 'titulo', group: 'Contenido', defaultColumns: ['titulo', 'categoria', '_status', 'publicadoEn'] },
  defaultSort: '-publicadoEn',
  versions: { drafts: true },
  access: { read: publicadoOAdmin, create: soloAdmin, update: soloAdmin, delete: soloAdmin },
  hooks: {
    beforeValidate: [
      async ({ data, originalDoc, req }) => {
        if (!data) return data
        // Build SEO Studio manda Markdown: se convierte a Lexical solo si cambió,
        // para no pisar ediciones que Angela haga después en el editor.
        const md = data.markdownFuente
        if (typeof md === 'string' && md.trim() && md !== originalDoc?.markdownFuente) {
          const editorConfig = await editorConfigFactory.default({ config: req.payload.config })
          data.contenido = convertMarkdownToLexical({ editorConfig, markdown: md })
        }
        return data
      },
    ],
  },
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
        { label: 'Vínculos', value: 'vinculos' },
        { label: 'General', value: 'general' },
      ],
    },
    { name: 'publicadoEn', label: 'Fecha de publicación', type: 'date', admin: { position: 'sidebar' } },
    { name: 'extracto', type: 'textarea', required: true, maxLength: 220 },
    {
      name: 'animacion',
      label: 'Animación de portada',
      type: 'select',
      options: OPCIONES_ANIMACION,
      admin: {
        description: 'Si no eliges una, se usa la del tema del artículo. Si subes una imagen de portada, la imagen tiene prioridad.',
      },
      hooks: {
        beforeChange: [({ value, siblingData }) => value || ANIMACION_POR_CATEGORIA[siblingData?.categoria] || 'desenredar'],
      },
    },
    {
      name: 'minutosLectura',
      label: 'Minutos de lectura',
      type: 'number',
      admin: { position: 'sidebar', description: 'Opcional. Ej. 5' },
    },
    { name: 'portada', label: 'Imagen de portada (opcional)', type: 'upload', relationTo: 'media' },
    { name: 'contenido', type: 'richText', required: true },
    {
      name: 'markdownFuente',
      label: 'Markdown de origen',
      type: 'textarea',
      admin: { position: 'sidebar', description: 'Lo llena Build SEO Studio. Para editar a mano, usa el editor de contenido.' },
    },
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
