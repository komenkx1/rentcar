import { PrismaClient } from "@prisma/client";
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { MOCK_VEHICLES, MOCK_BOOKINGS, MOCK_USERS, MOCK_PAYMENTS } from "@/lib/mock";

const MOCK_DB = process.env.NEXT_PUBLIC_MOCK_DB === "true";

function createMockPrisma(): PrismaClient {
  const handler = {
    get(_target: unknown, prop: string) {
      if (prop === "vehicle") {
        return {
          findMany: ({ where, orderBy }: Record<string, unknown> = {}) => {
            let result = [...MOCK_VEHICLES];
            const w = where as Record<string, unknown> | undefined;
            if (w?.status && typeof w.status === "object") {
              const statusFilter = w.status as { in?: string[] };
              if (statusFilter.in) {
                result = result.filter((v) => statusFilter.in!.map((s: string) => s.toLowerCase()).includes(v.status));
              }
            }
            if (orderBy) {
              const key = Object.keys(orderBy as object)[0] as keyof typeof MOCK_VEHICLES[0];
              const dir = (orderBy as Record<string, string>)[key as string];
              result.sort((a, b) => {
                const va = a[key] as number;
                const vb = b[key] as number;
                return dir === "asc" ? va - vb : vb - va;
              });
            }
            return Promise.resolve(result);
          },
          findUnique: ({ where }: { where: { id?: number } }) =>
            Promise.resolve(MOCK_VEHICLES.find((v) => v.id === where.id) ?? null),
          findFirst: () => Promise.resolve(MOCK_VEHICLES[0]),
          count: () => Promise.resolve(MOCK_VEHICLES.length),
        };
      }

      if (prop === "booking") {
        return {
          findMany: ({ include, where, orderBy }: Record<string, unknown> = {}) => {
            let result = [...MOCK_BOOKINGS];
            const w = where as Record<string, unknown> | undefined;
            if (w?.status && typeof w.status === "object") {
              const st = w.status as { in?: string[] };
              if (st.in) result = result.filter((b) => st.in!.includes(b.status));
            } else if (w?.status && typeof w.status === "string") {
              result = result.filter((b) => b.status === w.status);
            }
            if (orderBy) {
              const key = Object.keys(orderBy as object)[0] as string;
              const dir = (orderBy as Record<string, string>)[key];
              result.sort((a, b) => {
                const va = new Date((a as unknown as Record<string, unknown>)[key] as string).getTime();
                const vb = new Date((b as unknown as Record<string, unknown>)[key] as string).getTime();
                return dir === "asc" ? va - vb : vb - va;
              });
            }
            return Promise.resolve(
              result.map((b) => ({
                ...b,
                ...(include && (include as Record<string, boolean>).vehicle ? { vehicle: b.vehicle } : {}),
              }))
            );
          },
          findUnique: ({ where, include }: { where: { booking_code?: string; id?: number }; include?: Record<string, boolean> }) => {
            const found = MOCK_BOOKINGS.find(
              (b) => (where.booking_code && b.booking_code === where.booking_code) || (where.id && b.id === where.id)
            ) ?? null;
            if (found && include?.vehicle) {
              return Promise.resolve({ ...found, vehicle: found.vehicle });
            }
            return Promise.resolve(found);
          },
          findFirst: () => Promise.resolve(MOCK_BOOKINGS[0]),
          count: () => Promise.resolve(MOCK_BOOKINGS.length),
          create: () => Promise.resolve(MOCK_BOOKINGS[0]),
        };
      }

      if (prop === "user") {
        return {
          findMany: () => Promise.resolve(MOCK_USERS),
          findUnique: ({ where }: { where: { id?: string; email?: string } }) =>
            Promise.resolve(MOCK_USERS.find((u) => u.id === where.id || u.email === where.email) ?? null),
          findFirst: () => Promise.resolve(MOCK_USERS[0]),
          count: () => Promise.resolve(MOCK_USERS.length),
        };
      }

      if (prop === "payment") {
        return {
          findMany: () => Promise.resolve(MOCK_PAYMENTS),
          findUnique: ({ where }: { where: { id?: number } }) =>
            Promise.resolve(MOCK_PAYMENTS.find((p) => p.id === where.id) ?? null),
          findFirst: () => Promise.resolve(MOCK_PAYMENTS[0]),
          count: () => Promise.resolve(MOCK_PAYMENTS.length),
        };
      }

      return () => {
        return new Proxy(
          {},
          {
            get(_t: unknown, method: string) {
              if (method === "findMany") return () => Promise.resolve([]);
              if (method === "count") return () => Promise.resolve(0);
              if (method === "findUnique" || method === "findFirst") return () => Promise.resolve(null);
              return () => Promise.resolve(undefined);
            },
          }
        );
      };
    },
  };
  return new Proxy({} as PrismaClient, handler) as PrismaClient;
}

let prisma: PrismaClient;

if (MOCK_DB) {
  prisma = createMockPrisma();
} else {
  const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
  };

  const connectionString = `${process.env.DATABASE_URL}`;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
  }
}

export default prisma;
