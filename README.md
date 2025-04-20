# thread-tweet-agent
# Thread Agent

A real-time Twitter thread creation and management application built with React, Convex, and OpenAI.

## Features

- 🔐 User Authentication
- ✍️ Thread Creation and Management
- 🤖 AI-Powered Thread Ideas Generation
- 🔄 Real-time Updates
- 📱 Responsive Design

## Project Structure

```
├── convex/                      # Backend (Convex) code
│   ├── _generated/             # Auto-generated Convex types and APIs
│   ├── auth.config.ts          # Auth configuration
│   ├── auth.ts                 # Authentication setup
│   ├── http.ts                 # HTTP endpoints
│   ├── schema.ts               # Database schema
│   └── threads.ts              # Thread-related functions
├── src/                        # Frontend (React) code
│   ├── lib/                    # Utility functions
│   ├── App.tsx                 # Main application component
│   ├── SignInForm.tsx         # Authentication form
│   ├── SignOutButton.tsx      # Logout button
│   ├── index.css              # Global styles
│   └── main.tsx               # Application entry point
└── public/                     # Static assets
```

## Technical Details

### Database Schema

```typescript
threads: defineTable({
  userId: v.id("users"),        // Reference to the user who created the thread
  title: v.string(),           // Thread title
  content: v.array(v.string()), // Array of tweets
  status: v.string(),          // Thread status (e.g., "draft")
  createdAt: v.number(),       // Creation timestamp
}).index("by_user", ["userId"])
```

### Backend Functions

1. **Queries**
   - `listThreads`: Fetches user's threads

2. **Mutations**
   - `createThread`: Creates a new thread

3. **Actions**
   - `generateThreadIdeas`: Uses AI to generate thread ideas

### Frontend Components

1. **App.tsx**
   - Main layout
   - Thread creation form
   - Thread listing

2. **Authentication**
   - SignInForm.tsx: Login functionality
   - SignOutButton.tsx: Logout functionality

## Technologies Used

- **Frontend**
  - React
  - TailwindCSS
  - Convex React Hooks

- **Backend**
  - Convex (Database & Backend)
  - OpenAI (AI Integration)

- **Authentication**
  - Convex Auth

## Features Breakdown

### Authentication
- Username/password authentication
- Protected routes and data access
- Real-time session management

### Thread Management
- Create new threads with title and content
- View all threads in real-time
- Organize tweets within threads

### AI Integration
- Generate thread ideas using OpenAI
- Smart content suggestions
- Topic-based ideation

## Real-time Features
- Live updates for thread creation
- Instant thread listing updates
- Collaborative potential for future features

## Styling
- Responsive design using TailwindCSS
- Clean and modern UI
- Consistent component styling

## Security
- Authenticated data access
- User-specific data isolation
- Secure API endpoints

## Future Enhancements Potential
1. Thread scheduling
2. Analytics integration
3. Thread templates
4. Collaboration features
5. Media attachment support
6. Thread preview mode
7. Export capabilities
8. Thread performance metrics

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Access the app through the local development server

## Environment Variables
The application uses the following environment variables:
- `CONVEX_DEPLOYMENT`: Automatically set by Convex
- `VITE_CONVEX_URL`: Automatically set by Convex
- Built-in OpenAI integration is pre-configured

## Data Management
- Access your data through the Convex Dashboard
- Real-time database updates
- Automatic schema validation
- Built-in indexing for efficient queries

## Best Practices
- TypeScript for type safety
- Real-time data synchronization
- Secure authentication flow
- Modular component structure
- Clean code architecture
