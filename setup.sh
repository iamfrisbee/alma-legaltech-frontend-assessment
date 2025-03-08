mkdir tmp
npm ci
npx prisma generate
npx prisma migrate deploy
npx tsx src/prisma/seed.ts
npm run dev