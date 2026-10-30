-- API keys para administradores (Build SEO Studio) y Markdown de origen en el blog
ALTER TABLE users ADD COLUMN enable_a_p_i_key integer;
ALTER TABLE users ADD COLUMN api_key text;
ALTER TABLE users ADD COLUMN api_key_index text;
ALTER TABLE posts ADD COLUMN markdown_fuente text;
ALTER TABLE _posts_v ADD COLUMN version_markdown_fuente text;
