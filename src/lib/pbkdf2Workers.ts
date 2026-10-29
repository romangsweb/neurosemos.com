/**
 * PBKDF2 compatible con Cloudflare Workers.
 *
 * Payload 3.9x cifra las contraseñas con PBKDF2-SHA256 de 600 000 iteraciones
 * (corrección del CVE-2026-105804). Workers en producción rechaza el PBKDF2 nativo
 * por encima de 100 000 iteraciones:
 *   NotSupportedError: Pbkdf2 failed: iteration counts above 100000 are not supported
 * y por eso no se podían crear cuentas ni iniciar sesión.
 *
 * Este módulo envuelve `crypto.pbkdf2`: hasta 100 000 iteraciones usa el nativo; por
 * encima calcula exactamente el mismo resultado con @noble/hashes (JS puro, auditada).
 * No baja la seguridad ni cambia el formato de los hashes. Cuesta ~1 s de CPU por
 * inicio de sesión o cambio de contraseña.
 *
 * Vive en el código del proyecto (no en node_modules) para que cualquier build lo
 * incluya: local, CI de Cloudflare o el que sea. Se importa al inicio de payload.config.ts.
 */
import crypto from 'crypto'
import { pbkdf2Async } from '@noble/hashes/pbkdf2'
import { sha256, sha512 } from '@noble/hashes/sha2'

type Callback = (err: Error | null, derivedKey?: Buffer) => void
type Pbkdf2 = (
  password: string | Uint8Array,
  salt: string | Uint8Array,
  iterations: number,
  keylen: number,
  digest: string,
  callback: Callback,
) => void

const LIMITE_NATIVO = 100_000
const MARCA = Symbol.for('neurosemos.pbkdf2Workers')

const envolver = (modulo: Record<string | symbol, unknown> | undefined) => {
  if (!modulo || typeof modulo.pbkdf2 !== 'function' || modulo[MARCA]) return
  const nativo = (modulo.pbkdf2 as Pbkdf2).bind(modulo)

  const compatible: Pbkdf2 = (password, salt, iterations, keylen, digest, callback) => {
    const algoritmo = String(digest).toLowerCase()
    if (iterations <= LIMITE_NATIVO || (algoritmo !== 'sha256' && algoritmo !== 'sha512')) {
      return nativo(password, salt, iterations, keylen, digest, callback)
    }
    pbkdf2Async(algoritmo === 'sha512' ? sha512 : sha256, password, salt, { c: iterations, dkLen: keylen }).then(
      (resultado) => callback(null, Buffer.from(resultado)),
      (err: Error) => callback(err),
    )
  }

  try {
    modulo.pbkdf2 = compatible
  } catch {
    // propiedad de solo lectura: se intenta abajo
  }
  if (modulo.pbkdf2 !== compatible) {
    Object.defineProperty(modulo, 'pbkdf2', { value: compatible, writable: true, configurable: true })
  }
  modulo[MARCA] = true
}

envolver(crypto as unknown as Record<string | symbol, unknown>)
envolver((crypto as unknown as { default?: Record<string | symbol, unknown> }).default)

/** Para verificar en pruebas que el envoltorio quedó activo. */
export const pbkdf2WorkersActivo = () =>
  Boolean((crypto as unknown as Record<symbol, unknown>)[MARCA])
