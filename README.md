# MyCommunityBoard

A full-stack community forum and discussion platform built with modern web technologies. This application enables users to create discussion posts, engage through comments and replies, interact via likes and follows, and communicate privately through direct messaging.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)

## Features

### Discussion Posts
- Create and browse discussion posts with full-text content
- Paginated post listing with metadata display (author, creation date, comment count, like count)
- Author profile linking with user information

### Comments and Replies
- Comment on discussion posts
- Reply to comments with nested reply support
- Two-tier comment system for organized discussions
- Real-time comment counting and tracking

### Like System
- Like/unlike functionality for posts and comments
- Real-time like counting with optimistic UI updates
- User-level aggregation tracking total likes received
- Redis-backed implementation for high performance

### Follow System
- Follow/unfollow users
- Follower and followee counting
- Follow status tracking with profile display
- Redis-backed for fast lookups

### User Profiles
- User profile pages with avatar, name, and registration date
- Display of total likes received and follower/followee counts
- Follow button with status indicator

### Private Messaging
- Send private messages between users
- Conversation-based message organization
- Unread message tracking and counters
- Dedicated messaging interface

### Notifications
- Comment notifications when someone comments on your post
- Like notifications when someone likes your content
- Follow notifications when someone follows you
- Unread notification badges in header
- Event-driven architecture using QStash for async processing

### Authentication
- Google OAuth login/signup via NextAuth.js
- Automatic user profile creation on first login
- Secure token-based session management

## Technology Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI component library
- **CSS Modules** - Component-scoped styling
- **Tailwind CSS 4** - Utility-first CSS framework

### Backend
- **Next.js API Routes** - Serverless backend implementation
- **NextAuth.js v5** - Authentication and session management

### Database and Storage
- **Supabase** - PostgreSQL database with real-time capabilities
- **Upstash Redis** - In-memory data store for caching and counters
- **Vercel KV** - Key-value store integration

### Event Processing
- **Upstash QStash** - Message queue for asynchronous event processing
- **Webhooks** - Event-driven architecture for notifications

## Architecture

### Event-Driven Design
The application uses an event-driven architecture for handling user interactions:

1. User actions (comments, likes, follows) trigger events
2. Events are published to QStash message queue (production) or processed directly (development)
3. Webhooks receive and process events asynchronously
4. System messages are created for user notifications

### Redis Caching Strategy
```
like:entity:{TYPE}:{ID}     - Set of user IDs who liked an entity
like:user:{ID}              - Counter for total likes received by user
like:followee:{ID}:{TYPE}   - Set of users following this user
like:follower:{TYPE}:{ID}   - Set of followers for a user
```

### Entity Type System
```javascript
EntityType = {
  POST: 1,      // Discussion posts
  COMMENT: 2,   // Comments and replies
  USER: 3       // User entities for follow
}
```

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
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

3. Set up environment variables (see [Environment Variables](#environment-variables))

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

Create a `.env.local` file in the root directory with the following variables:

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
│   ├── _components/          # Reusable React components
│   │   ├── Header.js         # Navigation header
│   │   ├── Homepage.js       # Posts listing layout
│   │   ├── PostItem.js       # Post list item
│   │   ├── PostContent.js    # Post detail content
│   │   ├── PostReplys.js     # Comments container
│   │   ├── LikeButton.js     # Like toggle (client)
│   │   ├── FollowButton.js   # Follow toggle (client)
│   │   ├── PublishPost.js    # Create post modal
│   │   ├── PublishComment.js # Comment form
│   │   └── Pagination.js     # Pagination component
│   ├── _lib/                 # Server-side utilities
│   │   ├── auth.js           # NextAuth configuration
│   │   ├── supabase.js       # Supabase client
│   │   ├── DiscussPostMapper.js  # Post CRUD
│   │   ├── CommentMapper.js  # Comment CRUD
│   │   ├── UserMapper.js     # User queries
│   │   └── MessageMapper.js  # Message operations
│   ├── api/                  # API routes
│   │   ├── auth/             # NextAuth handlers
│   │   ├── like/             # Like endpoint
│   │   └── webhook/          # QStash webhooks
│   ├── index/                # Posts listing pages
│   ├── discuss/              # Post detail pages
│   ├── profile/              # User profile pages
│   ├── letter/               # Private messaging
│   └── notice/               # Notifications page
├── lib/                      # Shared utilities
│   ├── redis.js              # Redis client
│   ├── qstash.js             # QStash client
│   ├── likeService.js        # Like business logic
│   ├── followService.js      # Follow business logic
│   └── eventProducer.js      # Event publishing
└── public/                   # Static assets
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/[...nextauth]` | GET/POST | Authentication routes |
| `/api/like` | POST | Toggle like on entity |
| `/api/webhook/like` | POST | Process like events |
| `/api/webhook/comment` | POST | Process comment events |
| `/api/webhook/follow` | POST | Process follow events |

## Database Schema

### Tables

**users**
- User profiles synchronized from OAuth provider
- Fields: id, email, name, image, createdAt

**DiscussPost**
- Forum discussion posts
- Fields: id, title, content, userId, createdAt, commentCount, likeCount

**Comment**
- Comments and replies with entity typing
- Fields: id, content, userId, entityType, entityId, createdAt

**Message**
- Private messages between users
- Fields: id, content, senderId, receiverId, conversationId, isRead, createdAt

## Deployment

This application is optimized for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in the Vercel dashboard
3. Deploy

The serverless architecture ensures automatic scaling with:
- Supabase for managed PostgreSQL
- Upstash for serverless Redis and message queue
- Vercel for edge-optimized hosting

## License

This project is open source and available under the MIT License.

## Author

Developed as a portfolio project demonstrating full-stack web development with modern technologies.
