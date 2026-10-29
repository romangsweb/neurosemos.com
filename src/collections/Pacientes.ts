import type { CollectionConfig } from 'payload'
import { adminOSiMisme, campoSoloAdmin, soloAdmin } from '../access'

const SITIO = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/**
 * Pacientes con acceso a "tu espacio". Registro solo por invitación: Angela crea la cuenta
 * y el paciente recibe un correo para crear su contraseña.
 *
 * IMPORTANTE: aquí no se guarda información clínica (notas, diagnósticos, motivo de consulta).
 * Solo lo necesario para dar acceso a contenido y personalizar el espacio.
 */
export const Pacientes: CollectionConfig = {
  slug: 'pacientes',
  labels: { singular: 'Paciente', plural: 'Pacientes' },
  admin: {
    useAsTitle: 'nombre',
    group: 'Pacientes',
    defaultColumns: ['nombre', 'email', 'activo', 'programas'],
    description:
      'Al crear un paciente se le envía un correo para crear su contraseña. La contraseña que escribas aquí se descarta.',
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    tokenExpiration: 60 * 60 * 24 * 14, // sesión de 14 días
    cookies: { sameSite: 'Lax', secure: process.env.NODE_ENV === 'production' },
    forgotPassword: {
      expiration: 1000 * 60 * 60 * 72, // el enlace dura 72 h
      generateEmailSubject: () => 'Tu espacio en Neurosemos',
      generateEmailHTML: (args) => {
        const token = args?.token ?? ''
        const nombre = (args?.user as { nombre?: string } | undefined)?.nombre ?? ''
        const url = `${SITIO}/crear-contrasena?token=${encodeURIComponent(token)}`
        return `
          <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #2B2435; max-width: 520px">
            <p>Hola${nombre ? ` ${nombre}` : ''}:</p>
            <p>Tienes acceso a tu espacio en Neurosemos, donde encontrarás las meditaciones y guías de tu proceso.</p>
            <p><a href="${url}" style="display: inline-block; background: #6A5490; color: #ffffff; padding: 12px 22px; border-radius: 999px; text-decoration: none">Crear mi contraseña</a></p>
            <p style="font-size: 14px; color: #5E5569">El enlace vence en 72 horas. Si no esperabas este correo, puedes ignorarlo.</p>
          </div>`
      },
    },
  },
  access: {
    // `admin` decide quién entra al panel: solo `users`
    admin: () => false,
    create: soloAdmin,
    read: adminOSiMisme,
    update: adminOSiMisme,
    delete: soloAdmin,
  },
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        // La contraseña la crea el paciente con el enlace del correo
        if (operation === 'create' && data) data.password = crypto.randomUUID() + crypto.randomUUID()
        return data
      },
    ],
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return doc
        try {
          await req.payload.forgotPassword({
            collection: 'pacientes',
            data: { email: doc.email },
            req,
          })
        } catch (err) {
          req.payload.logger.error({ err, msg: 'No se pudo enviar la invitación al paciente' })
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'nombre',
      label: 'Nombre con el que quiere que le llamen',
      type: 'text',
      required: true,
    },
    { name: 'pronombres', type: 'text', admin: { description: 'Ej. ella, él, elle' } },
    {
      name: 'activo',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar', description: 'Desmárcalo para retirar el acceso sin borrar la cuenta.' },
      access: { create: campoSoloAdmin, update: campoSoloAdmin },
    },
    {
      name: 'programas',
      type: 'relationship',
      relationTo: 'programas',
      hasMany: true,
      admin: { position: 'sidebar' },
      access: { create: campoSoloAdmin, update: campoSoloAdmin },
    },
    {
      name: 'recursosAsignados',
      label: 'Recursos asignados',
      type: 'relationship',
      relationTo: 'recursos',
      hasMany: true,
      access: { create: campoSoloAdmin, update: campoSoloAdmin },
    },
    {
      name: 'proximaSesion',
      label: 'Próxima sesión',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
      access: { create: campoSoloAdmin, update: campoSoloAdmin },
    },
    {
      name: 'perfil',
      label: 'Personalización (la edita el paciente)',
      type: 'group',
      fields: [
        {
          name: 'tema',
          type: 'select',
          defaultValue: 'lavanda',
          options: [
            { label: 'Lavanda', value: 'lavanda' },
            { label: 'Neo', value: 'neo' },
            { label: 'Bosque', value: 'bosque' },
            { label: 'Alto contraste', value: 'contraste' },
          ],
        },
        {
          name: 'letra',
          type: 'select',
          defaultValue: 'legible',
          options: [
            { label: 'Hiperlegible', value: 'legible' },
            { label: 'Mono', value: 'mono' },
            { label: 'Serif', value: 'serif' },
          ],
        },
        { name: 'bateria', label: 'Batería social', type: 'number', min: 1, max: 5 },
        {
          name: 'anclas',
          type: 'array',
          maxRows: 8,
          fields: [{ name: 'texto', type: 'text', required: true, maxLength: 80 }],
        },
      ],
    },
  ],
}
