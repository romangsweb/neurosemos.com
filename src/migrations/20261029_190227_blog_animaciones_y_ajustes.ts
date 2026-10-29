import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`ajustes_sitio_credenciales\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`valor\` text NOT NULL,
  	\`descripcion\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ajustes_sitio\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ajustes_sitio_credenciales_order_idx\` ON \`ajustes_sitio_credenciales\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ajustes_sitio_credenciales_parent_id_idx\` ON \`ajustes_sitio_credenciales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ajustes_sitio_preguntas\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`pregunta\` text NOT NULL,
  	\`respuesta\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ajustes_sitio\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ajustes_sitio_preguntas_order_idx\` ON \`ajustes_sitio_preguntas\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ajustes_sitio_preguntas_parent_id_idx\` ON \`ajustes_sitio_preguntas\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`animacion\` text;`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`minutos_lectura\` numeric;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_animacion\` text;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_minutos_lectura\` numeric;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`ajustes_sitio_credenciales\`;`)
  await db.run(sql`DROP TABLE \`ajustes_sitio_preguntas\`;`)
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`animacion\`;`)
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`minutos_lectura\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_animacion\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_minutos_lectura\`;`)
}
