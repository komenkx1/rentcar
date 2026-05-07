import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Next.js uses .env.local, dotenv uses .env — load both
config({ path: ".env.local" });
config({ path: ".env" });

export default defineConfig({
  schema: "prisma/schema.prisma",

  datasource: {
    url: process.env.DATABASE_URL!,
  },

  migrations: {
    seed: 'tsx prisma/seed.ts',
  },
});
