import * as migration_20261029_161654_inicial from './20261029_161654_inicial';
import * as migration_20261029_190227_blog_animaciones_y_ajustes from './20261029_190227_blog_animaciones_y_ajustes';

export const migrations = [
  {
    up: migration_20261029_161654_inicial.up,
    down: migration_20261029_161654_inicial.down,
    name: '20261029_161654_inicial',
  },
  {
    up: migration_20261029_190227_blog_animaciones_y_ajustes.up,
    down: migration_20261029_190227_blog_animaciones_y_ajustes.down,
    name: '20261029_190227_blog_animaciones_y_ajustes'
  },
];
