# Payload + Next Blog

A tiny starter that mixes Next.js 15 with Payload CMS so you can publish your blog posts.

## Stack

- Next.js 15 with App Router
- Payload CMS
- Postgres

## Available Functionality

- Seed scripts for: admin, articles, article authors
- Media blur hash generator hook
- Simple UI for blog posts
- Docker (untested)

## Getting started

1. Install deps: `pnpm install`
2. Create an `.env` file with:
    ```sh
    # NOTE: if you update DB name here, make sure to update it in `package.json` as well
    DATABASE_URI=postgres://<user>:<password>@localhost:5432/payload_next_blog
    PAYLOAD_SECRET=replace-me
    CMS_SEED_ADMIN_EMAIL=admin@example.com
    CMS_SEED_ADMIN_PASSWORD=super-secret
    ```
3. Get Postgres running (use your own setup or `docker-compose.yml` (untested))
4. Optional: seed demo content with `pnpm seed`
5. Start the dev server: `pnpm dev` and visit `http://localhost:3000`

The Payload admin lives at `http://localhost:3000/admin`. If you seeded data, the credentials in `.env` log you in right away.
