# Database setup — Local Postgres and Neon

This project can run against a local PostgreSQL server or Neon (cloud Postgres). By default the repository's `.env` has the Neon `DATABASE_URL` active and the local connection values commented out.

Quick summary
- To use Neon (default): ensure `DATABASE_URL` is set to the Neon connection string in `.env` (already present).
- To use local Postgres: either uncomment the local vars in `.env` or set `DATABASE_URL` to a local connection string.

1) Local PostgreSQL (recommended in development)

- Start a local Postgres quickly with Docker:

```bash
docker run --name sme-postgres -e POSTGRES_PASSWORD=yourpassword -e POSTGRES_USER=postgres -e POSTGRES_DB=smedb -p 5432:5432 -d postgres:15
```

- Create DB / user manually (if not using the Docker ENV defaults):

```bash
psql -h localhost -U postgres -c "CREATE DATABASE smedb;"
psql -h localhost -U postgres -c "CREATE USER myuser WITH PASSWORD 'mypassword';"
psql -h localhost -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE smedb TO myuser;"
```

- Update `.env` to point to local DB (two options):
  - Uncomment the local `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` variables that are currently commented.
  - Or set `DATABASE_URL` to a local URL, e.g. `postgresql://postgres:yourpassword@localhost:5432/smedb`.

2) Neon (cloud Postgres)

- Create a Neon project and get the connection string from the Neon dashboard.
- Set the connection string to the `DATABASE_URL` env var. Example format (already in `.env`):

```
DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require&channel_binding=require
```

Notes and switching
- The app reads `DATABASE_URL` first (if your app's DB library/orm is configured that way). If you prefer explicit local host variables, uncomment the local `DB_*` env vars and set your application to use them (see `ormconfig.ts` / `database` lib for specifics).
- To quickly switch environments without editing the repository `.env`, export a host-level env var before starting the app:

```bash
# Use Neon
export DATABASE_URL="postgresql://..."

# Or use local
export DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/smedb"

# Then start the app
npm install
npx nx serve api-main
```

Verifying the app

- Start the app:

```bash
npm install
npx nx serve api-main
```

- Check health endpoint (default port `3001` in `.env`):

```bash
curl -i http://localhost:3001/api/health
```

Troubleshooting
- If the app fails to connect: check the connection string host/port, firewall, and whether Postgres accepts password connections. For Neon, ensure `sslmode=require` is present.
- If using Neon and you see `channel_binding` errors, try removing `&channel_binding=require` from the query parameters or consult Neon docs for the correct connection string for your driver.

If you want, I can also: start a local Postgres container for you, run migrations, or test the app against Neon—tell me which you prefer.
