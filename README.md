# Simply My Profile

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS, integrated with a Django backend.

## Features

- 🎨 Modern, responsive design
- ⚡ Fast performance with React Query
- 🔄 Real-time data from Django backend
- 📱 Mobile-first approach
- 🎯 SEO optimized
- 🌙 Dark/Light theme support

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui
- React Query
- React Router

### Backend
- Django REST Framework
- PostgreSQL
- Token Authentication

## Setup

### Prerequisites
- Node.js 18+
- Python 3.8+
- Django backend running on port 8000

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Configure environment variables:
```env
VITE_API_BASE_URL=http://localhost:8000
```

4. Start development server:
```bash
npm run dev
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd profile-backend
```

2. Activate virtual environment:
```bash
source app_env/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Start development server:
```bash
python manage.py runserver
```

## API Endpoints

The frontend integrates with the following Django endpoints:

- `GET /api/profiles/user-profile/` - Complete user profile
- `GET /api/profiles/social-media-links/` - Social media links
- `GET /api/profiles/projects/` - Projects
- `GET /api/profiles/skills/` - Skills
- `GET /api/profiles/skill-categories/` - Skill categories
- `GET /api/profiles/work-experience/` - Work experience
- `GET /api/users/profile/` - User profile

## Data Flow

1. Frontend components use React Query hooks to fetch data
2. API service handles HTTP requests to Django backend
3. Data is cached and managed by React Query
4. Components render with loading states and error handling

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Django backend URL | `http://localhost:8000` |

## Development

### Adding New Components

1. Create component in `src/components/`
2. Add corresponding API endpoint in `src/services/api.ts`
3. Create hook in `src/hooks/use-profile.ts`
4. Import and use in your component

### Styling

- Uses Tailwind CSS for styling
- Shadcn/ui components for UI elements
- Custom CSS classes in `src/index.css`

## Build

```bash
npm run build
```

## Deploy

The project is configured for Netlify deployment. Build artifacts will be in the `dist/` directory.

## License

MIT
