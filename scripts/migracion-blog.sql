-- Migración 20261029_190227_blog_animaciones_y_ajustes (solo agrega tablas y columnas)

CREATE TABLE `ajustes_sitio_credenciales` (
  	`_order` integer NOT NULL,
  	`_parent_id` integer NOT NULL,
  	`id` text PRIMARY KEY NOT NULL,
  	`valor` text NOT NULL,
  	`descripcion` text NOT NULL,
  	FOREIGN KEY (`_parent_id`) REFERENCES `ajustes_sitio`(`id`) ON UPDATE no action ON DELETE cascade
  );

CREATE INDEX `ajustes_sitio_credenciales_order_idx` ON `ajustes_sitio_credenciales` (`_order`);

CREATE INDEX `ajustes_sitio_credenciales_parent_id_idx` ON `ajustes_sitio_credenciales` (`_parent_id`);

CREATE TABLE `ajustes_sitio_preguntas` (
  	`_order` integer NOT NULL,
  	`_parent_id` integer NOT NULL,
  	`id` text PRIMARY KEY NOT NULL,
  	`pregunta` text NOT NULL,
  	`respuesta` text NOT NULL,
  	FOREIGN KEY (`_parent_id`) REFERENCES `ajustes_sitio`(`id`) ON UPDATE no action ON DELETE cascade
  );

CREATE INDEX `ajustes_sitio_preguntas_order_idx` ON `ajustes_sitio_preguntas` (`_order`);

CREATE INDEX `ajustes_sitio_preguntas_parent_id_idx` ON `ajustes_sitio_preguntas` (`_parent_id`);

ALTER TABLE `posts` ADD `animacion` text;

ALTER TABLE `posts` ADD `minutos_lectura` numeric;

ALTER TABLE `_posts_v` ADD `version_animacion` text;

ALTER TABLE `_posts_v` ADD `version_minutos_lectura` numeric;

INSERT INTO `payload_migrations` (`name`, `batch`, `updated_at`, `created_at`) VALUES ('20261029_190227_blog_animaciones_y_ajustes', 2, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
