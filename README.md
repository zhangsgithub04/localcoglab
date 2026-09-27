# CogLab Catalog

A friendlier Next.js catalog for the CogLab lab list, organized with search, filters, category visuals, and MongoDB-backed data.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

The app works without MongoDB by falling back to the checked-in seed data. To use MongoDB:

1. Add `MONGODB_URI` and `MONGODB_DB` in `.env.local`.
2. Run `npm run seed`.
3. Deploy to Vercel and set the same environment variables there.

## Data source

The lab names and categories reproduce the public CogLab labs index at:

https://coglab.cengage.com/labs/labs.shtml

The additional descriptions, durations, formats, and difficulty tags are new catalog metadata for organizing and exploring the labs.
