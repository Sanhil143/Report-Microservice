import {PrismaClient} from '@prisma/client';
import {Pool} from 'pg';

const prisma = new PrismaClient({
  // log:["query"]
})

const pool = new Pool({
  connectionString : process.env.DATABASE_URL
});


const dbHost = process.env.HOST_NAME;
const dbName = process.env.DB_NAME;

export {prisma,pool,dbHost,dbName};