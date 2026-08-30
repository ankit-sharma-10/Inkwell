# Inkwell

A modern minimalist blogging platform built with React, Vite, and Appwrite. Share your ideas with the world through a clean, elegant interface.

## Features

- **Authentication** — Sign up, sign in, and session management powered by Appwrite
- **Create & Edit Posts** — Rich text editor (TinyMCE) with image uploads
- **Browse Posts** — Responsive grid layout with animated post cards
- **Author Controls** — Edit and delete your own posts
- **Modern UI** — Light minimalist design with Inter font, glassmorphism cards, smooth animations, and responsive layout

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [React 19](https://react.dev) |
| Build Tool | [Vite 8](https://vite.dev) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| State Management | [Redux Toolkit](https://redux-toolkit.js.org) |
| Forms | [React Hook Form](https://react-hook-form.com) |
| Rich Text Editor | [TinyMCE](https://www.tiny.cloud) |
| Backend | [Appwrite](https://appwrite.io) (Auth, Database, Storage) |
| Routing | [React Router 7](https://reactrouter.com) |

## Getting Started

### Prerequisites

- Node.js 18+
- An [Appwrite](https://appwrite.io) project with Auth, Database, and Storage configured

### Installation

```bash
# Install dependencies
npm install

# Create a .env file with your Appwrite credentials
# (see .env.example below)

# Start the dev server
npm run dev
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_TABLE_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
```

## Project Structure

```
src/
├── appwrite/          # Appwrite service layer (auth, db, storage, shared client)
├── components/        # Reusable UI components (Header, Footer, Button, Input, PostCard, PostForm, RTE, etc.)
├── conf/              # Environment config
├── pages/             # Route-level page components (Home, AllPosts, Post, AddPost, EditPost, Login, Signup)
├── store/             # Redux store & slices
├── index.css          # Design system (theme tokens, animations, utilities)
├── App.jsx            # Root layout with auth initialization
└── main.jsx           # Entry point with router & Redux provider
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |

## License

This project is private.
