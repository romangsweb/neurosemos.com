import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pacientes_perfil_anclas\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`texto\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pacientes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pacientes_perfil_anclas_order_idx\` ON \`pacientes_perfil_anclas\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pacientes_perfil_anclas_parent_id_idx\` ON \`pacientes_perfil_anclas\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pacientes_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pacientes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pacientes_sessions_order_idx\` ON \`pacientes_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pacientes_sessions_parent_id_idx\` ON \`pacientes_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pacientes\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`nombre\` text NOT NULL,
  	\`pronombres\` text,
  	\`activo\` integer DEFAULT true,
  	\`proxima_sesion\` text,
  	\`perfil_tema\` text DEFAULT 'lavanda',
  	\`perfil_letra\` text DEFAULT 'legible',
  	\`perfil_bateria\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`reset_password_requested_at\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`pacientes_updated_at_idx\` ON \`pacientes\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pacientes_created_at_idx\` ON \`pacientes\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pacientes_email_idx\` ON \`pacientes\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`pacientes_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`programas_id\` integer,
  	\`recursos_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pacientes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`programas_id\`) REFERENCES \`programas\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`recursos_id\`) REFERENCES \`recursos\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pacientes_rels_order_idx\` ON \`pacientes_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pacientes_rels_parent_idx\` ON \`pacientes_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pacientes_rels_path_idx\` ON \`pacientes_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pacientes_rels_programas_id_idx\` ON \`pacientes_rels\` (\`programas_id\`);`)
  await db.run(sql`CREATE INDEX \`pacientes_rels_recursos_id_idx\` ON \`pacientes_rels\` (\`recursos_id\`);`)
  await db.run(sql`CREATE TABLE \`recursos\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titulo\` text NOT NULL,
  	\`tipo\` text DEFAULT 'meditacion' NOT NULL,
  	\`descripcion\` text,
  	\`duracion_min\` numeric,
  	\`visibilidad\` text DEFAULT 'asignado' NOT NULL,
  	\`prefix\` text DEFAULT 'recursos',
  	\`_objectkey\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`recursos_updated_at_idx\` ON \`recursos\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`recursos_created_at_idx\` ON \`recursos\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`recursos_filename_idx\` ON \`recursos\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`recursos_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`programas_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`recursos\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`programas_id\`) REFERENCES \`programas\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`recursos_rels_order_idx\` ON \`recursos_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`recursos_rels_parent_idx\` ON \`recursos_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`recursos_rels_path_idx\` ON \`recursos_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`recursos_rels_programas_id_idx\` ON \`recursos_rels\` (\`programas_id\`);`)
  await db.run(sql`CREATE TABLE \`programas\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`nombre\` text NOT NULL,
  	\`descripcion\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`programas_updated_at_idx\` ON \`programas\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`programas_created_at_idx\` ON \`programas\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titulo\` text,
  	\`slug\` text,
  	\`categoria\` text DEFAULT 'general',
  	\`publicado_en\` text,
  	\`extracto\` text,
  	\`portada_id\` integer,
  	\`contenido\` text,
  	\`seo_meta_titulo\` text,
  	\`seo_meta_descripcion\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`portada_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_portada_idx\` ON \`posts\` (\`portada_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`posts__status_idx\` ON \`posts\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_titulo\` text,
  	\`version_slug\` text,
  	\`version_categoria\` text DEFAULT 'general',
  	\`version_publicado_en\` text,
  	\`version_extracto\` text,
  	\`version_portada_id\` integer,
  	\`version_contenido\` text,
  	\`version_seo_meta_titulo\` text,
  	\`version_seo_meta_descripcion\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_portada_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_parent_idx\` ON \`_posts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_portada_idx\` ON \`_posts_v\` (\`version_portada_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_updated_at_idx\` ON \`_posts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_created_at_idx\` ON \`_posts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version__status_idx\` ON \`_posts_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_created_at_idx\` ON \`_posts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_updated_at_idx\` ON \`_posts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_latest_idx\` ON \`_posts_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`talleres\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titulo\` text NOT NULL,
  	\`slug\` text,
  	\`resumen\` text NOT NULL,
  	\`descripcion\` text,
  	\`duracion\` text,
  	\`precio\` numeric,
  	\`estado\` text DEFAULT 'abierto',
  	\`fecha_inicio\` text,
  	\`imagen_id\` integer,
  	\`orden\` numeric DEFAULT 10,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`imagen_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`talleres_slug_idx\` ON \`talleres\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`talleres_imagen_idx\` ON \`talleres\` (\`imagen_id\`);`)
  await db.run(sql`CREATE INDEX \`talleres_updated_at_idx\` ON \`talleres\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`talleres_created_at_idx\` ON \`talleres\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`prefix\` text DEFAULT 'media',
  	\`_objectkey\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`nombre\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`reset_password_requested_at\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pacientes_id\` integer,
  	\`recursos_id\` integer,
  	\`programas_id\` integer,
  	\`posts_id\` integer,
  	\`talleres_id\` integer,
  	\`media_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pacientes_id\`) REFERENCES \`pacientes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`recursos_id\`) REFERENCES \`recursos\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`programas_id\`) REFERENCES \`programas\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`talleres_id\`) REFERENCES \`talleres\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pacientes_id_idx\` ON \`payload_locked_documents_rels\` (\`pacientes_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_recursos_id_idx\` ON \`payload_locked_documents_rels\` (\`recursos_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_programas_id_idx\` ON \`payload_locked_documents_rels\` (\`programas_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_talleres_id_idx\` ON \`payload_locked_documents_rels\` (\`talleres_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pacientes_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pacientes_id\`) REFERENCES \`pacientes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_pacientes_id_idx\` ON \`payload_preferences_rels\` (\`pacientes_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`ajustes_sitio\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`whatsapp\` text DEFAULT '5215542945205' NOT NULL,
  	\`telefono_visible\` text DEFAULT '55 4294 5205',
  	\`agenda_url\` text,
  	\`costo_sesion\` numeric,
  	\`cedula\` text,
  	\`ubicacion\` text DEFAULT 'CDMX',
  	\`formacion\` text,
  	\`linea_crisis\` text DEFAULT 'Si estás en crisis, este sitio no sustituye atención de emergencia. Línea de la Vida: 800 911 2000.',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pacientes_perfil_anclas\`;`)
  await db.run(sql`DROP TABLE \`pacientes_sessions\`;`)
  await db.run(sql`DROP TABLE \`pacientes\`;`)
  await db.run(sql`DROP TABLE \`pacientes_rels\`;`)
  await db.run(sql`DROP TABLE \`recursos\`;`)
  await db.run(sql`DROP TABLE \`recursos_rels\`;`)
  await db.run(sql`DROP TABLE \`programas\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`_posts_v\`;`)
  await db.run(sql`DROP TABLE \`talleres\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`ajustes_sitio\`;`)
}
