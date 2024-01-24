import {DataSource} from 'typeorm';

const ApplicationDataSource = new DataSource({
    type: 'mssql',
    host: 'localhost',
    port: 1433,
    username: '',
    password: '',
    database: '',
    options: {
        encrypt: false,
    },
    // synchronize: true, // This will automatically create the db when the application is launched - good for initializing locally or debugging
    logging: true,
    entities: ['src/data/entities/*.ts'],
    migrations: ['src/data/__migrations__/*.ts'],
    migrationsTableName: '__Migrations__'
})

export default ApplicationDataSource