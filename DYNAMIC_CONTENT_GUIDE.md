# Frontend API Integration - Implementation Guide

## Overview

The frontend has been updated to fetch all page content dynamically from the backend Laravel API. This allows administrators to manage content through the backend without modifying frontend code.

## Updated Pages

### 1. **Home Page** (`/app/page.tsx`)
- **Status**: ✅ Dynamic
- **API Endpoint**: `/api/content/home`
- **Features Fetched**:
  - Hero slider content
  - Statistics
  - Features section
  - How it works section
  - Product categories
  - Testimonials
  - FAQ section
  - Newsletter section

### 2. **About Page** (`/app/about/page.tsx`)
- **Status**: ✅ Dynamic
- **API Endpoint**: `/api/content/about`
- **Features Fetched**:
  - Mission statement
  - Vision statement
  - Company statistics
  - Team members (with names, positions, bios, images)

### 3. **Contact Page** (`/app/contact/page.tsx`)
- **Status**: ✅ Dynamic
- **API Endpoint**: `/api/content/contact`
- **Features Fetched**:
  - Hero section
  - Contact information (email, phone, address, business hours)
  - FAQ section

### 4. **Privacy Policy** (`/app/privacy/page.tsx`)
- **Status**: ✅ Dynamic (Server Component)
- **API Endpoint**: `/api/content/privacy`
- **Features**:
  - Full policy content
  - Last updated date
  - HTML content rendering

### 5. **Terms of Service** (`/app/terms/page.tsx`)
- **Status**: ✅ Dynamic (Server Component)
- **API Endpoint**: `/api/content/terms`
- **Features**:
  - Full terms content
  - Last updated date
  - HTML content rendering

### 6. **Products Page** (`/app/products/page.tsx`)
- **Status**: ✅ Dynamic (Already implemented)
- **API Endpoint**: `/api/products`
- **Features**:
  - Product listing with pagination
  - Category filtering
  - Search functionality

## Configuration

### Environment Variables

Create `.env.local` in the frontend directory:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://backend.nextdigihome.com
NEXT_PUBLIC_API_BASE_PATH=/api
```

**For Production**, update the `NEXT_PUBLIC_API_URL` to your production backend URL:
```bash
NEXT_PUBLIC_API_URL=https://your-production-api.com
```

### API Utility

All API calls use the centralized utility in `/app/utils/api.ts`:

```typescript
// Import the utility
import { fetchHomeContent, fetchAboutContent, apiFetch } from "@/app/utils/api";

// Use predefined methods
const data = await fetchHomeContent();

// Or use the generic method
const customData = await apiFetch('/api/custom-endpoint');
```

## Backend Database Setup

The backend requires the following database tables and seed data:

### Required Models

1. **HeroSlider** - Homepage hero sections
   ```sql
   - id, title, subtitle, description, cta_text, cta_link, image
   - background_color, text_color, sort_order, is_active
   ```

2. **PageContent** - Dynamic page content
   ```sql
   - id, page (home/about/contact/privacy/terms), section
   - title, description, content, sort_order, is_active
   ```

3. **Stat** - Statistics (products sold, customers, etc.)
   ```sql
   - id, key, value, label, icon, sort_order, is_active
   ```

4. **TeamMember** - Team information
   ```sql
   - id, name, position, bio, image, sort_order, is_active
   ```

5. **ContactInfo** - Contact details
   ```sql
   - id, type (email/phone/address/hours), label, value, description, sort_order, is_active
   ```

6. **Testimonial** - Customer testimonials
   ```sql
   - id, name, role, content, rating, image, sort_order, is_active
   ```

### Seeding Data

Run Laravel seeders to populate initial data:

```bash
php artisan db:seed
# or migrate with fresh seed
php artisan migrate:fresh --seed
```

## API Endpoints Reference

```
GET  /api/content/home          - Home page content
GET  /api/content/about         - About page content  
GET  /api/content/contact       - Contact page content
GET  /api/content/privacy       - Privacy policy content
GET  /api/content/terms         - Terms of service content
GET  /api/products              - Products with pagination
GET  /api/products?page=2       - Paginated products
GET  /api/hero-sliders          - All hero sliders
GET  /api/stats                 - All statistics
GET  /api/team-members          - All team members
GET  /api/contact-info          - All contact information
GET  /api/testimonials          - All testimonials
```

## Error Handling

All pages include:

1. **Loading States** - Spinner displays while fetching
2. **Fallback Content** - Static fallback shown if API fails
3. **Error Messages** - User-friendly error notifications
4. **Try-Catch Blocks** - Graceful error handling

## Frontend Architecture

### Data Types

Each page defines TypeScript interfaces:

```typescript
interface HomeContent {
  hero_sliders: HeroSlide[];
  stats: Stat[];
  features: Feature[];
  // ...
}
```

### Client vs Server Components

- **Client Components** (About, Contact): Use `'use client'` with `useState/useEffect`
- **Server Components** (Privacy, Terms): Use `async` function for server-side fetching

### Responsive Design

All pages maintain responsive layouts:
- Mobile-first approach
- Tailwind CSS utilities
- Gradient animations and glass-morphism effects

## Testing

### 1. Verify Backend API

```bash
# Test home content endpoint
curl https://backend.nextdigihome.com/api/content/home

# Expected response
{
  "success": true,
  "data": {
    "hero_sliders": [...],
    "stats": [...],
    "features": [...]
  }
}
```

### 2. Start Frontend Development

```bash
cd frontend
npm run dev
```

Access pages:
- Home: http://localhost:3000
- About: http://localhost:3000/about
- Contact: http://localhost:3000/contact
- Privacy: http://localhost:3000/privacy
- Terms: http://localhost:3000/terms
- Products: http://localhost:3000/products

### 3. Check Browser Console

- Verify no console errors
- Confirm API calls are successful
- Check Network tab for API responses

## Troubleshooting

### Problem: API calls failing with CORS error

**Solution**: Ensure backend has CORS configured:
```php
// config/cors.php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_methods' => ['*'],
'allowed_origins' => ['http://localhost:3000'],
```

### Problem: Content not loading, showing fallback data

**Solution**: 
1. Verify backend is running on port 8000
2. Check API endpoint is returning correct data
3. Verify `.env.local` has correct `NEXT_PUBLIC_API_URL`
4. Check browser network tab for failed requests

### Problem: Images not displaying

**Solution**:
1. Ensure image URLs in database are correct
2. Verify image files exist in public/uploads
3. Check if absolute URLs are needed vs relative paths

## Deployment

### Development
```bash
npm run dev  # Runs on http://localhost:3000
```

### Production Build
```bash
npm run build
npm run start
```

### Environment Setup for Production

Update `.env.local`:
```bash
NEXT_PUBLIC_API_URL=https://your-domain.com
NEXT_PUBLIC_API_BASE_PATH=/api
```

## Key Features

✅ Dynamic content management  
✅ API-driven architecture  
✅ Fallback static content  
✅ Error handling  
✅ Loading states  
✅ Type-safe TypeScript  
✅ Responsive design  
✅ CORS-enabled  
✅ Centralized API utility  
✅ Environment configuration  

## Future Enhancements

- [ ] Implement content caching with SWR
- [ ] Add real-time content updates
- [ ] Implement admin dashboard for content editing
- [ ] Add multi-language support with i18n
- [ ] Implement image optimization
- [ ] Add analytics tracking
- [ ] Implement newsletter subscription
- [ ] Add contact form email integration

## Support

For issues or questions:
1. Check the browser console for errors
2. Verify API endpoints are responding
3. Check backend logs for issues
4. Review `.env.local` configuration
