import type { CollectionConfig } from 'payload'
import { soloAdmin } from '../access'

/** Cuentas con acceso al panel de administración (Angela y soporte técnico). */
export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Administrador', plural: 'Administradores' },
  admin: { useAsTitle: 'email', group: 'Configuración' },
  auth: { maxLoginAttempts: 5, lockTime: 15 * 60 * 1000 },
  access: {
    read: soloAdmin,
    create: soloAdmin,
    update: soloAdmin,
    delete: soloAdmin,
  },
  fields: [{ name: 'nombre', type: 'text' }],
}
