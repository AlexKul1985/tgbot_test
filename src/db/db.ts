import * as promise from 'bluebird'
import pgPromise from 'pg-promise';

const initOptions = {
    promiseLib: promise,
    connect(client: any, dc: any, useCount: any) {
        const cp = client.connectionParameters;
        console.log('Connected to database:', cp.database);
    } 
};

const pgp: pgPromise.IMain  = pgPromise(initOptions)

const cn = {
    host: 'localhost', 
    port: 5432, 
    database: 'ak85_tel_bot_data',
    user: 'alex_kul1985',
    password: '21365sanshoy;AK'
};

export const db = pgp(cn);


