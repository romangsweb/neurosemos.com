import type { CollectionConfig } from 'payload'
import { publico, soloAdmin } from '../access'

/** Imágenes públicas: blog, talleres, fotos del sitio. Súbelas ya optimizadas (webp/jpg < 400 KB). */
export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Imagen', plural: 'Imágenes' },
  admin: { group: 'Contenido' },
  access: { read: publico, create: soloAdmin, update: soloAdmin, delete: soloAdmin },
  fields: [{ name: 'alt', label: 'Texto alternativo', type: 'text', required: true }],
  upload: {
    mimeTypes: ['image/*'],
    // Sin `sharp` en Workers: no hay recorte ni punto focal
    crop: false,
    focalPoint: false,
  },
}
