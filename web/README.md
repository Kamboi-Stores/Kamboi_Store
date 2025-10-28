    
# Kamboi Gas Station Website

A modern, professional gas station and convenience store website built with Next.js + Sanity CMS. Features real-time store hours, location services, professional gas station theming, and comprehensive mobile-responsive design.

## ✨ Features

### ⛽ **Gas Station Specific Features**
- **Real-time Store Status**: Live open/closed indicators with countdown timers
- **Store Hours Management**: Day-specific hours via Sanity CMS with fallback system
- **Professional Design**: Gas station-appropriate red/blue color scheme
- **Location Services**: Multiple store locations with GPS and ZIP code search
- **Mobile-Optimized**: Professional mobile experience for customers on-the-go

### 🎨 **Professional UI/UX**
- **Gas Station Theme**: Professional red (#dc2626) and blue (#0ea5e9) color palette
- **Enhanced Typography**: Professional text styling with shadows and visual emphasis
- **Logo Animation**: Smooth zoom animation instead of rotation for professional appearance
- **Responsive Navigation**: Clean header with optimized mobile hamburger menu
- **Store Status Indicators**: Visual open/closed status with real-time updates

### 📍 **Advanced Location Services**
- **Multi-Store Management**: Support for multiple gas station locations
- **Real-time Status**: Automatic open/closed calculation based on current time
- **Distance Calculation**: Haversine formula for accurate store distance
- **Store Hours Display**: Comprehensive hours display with today's hours emphasis
- **GPS Integration**: Automatic location detection for nearest store finding

### 🕒 **Store Hours System**
- **Dual Format Support**: Handles both 12-hour ("6:30 AM") and 24-hour ("06:30") time formats
- **Day-Specific Hours**: Different hours for different days of the week
- **Overnight Support**: Handles stores that close after midnight
- **Fallback System**: Default hours if Sanity data unavailable
- **Real-time Calculation**: Minute-by-minute status updates

### 📱 **Mobile Experience**
- **Touch-Friendly Interface**: Optimized for mobile gas station customers
- **Fast Loading**: Optimized for mobile networks and quick access
- **Professional Navigation**: Clean, easy-to-use mobile menu
- **Location-First Design**: Quick access to store finder and hours

### 🔧 **Technical Features**
- **Robust Error Handling**: Graceful fallbacks for time parsing and data issues
- **Debug Logging**: Comprehensive console logging for development
- **CDN-Free Data**: Fresh data from Sanity without CDN delays
- **Type Safety**: Full TypeScript implementation
- **SEO Optimized**: Meta tags and structured data for search engines

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   cd web && npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Configure your environment variables (see below)
   ```

3. **Development Server**
   ```bash
   npm run dev
   # Open http://localhost:3000
   ```

## ⚙️ Environment Variables

### **Required for Full Functionality**
```bash
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=qxbunha1
SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token  # Optional for public data

# Google Services
GOOGLE_GEOCODING_API_KEY=your_api_key  # Enable Geocoding API in Google Cloud

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Revalidation (for Sanity webhooks)
REVALIDATE_SECRET=your_secret_key
```

### **API Key Setup**
- **Google Geocoding API**: Enable in Google Cloud Console for location services
- **Sanity**: Project ID `qxbunha1` with production dataset

## 🏪 Store Management

### **Sanity Studio Access**
- **Live Studio**: https://kamboistores.sanity.studio
- **Local Development**: http://localhost:3333 (when running `npm run dev` in studio)

### **Store Hours Configuration**
```typescript
// Example store hours in Sanity
hours: [
  { day: "monday", open: "06:30", close: "22:30" },
  { day: "tuesday", open: "6:30 AM", close: "10:30 PM" },
  { day: "wednesday", open: "closed", close: "closed" },
  // Supports both 12-hour and 24-hour formats
]
```

### **Location Data Structure**
- **Name**: Store name (e.g., "Kamboi Gas Station #1")
- **Address**: Full street address
- **Coordinates**: Latitude and longitude for distance calculation
- **Phone**: Store contact number
- **Hours**: Day-specific operating hours
- **Active Status**: Enable/disable store visibility

## 🎨 Gas Station Customization

### **Professional Theme Colors**
```css
/* Professional gas station color scheme */
:root {
  --primary: #dc2626;     /* Professional Red */
  --secondary: #0ea5e9;   /* Professional Blue */
  --accent: #dc2626;      /* Brand accent */
  --text-emphasis: Professional text styling with shadows
}
```

### **Logo & Branding**
- Replace `public/logo.png` with your gas station logo
- Update store name in `app/layout.tsx`
- Modify hero section content in `app/page.tsx`

### **Navigation Menu**
```typescript
// Professional gas station navigation
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/locations', label: 'Store Locations' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  // Removed menu/order options for gas station focus
];
```

## 🔧 Advanced Features

### **Real-time Store Status**
The `LocationStatus` component provides:
- **Live Calculation**: Real-time open/closed status
- **Countdown Timers**: Time until next status change
- **Overnight Hours**: Support for late-night operations
- **Error Handling**: Graceful fallbacks for data issues
- **Debug Logging**: Console logs for development

### **Location Services**
- **ZIP Code Search**: Find nearest stores by ZIP
- **GPS Detection**: Browser-based location services
- **Distance Calculation**: Accurate distance using Haversine formula
- **Store Cards**: Professional display with status indicators

### **Store Hours System**
- **Flexible Formats**: 12-hour or 24-hour time input
- **Day Management**: Individual hours for each day of week
- **Closed Days**: Support for stores closed on specific days
- **Fallback Hours**: Default hours if Sanity data unavailable

## 📱 Mobile Optimization

### **Gas Station Mobile Experience**
- **Quick Access**: Fast loading for customers on-the-go
- **Touch Navigation**: Large, easy-to-tap buttons and links
- **Store Finder**: Prominent location search functionality
- **Professional Design**: Clean, trustworthy appearance

### **Performance Features**
- ✅ Next.js 14 App Router for fast navigation
- ✅ Optimized images and assets
- ✅ Minimal JavaScript for fast loading
- ✅ Professional animations with CSS transforms
- ✅ Mobile-first responsive design

## 🚀 Deployment & Production

### **Sanity Webhook Setup**
1. Create webhook in Sanity Studio
2. Point to: `https://yourdomain.com/api/revalidate?secret=YOUR_SECRET`
3. Set `REVALIDATE_SECRET=YOUR_SECRET` in deployment environment
4. Enable automatic site updates when store hours change

