---
author: "Mike Awad"
description: "Flight Booking"
---

# 🛫 Flight Booking 🛬

## Libraries that will be used

- "next": "15.1.0"
- "react": "^19.0.0"
- next-intl => Next.js internationalization (i18n)
- shadcn-ui => Build your component library
- react-hook-form => build Form
- zod => TypeScript-first schema validation with static type inference
- sqlite3 => Asynchronous, non-blocking SQLite3 bindings for Node.js.
- prisma && @prisma/client => Prisma Client JS is an auto-generated query builder that enables type-safe database access and reduces boilerplate
- sharp => To convert large images in common formats to smaller, web-friendly JPEG, PNG, WebP, GIF and AVIF images of varying dimensions.

## dependencies Libraries

```Js
npm i next-intl react-hook-form zod @hookform/resolvers @auth/prisma-adapter @prisma/client sqlite3
```

## devDependencies Libraries

```Js
npm i -D eslint-config-prettier prettier prettier-plugin-tailwindcss prisma
```

the API i use
https://rapidapi.com/ntd119/api/sky-scanner3
in .env file add this info

# ======================

# === Connect DataBase

DATABASE_URL="file:./../db/DB.sqlite"

# ======================

NEXT_PUBLIC_RAPIDAPI_KEY="the key from API"
NEXT_PUBLIC_RAPIDAPI_HOST="sky-scanner3.p.rapidapi.com"
NEXT_PUBLIC_RAPIDAPI_URL="https://sky-scanner3.p.rapidapi.com/flights/"
