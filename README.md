# VRGC — Virtual Reality & Gaming Club | VIT Bhopal

Official website and digital portal for **VRGC (Virtual Reality & Gaming Club)** at **VIT Bhopal University**. A modern Next.js gaming ecosystem platform showcasing esports circuits, game development studio research, live tournament hubs, membership tiers, and interactive weapon radial selector.

---

## 🎮 Features

- **Cyberpunk / Glassmorphic UI**: High-fidelity dark mode theme tailored for gaming aesthetics, micro-animations, and fluid responsive design.
- **GTA-Style Tactical Weapon & Squad Wheel**: Custom interactive radial menu showcasing club core squads, roles, and member performance stats.
- **Floating Radio Player (`<RadioDial />`)**: Integrated transparent black circular player with curated playlists (GTA V, Cyberpunk, Phonk, Gaming Hits, 2016 Hits, etc.).
- **Interactive Staggered Navigation (`<StaggeredMenu />`)**: Smooth GSAP-powered mobile drawer navigation.
- **Dynamic Scroll Animations**: Physics-based scroll floating headers, velocity tickers, and letter blur transitions.
- **Live Supabase & Firebase Integration**: Real-time integration for verified membership rosters, ID card photos, and event registration.

---

## 🚀 Quick Start & Setup Guide

### 1. Prerequisites

- **Node.js**: `v18.x` or higher (Node 20+ recommended)
- **npm** / **yarn** / **pnpm**

### 2. Clone the Repository

```bash
git clone https://github.com/VRGC-vit/vrgc-live.git
cd vrgc-live
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 5. Run Local Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

---

## 🛠️ Tech Stack & Libraries

- **Framework**: [Next.js 15](https://nextjs.org/) (Pages Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI & Animations**: [Motion](https://motion.dev/) (Framer Motion), [GSAP](https://gsap.com/)
- **Backend & Database**: [Supabase](https://supabase.com/) & [Firebase Firestore](https://firebase.google.com/)
- **Styling**: Vanilla CSS & CSS Variables for maximum performance and design control

---

## 📂 Project Structure

```text
├── public/               # Static assets (images, logos, faculty portraits, icons)
│   ├── faculty/          # Faculty coordinator portraits
│   ├── leadership/       # Leadership council portraits
│   ├── events/           # Event banners & posters
│   └── games/            # Game showcase banners
├── src/
│   ├── components/       # Reusable components (RadioDial, StaggeredMenu, DriftWall, etc.)
│   ├── hooks/            # Custom React hooks (useScrollAnimations)
│   ├── pages/            # Next.js route pages (index, about, events, live, community)
│   ├── services/         # API & database service wrappers (membersService.ts)
│   ├── styles/           # Global styles and design tokens (globals.css)
│   └── utils/            # Supabase & Firebase client initialization
└── package.json
```

---

## 📜 Available Scripts

- `npm run dev` — Starts the local development server at port 3000.
- `npm run build` — Builds the application for production.
- `npm run start` — Starts a production server.
- `npm run lint` — Runs Next.js ESLint checks.

---

## 🤝 Community & Connect

- **Discord**: [Join VRGC Discord](https://discord.gg/vrgc)
- **Instagram**: [@vrgc.vitb](https://instagram.com/vrgc.vitb)
- **LinkedIn**: [VRGC VIT Bhopal](https://linkedin.com/company/vrgcvitb)
- **Institution**: [VIT Bhopal University](https://vitbhopal.ac.in)
