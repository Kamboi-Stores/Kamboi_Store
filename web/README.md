    
# Gorrito Burrito Restaurant Website

A modern, fully-featured restaurant website built with Next.js + Sanity CMS. Features advanced UI/UX with dark/light themes, animated backgrounds, enhanced navigation, mobile-responsive design, and comprehensive location services.

## ✨ Features

### 🎨 **Modern UI/UX**
- **Dynamic Theme System**: Light/dark mode toggle with system preference detection
- **Animated Gradient Backgrounds**: Eye-catching hero section with CSS animations
- **Enhanced Navigation**: Sticky header with scroll detection, breadcrumbs, and active page highlighting
- **Mobile-First Design**: Responsive hamburger menu with staggered animations
- **Interactive Elements**: Hover effects, micro-interactions, and smooth transitions

### 📍 **Location Services**
- ZIP/GPS location finder with Google Geocoding API
- Interactive location cards with distance calculation
- "Find Location" button prominently featured in navigation
- Automatic location detection and suggestions

### 🍔 **Restaurant Features**
- Toast POS integration for online ordering
- Sanity CMS for easy content management
- SEO-optimized pages with meta tags
- Contact form via Formspree (no backend required)
- Rewards program page

### 📱 **Mobile Experience**
- Hamburger menu with slide-in animations
- Touch-friendly navigation
- Responsive design across all screen sizes
- Mobile-optimized spacing and interactions

### 🔧 **Technical Features**
- Full-width layout system with centered content containers
- CSS custom properties for consistent theming
- Advanced animations with cubic-bezier transitions
- Optimized performance with Next.js 13+ App Router
- TypeScript for type safety


## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   cd web && npm i
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Fill in your environment variables (see below)
   ```

3. **Development Server**
   ```bash
   npm run dev
   # Open http://localhost:3000
   ```

## ⚙️ Environment Variables

### **Required for Full Functionality**
```bash
# Sanity CMS
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token  # Optional for public data

# Google Services
GOOGLE_GEOCODING_API_KEY=your_api_key  # Enable Geocoding API

# Analytics & Site Config
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Revalidation (for Sanity webhooks)
REVALIDATE_SECRET=your_secret_key
```

### **API Key Setup**
- **Google Geocoding API**: Enable in Google Cloud Console, restrict by referrer/IP
- **Sanity**: Create project at sanity.io, get credentials from project settings

## 📧 Contact Form Setup (Formspree)

The contact form uses [Formspree](https://formspree.io) for submissions - no backend required!

### **Current Configuration**
- **Endpoint**: `https://formspree.io/f/xldpgwpd`
- **Method**: POST
- **Fields**: name, email, message

### **Form Implementation**
```html
<form action="https://formspree.io/f/xldpgwpd" method="POST">
  <input type="text" name="name" required placeholder="Your Name" />
  <input type="email" name="email" required placeholder="Your Email" />
  <textarea name="message" required placeholder="Your Message"></textarea>
  <button type="submit">Send</button>
</form>
```

### **Features**
- ✅ Spam protection included
- ✅ Email notifications to your inbox
- ✅ Dashboard for managing submissions
- ✅ No server-side code needed

## 🎨 Customization Guide

### **Theme Colors**
Update CSS custom properties in `app/styles/globals.css`:
```css
:root {
  --primary: #dc2626;     /* Red */
  --secondary: #f59e0b;   /* Orange/Yellow */
  --accent: #dc2626;      /* Accent color */
  /* Modify these to match your brand */
}
```

### **Logo & Branding**
- Replace `public/logo.png` with your restaurant logo
- Update restaurant name in `app/layout.tsx`
- Modify hero section content in `app/page.tsx`

### **Navigation Menu**
Edit navigation links in `components/Navigation.tsx`:
```typescript
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  // Add/remove/modify as needed
];
```

## 🔧 Advanced Features

### **Sanity CMS Integration**
- **Automatic Revalidation**: Set up webhook in Sanity Studio
- **Content Types**: Locations, Menu Items, Categories, Site Settings
- **Real-time Updates**: Changes in Sanity appear instantly on site

### **Location Services**
- **ZIP Code Search**: Enter ZIP to find nearest locations
- **GPS Detection**: Automatic location detection (with permission)
- **Distance Calculation**: Haversine formula for accurate distances
- **Interactive Maps**: Click to get directions

### **SEO & Analytics**
- **GA4 Integration**: Automatic tracking with privacy compliance
- **Meta Tags**: Dynamic SEO for all pages
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Search engine optimization

## 📱 Mobile Optimization

### **Responsive Design**
- Mobile-first CSS approach
- Touch-friendly navigation
- Optimized font sizes and spacing
- Fast loading on mobile networks

### **Hamburger Menu Animations**
- Staggered entrance animations
- Smooth hover effects with shimmer
- Touch gesture support
- Accessibility compliant

## 🚀 Deployment & Production

### **Sanity Webhook Setup**
1. Create webhook in Sanity Studio
2. Point to: `https://yourdomain.com/api/revalidate?secret=YOUR_SECRET`
3. Set `REVALIDATE_SECRET=YOUR_SECRET` in your deployment environment
4. Enable for content updates to trigger automatic site rebuilds

### **Vercel Deployment** (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### **Performance Optimizations**
- ✅ Next.js 13+ App Router for faster navigation
- ✅ Image optimization with Next.js Image component
- ✅ CSS custom properties for minimal runtime overhead
- ✅ Lazy loading for non-critical content
- ✅ Efficient animations with CSS transforms

## 🛠️ Development Notes

### **File Structure**
```
web/
├── app/                 # Next.js 13+ App Router
│   ├── layout.tsx      # Root layout with navigation
│   ├── page.tsx        # Homepage with hero section
│   ├── styles/         # Global CSS and theme system
│   └── [pages]/        # Individual page routes
├── components/         # Reusable React components
│   ├── Navigation.tsx  # Header with theme toggle
│   ├── Breadcrumbs.tsx # Automatic breadcrumb navigation
│   └── LocationCard.tsx # Location display component
├── lib/               # Utility functions
└── public/           # Static assets
```

### **Key Technologies**
- **Next.js 13+**: App Router, Server Components, TypeScript
- **Sanity**: Headless CMS with real-time updates
- **CSS**: Custom properties, animations, responsive design
- **APIs**: Google Geocoding, Formspree contact forms

### **Browser Support**
- ✅ Chrome/Edge (last 2 versions)
- ✅ Firefox (last 2 versions)  
- ✅ Safari (last 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Todo & Customization Checklist

### **Essential Customizations**
- [ ] Replace logo in `public/logo.png`
- [ ] Update restaurant name and details in `app/layout.tsx`
- [ ] Configure Formspree contact form endpoint
- [ ] Set up Google Geocoding API key
- [ ] Add CookieYes script in `app/layout.tsx` head section
- [ ] Configure Sanity CMS with your content
- [ ] Update theme colors to match brand
- [ ] Test all pages and functionality

### **Optional Enhancements**
- [ ] Add online ordering integration (Toast POS)
- [ ] Implement cookie consent banner
- [ ] Add social media links
- [ ] Configure email marketing integration
- [ ] Set up additional analytics tracking
- [ ] Add multilingual support
- [ ] Implement reservation system

## 📞 Support

For technical issues or customization help:
1. Check the Next.js documentation
2. Review Sanity CMS guides
3. Test with provided environment variables
4. Ensure all dependencies are up to date

---

**Built with ❤️ for modern restaurants**
