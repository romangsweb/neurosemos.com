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
      name: 'credenciales',
      label: 'Respaldo profesional (franja bajo el inicio)',
      type: 'array',
      maxRows: 6,
      admin: { description: 'Sustituye a los testimonios, que los códigos de ética desaconsejan pedir a pacientes.' },
      defaultValue: [
        { valor: '+10 años', descripcion: 'de práctica clínica' },
        { valor: 'Docencia', descripcion: 'universitaria en psicología clínica' },
        { valor: 'Salud comunitaria', descripcion: 'intervención en crisis y prevención' },
      ],
      fields: [
        { name: 'valor', type: 'text', required: true, maxLength: 24 },
        { name: 'descripcion', label: 'Descripción', type: 'text', required: true, maxLength: 60 },
      ],
    },
    {
      name: 'preguntas',
      label: 'Preguntas frecuentes',
      type: 'array',
      maxRows: 12,
      defaultValue: [
        { pregunta: '¿Lo que hablo en terapia es confidencial?', respuesta: 'Sí, con las excepciones que marca la ley ante riesgo para tu vida o la de otras personas. Te las explicamos en la primera sesión.' },
        { pregunta: '¿Necesito diagnóstico de TDAH o autismo?', respuesta: 'No. Puedes venir con o sin diagnóstico. Si quieres explorar una evaluación, lo platicamos y te orientamos.' },
        { pregunta: '¿Presencial o en línea?', respuesta: 'Las dos. Mismo enfoque; eliges lo que mejor te funcione y puedes cambiar después.' },
      ],
      fields: [
        { name: 'pregunta', type: 'text', required: true },
        { name: 'respuesta', type: 'textarea', required: true },
      ],
    },
    {
      name: 'lineaCrisis',
      label: 'Aviso de crisis (pie de página)',
      type: 'text',
      defaultValue: 'Si estás en crisis, este sitio no sustituye atención de emergencia. Línea de la Vida: 800 911 2000.',
    },
  ],
}
