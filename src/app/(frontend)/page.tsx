import Link from 'next/link'
import { AjustesLectura } from '@/components/AjustesLectura'
import { Animacion } from '@/components/Animacion'
import { Portada } from '@/components/Portada'
import { NOMBRE_CATEGORIA, type TemaAnimacion } from '@/lib/animaciones'
import { formatoMXN, getAjustes, getPayloadClient, urlWhatsApp } from '@/lib/payload'

/**
 * Inicio v2. Estructura de landing (navbar → hero → prueba social → CTA → beneficios con
 * objeciones → CTA → footer), adaptada a una consulta de psicoterapia.
 */

type Beneficio = {
  id: string
  etiqueta: string
  titulo: string
  texto: string
  objecion: string
  respuesta: string
  animacion: TemaAnimacion
  enlace?: { href: string; texto: string }
}

const BENEFICIOS: Beneficio[] = [
  {
    id: 'neurodivergencia',
    etiqueta: 'Neurodivergencia',
    titulo: 'Terapia que no intenta corregir tu forma de ser',
    texto:
      'TDAH, autismo y AuDHD en la adultez. Trabajamos con lo que a ti te causa malestar —sobrecarga, agotamiento por enmascarar, organización— con estrategias adaptadas a cómo procesas.',
    objecion: '¿Necesito un diagnóstico?',
    respuesta: 'No. Puedes venir con o sin diagnóstico formal.',
    animacion: 'rutas',
    enlace: { href: '/neurodivergencia', texto: 'Más sobre neurodivergencia' },
  },
  {
    id: 'diversidad',
    etiqueta: 'Diversidad sexual y de género',
    titulo: 'Tu identidad no es el problema a tratar',
    texto:
      'Terapia afirmativa para personas LGBTQ+ y para quienes están explorando. Usamos tu nombre y tus pronombres desde el primer mensaje.',
    objecion: '¿Tendré que explicarle todo a mi terapeuta?',
    respuesta: 'No. No vas a dedicar tu sesión a educar a nadie.',
    animacion: 'espectro',
    enlace: { href: '/diversidad', texto: 'Más sobre terapia afirmativa' },
  },
  {
    id: 'ansiedad',
    etiqueta: 'Ansiedad, ánimo y estrés',
    titulo: 'Herramientas concretas, no solo hablar',
    texto:
      'La terapia cognitivo conductual tiene objetivos claros y medibles. Aprendes a identificar los pensamientos que te enredan y a responderles distinto.',
    objecion: '¿Cuánto dura un proceso?',
    respuesta: 'Lo definimos juntes al inicio y lo revisamos en el camino.',
    animacion: 'desenredar',
    enlace: { href: '/como-trabajo', texto: 'Cómo trabajo' },
  },
  {
    id: 'ajustes',
    etiqueta: 'Sesiones a tu medida',
    titulo: 'Ajustes sensoriales y de comunicación, sin pedir permiso',
    texto:
      'Cámara apagada, luz baja, pausas, resúmenes por escrito después de la sesión y contacto por mensaje si hablar por teléfono te cuesta.',
    objecion: '¿Y si las sesiones me agotan?',
    respuesta: 'Ajustamos ritmo, formato y duración contigo.',
    animacion: 'oleaje',
  },
  {
    id: 'espacio',
    etiqueta: 'Entre sesiones',
    titulo: 'Tus meditaciones y guías, en tu propio espacio',
    texto:
      'Cada paciente tiene acceso a grabaciones de meditación, guías y ejercicios asignados para practicar a su ritmo. Lo personalizas como quieras y solo tú lo ves.',
    objecion: '¿Alguien más puede ver mi espacio?',
    respuesta: 'No. Solo tú, y ahí no se guardan notas de tus sesiones.',
    animacion: 'respirar',
    enlace: { href: '/mi-espacio', texto: 'Entrar a tu espacio' },
  },
]

