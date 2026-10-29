import Link from 'next/link'
import { AjustesLectura } from '@/components/AjustesLectura'
import { formatoMXN, getAjustes, getPayloadClient, urlWhatsApp } from '@/lib/payload'


const iconoNeuro = (
  <svg className="icono" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
  </svg>
)
const iconoCorazon = (
  <svg className="icono" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
  </svg>
)
const iconoOlas = (
  <svg className="icono" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
    <path d="M3 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
  </svg>
)

export default async function Inicio() {
  const [ajustes, payload] = await Promise.all([getAjustes(), getPayloadClient()])
  const [talleres, posts] = await Promise.all([
    payload.find({ collection: 'talleres', limit: 3, sort: 'orden', depth: 0 }),
    payload.find({ collection: 'posts', limit: 3, sort: '-publicadoEn', depth: 1, where: { _status: { equals: 'published' } } }),
  ])
  const whatsapp = urlWhatsApp(ajustes.whatsapp, 'Hola, me gustaría agendar una primera consulta.')
  const agenda = ajustes.agendaUrl || whatsapp

  return (
    <>
      <section className="contenedor hero">
        <div className="hero-texto">
          <p className="etiqueta">Psicoterapia en CDMX y en línea</p>
          <h1>Terapia que se adapta a cómo funciona tu mente</h1>
          <p className="lead">
            Terapia cognitivo conductual y mindfulness compasivo, con un enfoque neuroafirmativo y afirmativo LGBTQ+. Un
            espacio donde no tienes que explicar ni justificar quién eres antes de empezar.
          </p>
          <div className="botones">
            <a href={agenda} className="boton boton-primario">
              Agendar primera consulta
            </a>
            <a href={whatsapp} className="boton boton-secundario">
              Escribir por WhatsApp
            </a>
          </div>
          <AjustesLectura />
        </div>
        <div className="tarjeta-perfil">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/angela.jpg" alt="Angela Beatriz Ojeda Patiño, psicoterapeuta" />
          <div>
            <p className="nombre">Angela Beatriz Ojeda Patiño</p>
            <p className="texto-2">Psicoterapeuta{ajustes.cedula ? ` · Cédula ${ajustes.cedula}` : ''}</p>
            <div className="chips">
              <span className="chip">+10 años de práctica clínica</span>
              <span className="chip">Presencial y Zoom</span>
              <span className="chip chip-salvia">Aceptando pacientes</span>
            </div>
          </div>
        </div>
      </section>

      <section className="seccion seccion-blanca">
        <div className="contenedor">
          <div className="intro">
            <h2>¿Para quién es este espacio?</h2>
            <p>Trabajo con personas adultas que buscan entenderse mejor, sin que la terapia intente “corregir” su forma de ser.</p>
          </div>
          <div className="rejilla">
            <Link href="/neurodivergencia" className="tarjeta articulo-tarjeta">
              {iconoNeuro}
              <h3>Personas neurodivergentes</h3>
              <p>TDAH, autismo y AuDHD, con o sin diagnóstico formal. Estrategias de TCC adaptadas a tu manera de procesar, no al revés.</p>
            </Link>
            <Link href="/diversidad" className="tarjeta articulo-tarjeta">
              {iconoCorazon}
              <h3>Comunidad LGBTQ+</h3>
              <p>Terapia afirmativa: tu identidad no es el problema a tratar. Tu nombre y tus pronombres se respetan desde el primer mensaje.</p>
            </Link>
            <Link href="/como-trabajo" className="tarjeta articulo-tarjeta">
              {iconoOlas}
              <h3>Ansiedad, ánimo y estrés</h3>
              <p>Ansiedad, depresión, burnout, crisis emocionales y adicciones, con técnicas basadas en evidencia y mucha compasión.</p>
            </Link>
          </div>
          {ajustes.formacion ? <p className="nota">Formación: {ajustes.formacion}</p> : null}
        </div>
      </section>

      <section className="seccion contenedor">
        <div className="intro">
          <h2>Cómo trabajamos</h2>
          <p>Sin sorpresas: sabes qué pasa en cada etapa. Sesiones de 50 minutos, presenciales en CDMX o por Zoom.</p>
        </div>
        <ol className="pasos">
          <li className="tarjeta-borde">
            <span className="numero">01</span>
            <h3>Primer mensaje</h3>
            <p>Por WhatsApp o agenda en línea, lo que te resulte menos pesado. Resolvemos dudas antes de comprometerte.</p>
          </li>
          <li className="tarjeta-borde">
            <span className="numero">02</span>
            <h3>Evaluación inicial</h3>
            <p>Conocemos tu historia y lo que necesitas hoy. Puedes pedir ajustes: luz, cámara apagada, pausas.</p>
          </li>
          <li className="tarjeta-borde">
            <span className="numero">03</span>
            <h3>Plan a tu medida</h3>
            <p>Objetivos claros, técnicas concretas y un ritmo flexible que acordamos entre las dos partes.</p>
          </li>
          <li className="tarjeta-borde">
            <span className="numero">04</span>
            <h3>Proceso y recursos</h3>
            <p>Sesiones semanales, más meditaciones y guías en tu espacio privado para practicar entre sesiones.</p>
          </li>
        </ol>
        <div className="chips" style={{ marginTop: 24 }}>
          {formatoMXN(ajustes.costoSesion) ? <span className="chip">Sesión individual: {formatoMXN(ajustes.costoSesion)}</span> : null}
          <span className="chip">TCC · Mindfulness compasivo · ACT</span>
        </div>
      </section>

      <section className="contenedor" style={{ paddingBottom: 80 }} aria-labelledby="portal-titulo">
        <div className="bloque-oscuro">
          <div style={{ flex: '999 1 420px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p className="etiqueta">Para pacientes</p>
            <h2 id="portal-titulo">Tus meditaciones y guías, en un espacio que es tuyo</h2>
            <p>
              Cada paciente recibe acceso a su biblioteca: grabaciones de meditación, guías y ejercicios entre sesiones. Y lo
              decoras como quieras: colores, tipografía, tus anclas. Solo tú lo ves.
            </p>
            <div>
              <Link href="/mi-espacio" className="boton">
                Entrar a tu espacio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {talleres.docs.length ? (
        <section className="seccion seccion-blanca">
          <div className="contenedor">
            <div className="intro">
              <h2>Talleres grupales</h2>
              <p>Espacios pequeños para aprender y practicar en compañía.</p>
            </div>
            <div className="rejilla">
              {talleres.docs.map((t) => (
                <Link key={t.id} href={`/talleres/${t.slug}`} className="tarjeta-borde articulo-tarjeta">
                  {t.duracion ? <span className="chip chip-salvia" style={{ alignSelf: 'flex-start' }}>{t.duracion}</span> : null}
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
        <section className="seccion contenedor">
          <div className="intro">
            <h2>Recursos abiertos</h2>
            <p>Artículos para entender lo que vives, escritos sin tecnicismos.</p>
          </div>
          <div className="rejilla">
            {posts.docs.map((p) => (
              <Link key={p.id} href={`/blog/${p.slug}`} className="articulo-tarjeta">
                {typeof p.portada === 'object' && p.portada?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="portada" src={p.portada.url} alt={p.portada.alt} />
                ) : (
                  <div className="portada" />
                )}
                <span className="etiqueta">{p.categoria}</span>
                <h3>{p.titulo}</h3>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="contenedor" style={{ paddingBottom: 88 }}>
        <div className="llamado">
          <h2>Dar el primer paso puede ser un mensaje corto</h2>
          <p className="texto-2">Escribe cuando te sientas listx. No necesitas tener claro qué decir.</p>
          <div className="botones" style={{ justifyContent: 'center' }}>
            <a href={agenda} className="boton boton-primario">
              Agendar primera consulta
            </a>
            <a href={whatsapp} className="boton boton-secundario">
              WhatsApp {ajustes.telefonoVisible}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
