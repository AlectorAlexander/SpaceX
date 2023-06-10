module.exports = {
    type: 'mysql',
    url: process.env.DATABASE_URL,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['src/database/migrations/*.ts'],
    seeds: ['src/seeder/*.ts'],
    synchronize: true,
    extra: {
        ssl: {
          rejectUnauthorized: false
        },
      },
  };
  