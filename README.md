# 🚗 Drive-Rental — Car Rental Platform

A full-stack car rental platform built with **Next.js 16**, **React 19**, **TypeScript**, and **Prisma/PostgreSQL**.

🔗 **Live Demo:** https://drive-rental-app.vercel.app

---

## ✨ Features

### 🖥️ User Side
- **Browse & Search:** Explore the car fleet with filtering and paginated results.
- **Car Details:** Photo gallery, specs (seats, transmission, fuel, power, top speed), and features per car.
- **Booking Flow:** Pick pickup/dropoff dates & locations → automatic price calculation → checkout.
- **Secure Payments:** Pay with Stripe Payment Element (card payments).
- **Booking Management:** View "My Bookings", modify or cancel reservations, cancel unpaid bookings automatically via cleanup API.
- **Favorites:** Save cars to your favorites list (localStorage-based for guests).
- **Email Confirmations:** Booking confirmation emails via **Resend** + **React Email** templates.
- **Contact Page** with validated contact form.

### 🛠️ Admin Dashboard (Role: ADMIN)
- **Dashboard:** Revenue analytics chart (Recharts) + fleet health stats.
- **Bookings Management:** Searchable, paginated table with status updates (PENDING / COMPLETED / CANCELLED).
- **Vehicles Management:** Full CRUD — add/edit vehicles with multi-image upload (Cloudinary).
- **Users Management:** View users, edit profiles and roles.
- **Settings:** Profile, security, notifications, and danger zone actions.

---

## 🧰 Tech Stack

### Core
| Tool | Purpose |
|---|---|
| **Next.js 16** (App Router) | Full-stack framework — SSR/RSC, Server Actions |
| **React 19** | UI library |
| **TypeScript 5** | Type safety |
| **Tailwind CSS 4** | Styling |
| **shadcn/ui (Radix UI)** | Accessible UI components |
| **Lucide React** | Icons |
| **Motion (Framer Motion)** | Animations |
| **Lottie (lottie-react)** | Empty/error/not-found animations |

### Backend & Data
| Tool | Purpose |
|---|---|
| **Prisma 7 + PostgreSQL** | Database ORM + migrations |
| **Next.js Server Actions** | Server-side logic (bookings, users, vehicles) |
| **Clerk + Svix Webhooks** | Authentication & user sync |
| **Stripe 13** | Payments (Payment Intents + unpaid-booking cleanup) |
| **Cloudinary** | Car image upload & storage |
| **Resend + React Email** | Transactional emails |

### Forms & State
| Tool | Purpose |
|---|---|
| **React Hook Form 7** | Form handling |
| **Zod** | Schema validation (search, vehicle, checkout, contact, user) |
| **Recharts** | Admin revenue chart |

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── (site)/            # Public site: browse, cars/[id], checkout, favorites,
│   │                      # my-bookings, locations, contact, about
│   ├── admin/             # Admin dashboard: bookings, users, vehicles, settings
│   ├── api/               # Route handlers: create-intent, upload, send-email,
│   │                      # cleanup-unpaid, webhooks/clerk
│   ├── payment-confirm/   # Payment success page
│   ├── sign-in/           # Clerk sign-in
│   └── error / loading / not-found
├── components/            # Header, Footer, Hero, VehicleCard, booking dialogs,
│                          # hero search form, inputs with labels, Lottie handlers
├── server/
│   ├── actions/           # Server Actions: booking, vehicle, user, getImageUrl
│   └── db/                # Data-access layer: booking, vehicle, user, dashboardData
├── zod-schemas/           # Zod validation schemas
├── types/                 # TypeScript types (booking, vehicle)
├── hooks/                 # useFormStatus, useIsMounted
├── lib/                   # db, cloudinary, booking summary calc, date formatters
├── constants/             # Enums
└── assets/animation/      # Lottie JSONs
```

---

## 🗃️ Database Schema (Prisma Models)
- **User** — synced from Clerk via webhook; roles: USER / ADMIN
- **Vehicle** — specs, features, gallery images, status: AVAILABLE / ON_RENTAL
- **Booking** — links User ↔ Vehicle; status: PENDING / COMPLETED / CANCELLED + payment status

---

## ⚙️ Environment Variables

Create a `.env` file in the root with the following:

```bash
# Clerk (authentication)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_xxx
CLERK_SECRET_KEY=sk_xxx
CLERK_WEBHOOK_SECRET=whsec_xxx

# Database (PostgreSQL / Supabase)
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Stripe (payments)
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx

# Cloudinary (image uploads)
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

# Resend (emails)
RESEND_API_KEY=re_xxx
```

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/alisaid2424/drive-rental-app.git
cd drive-rental-app

# 2. Install dependencies
npm install

# 3. Set up environment variables (see section above)

# 4. Push the Prisma schema to your database
npx prisma migrate dev

# 5. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📦 Deploy on Vercel

The app deploys to **Vercel** (see the live demo above). The database runs on **PostgreSQL** (works great with [Supabase](https://supabase.com) or [Neon](https://neon.tech)).

---

## 👤 Author

**Ali Said** — Frontend Developer (React.js / Next.js)

[![GitHub](https://img.shields.io/badge/GitHub-alisaid2424-181717?logo=github)](https://github.com/alisaid2424)
[![Portfolio](https://img.shields.io/badge/Portfolio-ali--asy-1F4E79?logo=aboutdotme)](https://portfolio-ali-asy.vercel.app)

---

Feel free to ⭐ the repo if you find it useful!
