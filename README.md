# MyCommunityForum

A simple community forum application built with Next.js. Users can create discussion posts, comment on posts, like content, follow other users, and send private messages.

**Live Demo:** [my-forum-phi.vercel.app](https://my-forum-phi.vercel.app)

## Features

- **Discussion Posts** - Users can create and browse discussion posts with pagination.
- **Comments and Replies** - Users can comment on posts and reply to other comments.
- **Like System** - Users can like posts and comments, with counts stored in Redis.
- **Follow System** - Users can follow other users and see follower/followee counts on profiles.
- **Private Messaging** - Users can send direct messages to each other with conversation threads.
- **Notifications** - Users receive notifications for comments, likes, and follows via an event-driven system.
- **Authentication** - Google OAuth login via NextAuth.js.

## Technology Stack

**Frontend**

- Next.js 16 with App Router
- React 19
- CSS Modules

**Backend**

- Next.js API Routes
- NextAuth.js v5

**Database and Storage**

- Supabase (PostgreSQL)
- Upstash Redis

**Event Processing**

- Upstash QStash for async event handling

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- Supabase account
- Upstash account (for Redis and QStash)
- Google Cloud Console project (for OAuth)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/cortalo/MyCommunityBoard.git
cd MyCommunityBoard
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (see below)

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm start        # Start production server
npm run lint     # Run ESLint
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key

# NextAuth
AUTH_SECRET=your_auth_secret
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

# Upstash Redis
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# Upstash QStash
QSTASH_TOKEN=your_qstash_token
QSTASH_CURRENT_SIGNING_KEY=your_signing_key
QSTASH_NEXT_SIGNING_KEY=your_next_signing_key

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## Project Structure

```
MyCommunityBoard/
├── app/
│   ├── _components/          # React components
│   ├── _lib/                 # Server-side utilities
│   ├── api/                  # API routes
│   ├── index/                # Posts listing pages
│   ├── discuss/              # Post detail pages
│   ├── profile/              # User profile pages
│   ├── letter/               # Private messaging
│   └── notice/               # Notifications page
├── lib/                      # Shared utilities
└── public/                   # Static assets
```

## Database Schema

- **users** - User profiles (id, email, name, image, createdAt)
- **DiscussPost** - Forum posts (id, title, content, userId, createdAt, commentCount, likeCount)
- **Comment** - Comments and replies (id, content, userId, entityType, entityId, createdAt)
- **Message** - Private messages (id, content, senderId, receiverId, conversationId, isRead, createdAt)

## Deployment

Deployed on Vercel. To deploy your own instance:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in the Vercel dashboard
3. Deploy

## License

MIT License
