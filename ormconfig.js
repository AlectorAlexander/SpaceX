module.exports = {
    type: 'mysql',
    url: process.env.DATABASE_URL,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
    extra: {
        ssl: {
          ca: process.env.MYSQL_ATTR_SSL_CA,
        },
      },
  };
  