### **Vercel Deployment** (Recommended)
```bash
# Deploy to Vercel
vercel

# Set environment variables in Vercel dashboard
# Connect GitHub repository for automatic deployments
```

## 🛠️ Development Notes

### **Key Components**
```
web/
├── components/
│   ├── LocationStatus.tsx    # Real-time store status
│   ├── LocationCard.tsx      # Store location display
│   ├── LocationFinder.tsx    # Store search functionality
│   └── Navigation.tsx        # Professional site navigation
├── app/
│   ├── locations/           # Store finder and individual store pages
│   ├── api/                 # Geocoding and revalidation APIs
│   └── styles/              # Gas station theme styling
└── lib/
    └── sanity.client.ts     # Sanity integration with debugging
```

### **Time Handling Features**
- **Dual Format Parsing**: Automatic detection of 12/24-hour formats
- **Error Recovery**: Graceful handling of malformed time data
- **Real-time Updates**: Minute-by-minute status recalculation
- **Timezone Awareness**: Proper handling of local store times

## 📝 Gas Station Customization Checklist

### **Essential Updates**
- [ ] Replace logo with gas station branding
- [ ] Update store name and details throughout site
- [ ] Configure Sanity Studio with store locations
- [ ] Set up Google Geocoding API for location services
- [ ] Test store hours and real-time status functionality
- [ ] Verify mobile experience for gas station customers
- [ ] Update contact information and store details

### **Optional Enhancements**
- [ ] Add fuel price display integration
- [ ] Implement loyalty program information
- [ ] Add convenience store product categories
- [ ] Set up automated price updating
- [ ] Configure additional analytics tracking
- [ ] Add multilingual support for diverse communities

## 📞 Support

For technical issues or customization help:
1. Check browser console for debug logs
2. Verify Sanity Studio data structure
3. Test with provided environment variables
4. Review Next.js and Sanity documentation

---

**Professional Gas Station Website Solution** ⛽
