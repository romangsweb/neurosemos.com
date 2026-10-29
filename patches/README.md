# Parches

## payload@3.92.1 — PBKDF2 en Cloudflare Workers

Payload 3.9x cifra las contraseñas con PBKDF2-SHA256 de 600 000 iteraciones (corrección del CVE-2026-105804).
Workers en producción rechaza PBKDF2 nativo por encima de 100 000 iteraciones
(`NotSupportedError: Pbkdf2 failed: iteration counts above 100000 are not supported`),
así que crear cuentas e iniciar sesión fallaba.

El parche agrega `pbkdf2Compat`: intenta el PBKDF2 nativo y, si el entorno lo rechaza,
calcula exactamente el mismo resultado con `@noble/hashes` (JS puro, auditada).
Cuesta unos 1 s de CPU por inicio de sesión o cambio de contraseña. No baja las iteraciones
ni cambia el formato de los hashes.

**Al actualizar Payload:** `pnpm install` fallará a propósito si la versión cambia.
Revisa si Payload ya resolvió el límite de Workers; si no, vuelve a generar el parche
(`pnpm patch payload@<versión>`) y actualiza `pnpm-workspace.yaml`.
