import { readFileSync } from 'fs'
module.exports = {
    type: 'mysql',
    url: process.env.DATABASE_URL,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['src/database/migrations/*.ts'],
    seeds: ['src/migrations/*.ts'],
    synchronize: true,
    extra: {
        ssl: {
          ca: readFileSync(process.env.MYSQL_ATTR_SSL_CA)
        },
      },
  };
  