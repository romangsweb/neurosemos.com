import type { GlobalConfig } from 'payload'
import { publico, soloAdmin } from '../access'

/** Datos de contacto y consulta que Angela puede cambiar sin tocar código. */
export const AjustesSitio: GlobalConfig = {
  slug: 'ajustes-sitio',
  label: 'Ajustes del sitio',
  admin: { group: 'Configuración' },
  access: { read: publico, update: soloAdmin },
  fields: [
    { name: 'whatsapp', label: 'WhatsApp (con lada, solo números)', type: 'text', defaultValue: '5215542945205', required: true },
    { name: 'telefonoVisible', label: 'Teléfono como se muestra', type: 'text', defaultValue: '55 4294 5205' },
    { name: 'agendaUrl', label: 'Enlace para agendar (Google Calendar, Cal.com…)', type: 'text' },
    { name: 'costoSesion', label: 'Costo de sesión individual (MXN)', type: 'number' },
    { name: 'cedula', label: 'Cédula profesional', type: 'text' },
    { name: 'ubicacion', label: 'Ubicación del consultorio', type: 'text', defaultValue: 'CDMX' },
    {
      name: 'formacion',
      label: 'Formación en neurodivergencia y diversidad',
      type: 'textarea',
      admin: { description: 'Cursos o certificaciones que respaldan la especialidad. Se muestra en el inicio.' },
    },
    {
      name: 'lineaCrisis',
      label: 'Aviso de crisis (pie de página)',
      type: 'text',
      defaultValue: 'Si estás en crisis, este sitio no sustituye atención de emergencia. Línea de la Vida: 800 911 2000.',
    },
  ],
}
