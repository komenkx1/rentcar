# rentCars

A modern car rental application built with Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, and Prisma 7.

## Features

- **Customer Flow**: Browse vehicles, make bookings, upload documents, and track payment status
- **Admin Dashboard**: Manage vehicles, bookings, payments, and documents
- **Owner Dashboard**: Executive overview and reporting
- **Self-Hosted PostgreSQL**: Full database control with Prisma ORM
- **MinIO/S3 Storage**: Self-hosted object storage for vehicle images, documents, and payment proofs
- **Responsive Design**: Mobile-first UI with beautiful Material Design 3 inspired components

## Tech Stack

- **Frontend**: Next.js 14 App Router, React 18, TypeScript, Tailwind CSS
- **Database**: PostgreSQL with Prisma 7 ORM
- **Storage**: MinIO/S3-compatible object storage with AWS SDK v3
- **Email**: Resend
- **Notifications**: Telegram Bot API

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- MinIO server (or any S3-compatible storage)

### Local Development

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd rentcar
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your database and storage credentials.

3. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

4. **Run database migrations:**
   ```bash
   npx prisma migrate dev
   ```

5. **Seed the database:**
   ```bash
   npx prisma db seed
   ```

6. **Start the development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app.

### Test Accounts

After seeding, you can use these test accounts:

| Role | Email |
|------|-------|
| Admin | admin@rentcar.com |
| Owner | owner@rentcar.com |
| Customer | andi@gmail.com |
| Customer | siti@gmail.com |
| Customer | rizky@gmail.com |

## Project Structure

```
rentcar/
├── app/                    # Next.js App Router
│   ├── (customer)/         # Customer-facing pages
│   ├── (auth)/             # Authentication pages
│   ├── admin/              # Admin dashboard
│   ├── owner/              # Owner dashboard
│   └── api/                # API routes
├── components/             # React components
│   ├── customer/           # Customer-specific components
│   └── shared/             # Shared components
├── lib/                    # Utilities and abstractions
│   ├── storage/            # MinIO/S3 storage layer
│   └── prisma.ts           # Prisma client setup
├── prisma/                 # Database schema and migrations
│   ├── schema.prisma       # Prisma schema
│   └── seed.ts             # Database seed script
└── public/                 # Static assets
```

## Storage Architecture

### MinIO/S3 Setup

The app uses a storage abstraction layer in `lib/storage/` for all file operations:

- **`s3-client.ts`**: S3 client singleton configured from environment variables
- **`storage-paths.ts`**: Helper functions for consistent object key generation
- **`object-storage.ts`**: Core functions for upload, delete, and presigned URLs
- **`index.ts`**: Re-exports for easy importing

### Upload Flow

1. Client requests a presigned upload URL from `/api/uploads/presign`
2. Server validates the request and generates a presigned URL
3. Client uploads directly to MinIO/S3 using the presigned URL
4. Server can delete objects via `/api/uploads/delete`

### Object Key Patterns

```
vehicles/{vehicleId}/{safeFileName}
documents/{userId}/{safeFileName}
payments/{bookingCode}/{safeFileName}
```

## Database Schema

Key models:

- **User**: Customers, admins, and owners
- **Vehicle**: Car fleet with images, pricing, and availability
- **Booking**: Reservations with status tracking
- **Document**: KTP, SIM, and other customer documents
- **Payment**: Payment records with proof uploads
- **VehicleServiceLog**: Maintenance history
- **OperationalCost**: Running costs tracking
- **DailyRevenueSummary**: Aggregated daily revenue
- **Notification**: User notifications
- **AppSetting**: Application configuration (bank info, company details)

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions including:

- Local development setup
- Production deployment
- PostgreSQL setup
- MinIO setup checklist
- Coolify/VPS deployment notes
- Environment variables reference
- Migration safety guide

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma generate` | Generate Prisma Client |
| `npx prisma migrate dev` | Run migrations in development |
| `npx prisma migrate deploy` | Apply migrations in production |
| `npx prisma db seed` | Seed the database |
| `npx prisma studio` | Open Prisma Studio (database GUI) |

## License

Private - All rights reserved.