export default async function Inicio() {
  const [ajustes, payload] = await Promise.all([getAjustes(), getPayloadClient()])
  const [talleres, posts] = await Promise.all([
    payload.find({ collection: 'talleres', limit: 3, sort: 'orden', depth: 0 }),
    payload.find({ collection: 'posts', limit: 3, sort: '-publicadoEn', depth: 1, where: { _status: { equals: 'published' } } }),
  ])
  const whatsapp = urlWhatsApp(ajustes.whatsapp, 'Hola, me gustaría agendar una primera consulta.')
  const dudas = urlWhatsApp(ajustes.whatsapp, 'Hola, tengo algunas dudas antes de agendar.')
  const agenda = ajustes.agendaUrl || whatsapp
  const costo = formatoMXN(ajustes.costoSesion)
  const preguntas = [
    ...(costo ? [{ pregunta: '¿Cuánto cuesta una sesión?', respuesta: `Sesión individual: ${costo}. Te compartimos los datos de pago al agendar.` }] : []),
    ...(ajustes.preguntas ?? []),
  ]

  return (
    <>
      <section className="contenedor hero" id="inicio">
        <div className="hero-texto">
          <p className="etiqueta">Psicoterapia · CDMX y en línea</p>
          <h1>Psicoterapia para personas neurodivergentes y LGBTQ+. Sin tener que explicar quién eres.</h1>
          <p className="lead">
            Terapia cognitivo conductual y mindfulness compasivo con Angela Ojeda, psicoterapeuta con más de 10 años de
            práctica. Adaptamos cada sesión a tu forma de procesar, presencial en CDMX o por Zoom.
          </p>
          <div className="botones">
            <a href={agenda} className="boton boton-primario">
              Agendar primera consulta
            </a>
            <a href={dudas} className="boton boton-secundario">
              Resolver dudas por WhatsApp
            </a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p className="texto-2" style={{ fontSize: '0.85rem' }}>
              ¿Qué te trae por aquí?
            </p>
            <nav className="rutas-visita" aria-label="Elige tu camino">
              <a href="#neurodivergencia">Soy o creo ser neurodivergente →</a>
              <a href="#diversidad">Soy parte de la comunidad LGBTQ+ →</a>
              <a href="#ansiedad">Vivo con ansiedad o agotamiento →</a>
            </nav>
          </div>
          <AjustesLectura />
        </div>
        <div className="tarjeta-perfil">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/angela.jpg" alt="Angela Beatriz Ojeda Patiño, psicoterapeuta" />
          <div>
            <p className="nombre">Angela Beatriz Ojeda Patiño</p>
            <p className="texto-2">Psicoterapeuta{ajustes.cedula ? ` · Cédula ${ajustes.cedula}` : ''}</p>
            <p className="etiqueta" style={{ marginTop: 6 }}>
              Aceptando pacientes nuevos
            </p>
          </div>
        </div>
      </section>

      {ajustes.credenciales?.length ? (
        <section className="seccion-blanca" aria-label="Respaldo profesional">
          <div className="contenedor credenciales">
            {ajustes.credenciales.map((c) => (
              <div key={c.id ?? c.valor}>
                <strong>{c.valor}</strong>
                {c.descripcion}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="contenedor" style={{ paddingBlock: 40 }}>
        <div className="banda-cta">
          <p style={{ fontSize: '1.05rem', maxWidth: 720 }}>
            La primera conversación es para conocernos. Resolvemos tus dudas antes de que te comprometas a un proceso.
          </p>
          <a href={agenda} className="boton boton-primario">
            Agendar primera consulta
          </a>
        </div>
      </section>

      <section className="contenedor" style={{ paddingBlock: '40px 24px' }} aria-labelledby="beneficios-titulo">
        <div className="intro">
          <h2 id="beneficios-titulo">Lo que cambia cuando la terapia parte de ti</h2>
          <p>Cada punto responde a algo que las personas nos dicen que casi les impidió empezar.</p>
        </div>
        <div className="beneficios">
          {BENEFICIOS.map((b) => (
            <div key={b.id} id={b.id} className="beneficio">
              <div className="beneficio-texto">
                <p className="etiqueta">{b.etiqueta}</p>
                <h3>{b.titulo}</h3>
                <p className="texto-2">{b.texto}</p>
                <p className="objecion">
                  <b>{b.objecion}</b> {b.respuesta}
                </p>
                {b.enlace ? (
                  <Link href={b.enlace.href} style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                    {b.enlace.texto} →
                  </Link>
                ) : null}
              </div>
              <div className="lienzo-anim">
                <Animacion tema={b.animacion} alto={300} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="seccion seccion-blanca" id="como" style={{ marginTop: 56 }}>
        <div className="contenedor" style={{ display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 340px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <h2>Cómo empezar</h2>
            <p className="texto-2">
              Sesiones de 50 minutos, presenciales en {ajustes.ubicacion || 'CDMX'} o por Zoom.
              {costo ? ` Sesión individual: ${costo}.` : ''}
            </p>
            <div>
              <a href={agenda} className="boton boton-primario">
                Agendar primera consulta
              </a>
            </div>
          </div>
          <ol className="pasos-2" style={{ flex: '999 1 560px', minWidth: 0 }}>
            {[
              ['Escribes o agendas', 'Por WhatsApp o en línea, lo que te sea menos pesado.'],
              ['Evaluación inicial', 'Conocemos tu historia y lo que necesitas hoy.'],
              ['Plan a tu medida', 'Objetivos claros, técnicas concretas y un ritmo flexible.'],
              ['Proceso y práctica', 'Sesiones semanales y recursos en tu espacio para practicar.'],
            ].map(([titulo, texto], i) => (
              <li key={titulo}>
                <span className="numero">{String(i + 1).padStart(2, '0')}</span>
                <p style={{ fontWeight: 700, margin: '6px 0 4px' }}>{titulo}</p>
                <p className="texto-2" style={{ fontSize: '0.9rem' }}>
                  {texto}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {preguntas.length ? (
        <section className="seccion contenedor" id="preguntas" style={{ display: 'flex', flexWrap: 'wrap', gap: 48 }}>
          <div style={{ flex: '1 1 300px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h2>Preguntas antes de empezar</h2>
            <p className="texto-2">Si te queda alguna, escríbenos. Ninguna pregunta es demasiado pequeña.</p>
          </div>
          <div className="faq" style={{ flex: '999 1 560px', minWidth: 0 }}>
            {preguntas.map((p, i) => (
              <details key={p.pregunta} open={i === 0}>
                <summary>{p.pregunta}</summary>
                <p>{p.respuesta}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      {talleres.docs.length ? (
        <section className="seccion seccion-blanca" id="talleres">
          <div className="contenedor">
            <div className="intro">
              <h2>Talleres grupales</h2>
              <p>Espacios pequeños para aprender y practicar en compañía.</p>
            </div>
            <div className="rejilla">
              {talleres.docs.map((t) => (
                <Link key={t.id} href={`/talleres/${t.slug}`} className="tarjeta-borde articulo-tarjeta">
                  {t.duracion ? (
                    <span className="chip chip-salvia" style={{ alignSelf: 'flex-start' }}>
                      {t.duracion}
                    </span>
                  ) : null}
                  <h3>{t.titulo}</h3>
                  <p>{t.resumen}</p>
                  {formatoMXN(t.precio) ? <p className="precio">{formatoMXN(t.precio)}</p> : null}
                </Link>
              ))}
            </div>
            <p className="nota">
              <Link href="/talleres">Ver todos los talleres</Link>
            </p>
          </div>
        </section>
      ) : null}

      {posts.docs.length ? (
        <section className="seccion contenedor" aria-labelledby="blog-titulo">
          <div className="intro">
            <h2 id="blog-titulo">Del blog</h2>
            <p>Para entender lo que vives, sin tecnicismos.</p>
          </div>
          <div className="rejilla">
            {posts.docs.map((p) => (
              <Link key={p.id} href={`/blog/${p.slug}`} className="articulo-tarjeta">
                <Portada post={p} alto={180} />
                <span className="etiqueta">
                  {NOMBRE_CATEGORIA[p.categoria] ?? p.categoria}
                  {p.minutosLectura ? ` · ${p.minutosLectura} min` : ''}
                </span>
                <h3>{p.titulo}</h3>
              </Link>
            ))}
          </div>
          <p className="nota">
            <Link href="/blog">Ir al blog →</Link>
          </p>
        </section>
      ) : null}

      <section className="contenedor" id="agendar" style={{ paddingBottom: 88 }}>
        <div className="cierre">
          <h2>Empieza con una conversación, a tu ritmo</h2>
          <p style={{ maxWidth: 560 }}>Escribe cuando te sientas preparade. No necesitas tener claro qué decir.</p>
          <div className="botones" style={{ justifyContent: 'center' }}>
            <a href={agenda} className="boton boton-claro">
              Agendar primera consulta
            </a>
            <a href={dudas} className="boton boton-borde">
              WhatsApp {ajustes.telefonoVisible}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
