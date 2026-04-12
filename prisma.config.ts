import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Next.js uses .env.local, dotenv uses .env — load both
config({ path: ".env.local" });
config({ path: ".env" });

export default defineConfig({
  earlyAccess: true,
  schema: "prisma/schema.prisma",

  datasource: {
    url: process.env.DATABASE_URL!,
    directUrl: process.env.DIRECT_URL || process.env.DATABASE_URL!,
  },

  migrations: {
    seed: 'tsx prisma/seed.ts',
  },
});
