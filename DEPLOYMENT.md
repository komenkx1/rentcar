# Deployment Guide — rentCars

This guide covers deploying rentCars to production with self-hosted PostgreSQL and MinIO/S3-compatible storage.

## Table of Contents

1. [Local Development](#local-development)
2. [Production Deployment](#production-deployment)
3. [PostgreSQL Setup](#postgresql-setup)
4. [MinIO Setup](#minio-setup)
5. [Coolify/VPS Deployment](#coolifyvps-deployment)
6. [Environment Variables Reference](#environment-variables-reference)
7. [Migration Safety Guide](#migration-safety-guide)
8. [Common Gotchas](#common-gotchas)

---

## Local Development

### Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment template
cp .env.example .env.local

# 3. Edit .env.local with your credentials

# 4. Generate Prisma Client
npx prisma generate

# 5. Run migrations
npx prisma migrate dev

# 6. Seed the database
npx prisma db seed

# 7. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Using Docker for Local Services

```yaml
# docker-compose.yml (optional)
version: "3.8"
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: rentcar_user
      POSTGRES_PASSWORD: rentcar_password
      POSTGRES_DB: rentcar
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  minio:
    image: minio/minio:latest
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - minio_data:/data

volumes:
  postgres_data:
  minio_data:
```

---

## Production Deployment

### Build and Start

```bash
# 1. Install production dependencies
npm ci --production

# 2. Generate Prisma Client
npx prisma generate

# 3. Apply migrations (DO NOT use migrate dev in production)
npx prisma migrate deploy

# 4. Build the application
npm run build

# 5. Start the production server
npm run start
```

### Important Production Notes

- **Never run `npx prisma migrate reset` in production** — this will destroy all data
- **Always backup before migrations** — see [Migration Safety Guide](#migration-safety-guide)
- **Use `migrate deploy`** — not `migrate dev` — in production
- **Seed only when appropriate** — running seed will delete and recreate all data

---

## PostgreSQL Setup

### Create Database and User

```sql
-- Connect to PostgreSQL as superuser
CREATE DATABASE rentcar;
CREATE USER rentcar_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE rentcar TO rentcar_user;

-- Connect to rentcar database
\c rentcar
GRANT ALL ON SCHEMA public TO rentcar_user;
```

### Connection String Format

```env
DATABASE_URL="postgresql://rentcar_user:your_secure_password@your-postgres-host:5432/rentcar?schema=public"
```

### Connection Pooling

For production, consider using PgBouncer or your cloud provider's connection pooler:

```env
# For migrations (direct connection)
DIRECT_URL="postgresql://rentcar_user:your_secure_password@your-postgres-host:5432/rentcar?schema=public"

# For app runtime (pooled connection)
DATABASE_URL="postgresql://rentcar_user:your_secure_password@your-pooler-host:6543/rentcar?pgbouncer=true"
```

---

## MinIO Setup

### 1. Install and Start MinIO

```bash
# Using Docker
docker run -d --name minio \
  -p 9000:9000 -p 9001:9001 \
  -e MINIO_ROOT_USER=minioadmin \
  -e MINIO_ROOT_PASSWORD=minioadmin \
  -v minio_data:/data \
  minio/minio server /data --console-address ":9001"
```

### 2. Create Bucket

Access MinIO Console at `http://localhost:9001` and:

1. Login with `minioadmin` / `minioadmin`
2. Go to **Buckets** → **Create Bucket**
3. Name: `rentcar`
4. Click **Create**

Or using `mc` (MinIO Client):

```bash
mc alias set myminio http://localhost:9000 minioadmin minioadmin
mc mb myminio/rentcar
```

### 3. Create Access Key

1. Go to **Access Keys** → **Create Access Key**
2. Copy the Access Key and Secret Key
3. Add to your `.env.local`:

```env
S3_ACCESS_KEY_ID="your_access_key"
S3_SECRET_ACCESS_KEY="your_secret_key"
```

### 4. Set Bucket Policy

For **vehicle images** (public read):

```bash
mc anonymous set download myminio/rentcar/vehicles
```

For **documents and payments** (private, signed URLs only):

```bash
mc anonymous set none myminio/rentcar/documents
mc anonymous set none myminio/rentcar/payments
```

### 5. Configure CORS (for presigned uploads)

Create a CORS configuration file `cors.json`:

```json
[
  {
    "AllowedOrigins": ["http://localhost:3000", "https://your-domain.com"],
    "AllowedMethods": ["PUT", "GET", "DELETE"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

Apply it:

```bash
mc cors set myminio/rentcar cors.json
```

---

## Coolify/VPS Deployment

### Recommended Services

```
rentcar-web          # Next.js application
rentcar-postgres     # PostgreSQL database
rentcar-minio        # MinIO object storage
```

### Environment Variables for Coolify

```env
# Database (internal Coolify service)
DATABASE_URL="postgresql://rentcar_user:password@rentcar-postgres:5432/rentcar?schema=public"

# MinIO (internal endpoint for server-side operations)
S3_ENDPOINT="http://rentcar-minio:9000"
S3_REGION="us-east-1"
S3_ACCESS_KEY_ID="your_access_key"
S3_SECRET_ACCESS_KEY="your_secret_key"
S3_BUCKET="rentcar"
S3_FORCE_PATH_STYLE="true"

# Public MinIO URL (for browser image display)
# This should be a reverse proxy or public domain pointing to MinIO
S3_PUBLIC_BASE_URL="https://minio-public.your-domain.com/rentcar"

# App
NEXT_PUBLIC_APP_URL="https://your-domain.com"
NEXT_PUBLIC_APP_NAME="rentCars"
```

### Important Coolify Notes

- **Internal vs Public URLs**: `S3_ENDPOINT` is the internal service URL (server-side), while `S3_PUBLIC_BASE_URL` is the public URL for browser access
- **PostgreSQL should be private**: Keep PostgreSQL accessible only to internal services
- **MinIO Console**: Expose port 9001 for admin access, but keep port 9000 internal or behind reverse proxy
- **Reverse Proxy**: Set up a reverse proxy (nginx, Caddy, or Coolify's built-in) for public MinIO access

### Docker Compose for Coolify

```yaml
version: "3.8"
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: ${DATABASE_URL}
      S3_ENDPOINT: ${S3_ENDPOINT}
      S3_PUBLIC_BASE_URL: ${S3_PUBLIC_BASE_URL}
      S3_ACCESS_KEY_ID: ${S3_ACCESS_KEY_ID}
      S3_SECRET_ACCESS_KEY: ${S3_SECRET_ACCESS_KEY}
      S3_BUCKET: ${S3_BUCKET}
      S3_REGION: ${S3_REGION}
      S3_FORCE_PATH_STYLE: ${S3_FORCE_PATH_STYLE}
    depends_on:
      - postgres
      - minio

  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: rentcar_user
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: rentcar
    volumes:
      - postgres_data:/var/lib/postgresql/data

  minio:
    image: minio/minio:latest
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: ${MINIO_ROOT_USER}
      MINIO_ROOT_PASSWORD: ${MINIO_ROOT_PASSWORD}
    volumes:
      - minio_data:/data

volumes:
  postgres_data:
  minio_data:
```

---

## Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `S3_ENDPOINT` | MinIO/S3 server endpoint | `http://localhost:9000` |
| `S3_REGION` | S3 region | `us-east-1` |
| `S3_ACCESS_KEY_ID` | S3 access key (server-side only) | `minioadmin` |
| `S3_SECRET_ACCESS_KEY` | S3 secret key (server-side only) | `minioadmin` |
| `S3_BUCKET` | S3 bucket name | `rentcar` |
| `S3_FORCE_PATH_STYLE` | Force path-style URLs for MinIO | `true` |
| `S3_PUBLIC_BASE_URL` | Public URL for file access | `https://s3.example.com/rentcar` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DIRECT_URL` | Direct DB connection for migrations | Falls back to `DATABASE_URL` |
| `NEXT_PUBLIC_APP_URL` | App base URL | `http://localhost:3000` |
| `NEXT_PUBLIC_APP_NAME` | App display name | `rentCars` |
| `NEXT_PUBLIC_MOCK_DB` | Use mock database | `false` |
| `RESEND_API_KEY` | Resend email API key | - |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token | - |
| `CRON_SECRET` | Secret for cron endpoints | - |

### Security Notes

- **Never commit `.env.local`** — it's in `.gitignore`
- **Never expose `S3_ACCESS_KEY_ID` or `S3_SECRET_ACCESS_KEY` to the client** — these are server-side only
- **Use `NEXT_PUBLIC_` prefix only for variables that need to be accessible in the browser**
- **Rotate access keys regularly** — especially if exposed accidentally

---

## Migration Safety Guide

### Before Running Migrations

1. **Backup the database:**
   ```bash
   pg_dump -U rentcar_user -h your-postgres-host rentcar > backup_$(date +%Y%m%d_%H%M%S).sql
   ```

2. **Test migrations locally first:**
   ```bash
   # Use a copy of production data locally
   npx prisma migrate dev
   ```

3. **Review the migration SQL:**
   ```bash
   # Check the generated migration file
   cat prisma/migrations/<timestamp>_<name>/migration.sql
   ```

### Running Migrations in Production

```bash
# Apply migrations (safe, non-destructive)
npx prisma migrate deploy
```

### What NOT to Do in Production

```bash
# ❌ NEVER run these in production:
npx prisma migrate reset      # Destroys all data
npx prisma db push --force-reset  # Forces schema changes, may lose data
```

### Rollback Strategy

If a migration fails:

1. **Check the error message** — understand what went wrong
2. **Restore from backup** if data was corrupted:
   ```bash
   psql -U rentcar_user -h your-postgres-host rentcar < backup_YYYYMMDD_HHMMSS.sql
   ```
3. **Fix the migration** and try again

---

## Common Gotchas

### 1. Internal vs Public MinIO URLs

- **Server uses `S3_ENDPOINT`** for upload/delete operations (internal network)
- **Browser uses `S3_PUBLIC_BASE_URL`** for image display (public internet)
- These are usually **different URLs** when deployed behind a reverse proxy

### 2. CORS for Presigned Uploads

If client-side uploads fail with CORS errors:

- Ensure MinIO bucket has CORS configured
- Allowed origins must include your app domain
- Allowed methods must include `PUT` and `GET`

### 3. PostgreSQL Connection Limits

- Default PostgreSQL max connections: 100
- Next.js may open many connections in development
- Use connection pooling (PgBouncer) in production
- Set `connection_limit` in your connection string if needed

### 4. Prisma Client Generation

Always run `npx prisma generate` after:

- Installing dependencies
- Changing the schema
- Deploying to a new environment

### 5. MinIO Path Style

MinIO requires path-style URLs (`http://localhost:9000/bucket/key`) instead of virtual-hosted style (`http://bucket.localhost:9000/key`).

Always set `S3_FORCE_PATH_STYLE="true"` for MinIO.

### 6. Image Optimization

Next.js Image component requires `remotePatterns` configuration for external images. The app already includes patterns for MinIO/S3 URLs.

---

## Troubleshooting

### "Cannot find module '.prisma/client/default'"

Run `npx prisma generate` to regenerate the Prisma Client.

### "Missing required environment variable: S3_ENDPOINT"

Ensure all S3 environment variables are set in your `.env.local` or deployment environment.

### Database connection refused

- Check PostgreSQL is running and accessible
- Verify `DATABASE_URL` format and credentials
- Check firewall rules and network access

### MinIO upload fails

- Verify bucket exists and is accessible
- Check access key permissions
- Review CORS configuration for browser uploads
- Check `S3_FORCE_PATH_STYLE` is set to `true`

---

## Support

For issues and questions, please check:

- [Prisma Documentation](https://www.prisma.io/docs)
- [MinIO Documentation](https://min.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
