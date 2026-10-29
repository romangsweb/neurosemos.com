# Neurosemos v2

Sitio público y portal de pacientes de Neurosemos. Next.js 16 + Payload 3 sobre Cloudflare Workers (D1 + R2).

## Qué hay aquí

| Ruta | Qué es |
|---|---|
| `/` `/como-trabajo` `/neurodivergencia` `/diversidad` | Sitio público (dirección visual B: morado opaco, calmo) |
| `/talleres` `/blog` | Contenido que Angela edita en el admin |
| `/entrar` `/crear-contrasena` `/mi-espacio` | Portal de pacientes ("tu espacio") |
| `/admin` | Panel de Payload, solo para `users` |

### Colecciones

- **pacientes**: login propio, sin acceso al admin. Registro solo por invitación: al crearlo, recibe un correo para crear su contraseña (la que se escriba en el admin se descarta). **No guarda información clínica.**
- **recursos**: meditaciones (audio) y guías o ejercicios (PDF). Cada recurso es el archivo, y su visibilidad es `publico`, `pacientes` o `asignado` (directo o por programa). La regla vive en `src/access/index.ts → recursoVisible` y se aplica también a la descarga del archivo en R2.
- **programas**: grupos para asignar recursos en bloque.
- **posts**, **talleres**, **media**: contenido público.
- **ajustes-sitio** (global): WhatsApp, link de agenda, costo de sesión, cédula, formación y aviso de crisis.

## Desarrollo local

Requiere Node 22.23+ (o 24.22+) y pnpm.

```bash
pnpm install
cp .env.example .env          # y llena PAYLOAD_SECRET con: openssl rand -hex 32
pnpm payload migrate          # crea las tablas en el D1 local (.wrangler/)
pnpm dev                      # http://localhost:3000 → /admin para crear el primer admin
```

Sin `RESEND_API_KEY`, los correos (invitaciones) se imprimen en la consola.

## Primer despliegue (cuenta de Cloudflare)

```bash
pnpm wrangler login
pnpm wrangler d1 create neurosemos-db        # copia el database_id a wrangler.jsonc
pnpm wrangler r2 bucket create neurosemos-media
pnpm wrangler secret put PAYLOAD_SECRET      # openssl rand -hex 32 (distinto al local)
pnpm wrangler secret put RESEND_API_KEY
```

Los valores públicos de producción (dominio y remitente) están en `.env.production`, que sí se versiona porque no contiene secretos. El dominio del remitente debe estar verificado en Resend.

> Ojo: OpenNext incluye los archivos `.env` en el Worker al compilar. No pongas secretos de producción en `.env.production`. Después del primer deploy, confirma en el panel que `PAYLOAD_SECRET` del Worker es el secreto y no el valor de tu `.env` local.

Después:

```bash
pnpm run deploy        # migra D1 remoto y despliega el Worker
```

Luego entra a `https://neurosemos.com/admin`, crea la cuenta de Angela y llena **Ajustes del sitio**.

### Cambios de esquema

Cada vez que cambie una colección:

```bash
pnpm payload migrate:create nombre-del-cambio
pnpm generate:types
```

## Respaldo y portabilidad

- D1 tiene *Time Travel* (restauración a cualquier punto de los últimos 30 días en el plan de pago).
- Exportar todo: `pnpm wrangler d1 export neurosemos-db --remote --output respaldo.sql`.
- Para mover el proyecto a la cuenta de Angela: exportar D1, copiar el bucket R2 y volver a desplegar con sus bindings.

## Límites conocidos

- Sin `sharp` en Workers: no hay recorte ni punto focal de imágenes. Sube las imágenes ya optimizadas.
- GraphQL no está garantizado en Workers. El sitio usa la Local API y REST.
- El Worker pesa ~4 MB comprimido, así que requiere el plan de pago de Workers (límite de 10 MB).
- La autenticación por cookie exige cabeceras de navegador (`Origin` / `Sec-Fetch-Site`) como protección CSRF. Para scripts, usa `Authorization: JWT <token>`.

## Pendientes de contenido (Angela)

- Cédula, costo de sesión, link de agenda y formación en neurodivergencia y diversidad → **Ajustes del sitio**
- Textos marcados `[PENDIENTE]` en `/neurodivergencia`, `/diversidad` y `/aviso-de-privacidad`. El aviso debe validarlo alguien de legal (LFPDPPP, datos sensibles).
- Cargar los talleres, las meditaciones y las guías reales.
