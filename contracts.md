# Portfolio Backend Integration Contracts

## API Endpoints

### Public API (Frontend consumption)
```
GET /api/profile - Get basic profile info
GET /api/projects - Get all projects
GET /api/experience - Get work experience
GET /api/education - Get education details
GET /api/skills - Get skills and categories
GET /api/contact - Submit contact form
GET /api/testimonials - Get testimonials (optional feature)
```

### Admin API (Content management)
```
POST /api/admin/login - OAuth authentication
GET /api/admin/dashboard - Admin dashboard data

Projects:
GET /api/admin/projects - Get all projects for editing
POST /api/admin/projects - Create new project
PUT /api/admin/projects/:id - Update project
DELETE /api/admin/projects/:id - Delete project

Experience:  
GET /api/admin/experience - Get all experience
POST /api/admin/experience - Create new experience
PUT /api/admin/experience/:id - Update experience
DELETE /api/admin/experience/:id - Delete experience

Skills:
GET /api/admin/skills - Get all skills
POST /api/admin/skills - Create new skill category
PUT /api/admin/skills/:id - Update skill category
DELETE /api/admin/skills/:id - Delete skill category

Education:
GET /api/admin/education - Get education
PUT /api/admin/education/:id - Update education

Profile:
GET /api/admin/profile - Get profile for editing
PUT /api/admin/profile - Update profile info

Settings:
GET /api/admin/settings - Get display settings
PUT /api/admin/settings - Update feature toggles
```

## Database Schema

### Profile Collection
```javascript
{
  _id: ObjectId,
  name: String,
  title: String,
  tagline: String,
  bio: String,
  location: String,
  email: String,
  phone: String,
  social: {
    github: String,
    linkedin: String,
    website: String
  },
  availability: {
    status: String, // "available", "busy", "unavailable"
    message: String
  },
  images: {
    professional: String,
    casual: String
  },
  updatedAt: Date
}
```

### Projects Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  longDescription: String,
  technologies: [String],
  type: String,
  duration: String,
  status: String, // "completed", "ongoing", "planned"
  achievements: [String],
  image: String,
  links: {
    github: String,
    live: String,
    demo: String
  },
  featured: Boolean,
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Experience Collection
```javascript
{
  _id: ObjectId,
  title: String,
  company: String,
  location: String,
  type: String, // "internship", "full-time", "contract", "freelance"
  startDate: Date,
  endDate: Date,
  current: Boolean,
  description: String,
  achievements: [String],
  technologies: [String],
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Skills Collection
```javascript
{
  _id: ObjectId,
  category: String,
  title: String,
  description: String,
  skills: [String],
  icon: String,
  color: String,
  order: Number,
  visible: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Education Collection
```javascript
{
  _id: ObjectId,
  degree: String,
  specialization: String,
  institution: String,
  startDate: Date,
  endDate: Date,
  current: Boolean,
  grade: String,
  subjects: [String],
  achievements: [String],
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Settings Collection
```javascript
{
  _id: ObjectId,
  features: {
    testimonials: Boolean,
    darkMode: Boolean,
    animations: Boolean,
    particleEffects: Boolean,
    contactForm: Boolean
  },
  theme: {
    primaryColor: String,
    accentColor: String,
    fontFamily: String
  },
  seo: {
    title: String,
    description: String,
    keywords: [String]
  },
  updatedAt: Date
}
```

### Contact Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  subject: String,
  message: String,
  status: String, // "new", "read", "replied", "archived"
  createdAt: Date,
  updatedAt: Date
}
```

## Frontend Integration Changes

### Mock Data Removal
- Remove mock data from all components
- Replace with API calls using axios
- Add loading states and error handling

### New Features to Add
1. Theme Context Provider for light/dark mode
2. Animation toggles based on user preferences
3. Admin authentication flow
4. Admin panel routes and components
5. Content management interface

### Updated Content Strategy
- Emphasize 7+ years of coding journey
- Position as emerging professional with strong foundation
- Highlight rapid learning and modern tech adoption
- Focus on quality over quantity in project showcase

## Authentication Flow
1. Google OAuth integration for admin access
2. JWT token storage in localStorage
3. Protected admin routes
4. Simple logout functionality

## File Structure Updates
```
/backend
  /models - MongoDB schemas
  /routes - API endpoints
  /middleware - Auth and validation
  /config - Database and OAuth config
  /utils - Helper functions
  
/frontend/src
  /context - Theme and Auth contexts
  /services - API service functions
  /admin - Admin panel components
  /hooks - Custom React hooks
```

This contract ensures seamless integration between frontend and backend while maintaining the premium design quality and adding powerful content management capabilities.