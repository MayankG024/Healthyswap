import { defineConfig } from '@prisma/config';
import dotenv from 'dotenv';

dotenv.config();

const directUrl = process.env.DIRECT_URL;

if (!directUrl) {
  throw new Error('DIRECT_URL is required to run Prisma commands.');
}

export default defineConfig({
  migrations: {
    seed: 'npx tsx prisma/seed.ts',
  },
  datasource: {
    url: directUrl,
  },
});
