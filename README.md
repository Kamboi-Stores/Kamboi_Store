# Kamboi Gas Station Store Website

A modern gas station and convenience store website built with Next.js and Sanity CMS, featuring location management with real-time store hours, professional design, and comprehensive store services.

## 🚀 Features

- **Next.js 14** with App Router and TypeScript
- **Sanity CMS** for content management
- **Real-time Store Status** with dynamic open/closed indicators
- **Location Services** with GPS and ZIP code search
- **Store Hours Management** with day-specific scheduling
- **Professional Gas Station Theme** with red/blue color scheme
- **Mobile-Responsive Design** optimized for all devices
- **SEO Optimized** with sitemap and robots.txt

## 🏪 Gas Station Features

### 🕒 **Store Hours & Status**
- Real-time open/closed status calculation
- Day-specific store hours via Sanity CMS
- Countdown timers for opening/closing
- Fallback hours system for reliability
- Professional status indicators on location cards

### 📍 **Location Services**
- Multiple store location management
- ZIP code and GPS-based store finder
- Distance calculation with Haversine formula
- Interactive location cards with store details
- Store-specific contact information and hours

### 🎨 **Professional Design**
- **Gas Station Color Scheme**: Professional red (#dc2626) and blue (#0ea5e9) theme
- **Enhanced Typography**: Professional text styling with shadows and emphasis
- **Logo Animation**: Smooth zoom animation on homepage
- **Mobile-First Navigation**: Clean, professional mobile experience
- **Optimized Layout**: Full-width responsive design

### 🔧 **Technical Features**
- **Dual Time Format Support**: Handles both 12-hour and 24-hour time formats
- **Robust Error Handling**: Graceful fallbacks for time parsing issues
- **Real-time Updates**: Minute-by-minute status calculations
- **Debug Logging**: Comprehensive console logging for development
- **CDN-Free Data**: Fresh data from Sanity without CDN delays

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** (version 20.19 or higher - required for Sanity v4.12.0)
- **npm** package manager
- **Git** for version control
- **Sanity Account** for content management

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Kamboi-Stores/Kamboi_Store.git
cd Kamboi_Store
```

### 2. Install Dependencies

Install dependencies for both the web app and Sanity studio:

```bash
# Install web app dependencies
cd web
npm install

# Install Sanity studio dependencies
cd ../studio
npm install
```

### 3. Environment Configuration

#### For the Web App (`web/.env.local`):

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=qxbunha1
SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_sanity_read_token_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Google Geocoding API (for location services)
GOOGLE_GEOCODING_API_KEY=your_google_api_key_here

# Revalidation Secret (for ISR)
REVALIDATE_SECRET=your_revalidation_secret_here
```

#### For Sanity Studio (`studio/.env.local`):

```bash
SANITY_STUDIO_PROJECT_ID=qxbunha1
SANITY_STUDIO_DATASET=production
```

### 4. Sanity Setup

#### Access Sanity Studio:

The Sanity Studio is deployed at: `https://kamboistores.sanity.studio`

Or run locally:

```bash
cd studio
npm run dev
```

Local studio available at `http://localhost:3333`

### 5. Web App Setup

#### Start the Next.js Development Server:

```bash
cd web
npm run dev
```

The web application will be available at `http://localhost:3000`

## 🔧 Configuration

### Sanity Project Configuration

The project uses Sanity project ID `qxbunha1` with the following content types:

- **Location**: Gas station locations with addresses, coordinates, and store hours
- **Page**: Static pages (About, Contact, Terms, Privacy, etc.)
- **SiteSettings**: Global site configuration and branding

### Store Hours Configuration

Store hours are managed through Sanity CMS with the following structure:

```typescript
hours: [
  { day: "monday", open: "06:30", close: "22:30" },
  { day: "tuesday", open: "06:30", close: "22:30" },
  // ... other days
]
```

Supports both 12-hour ("6:30 AM") and 24-hour ("06:30") formats.

## 📁 Project Structure

```
Kamboi_Store/
├── web/                    # Next.js web application
│   ├── app/               # App Router pages and layouts
│   │   ├── locations/     # Location finder and store pages
│   │   ├── about/         # About page
│   │   ├── contact/       # Contact forms
│   │   ├── api/           # API routes for geocoding and revalidation
│   │   └── styles/        # Global CSS and theming
│   ├── components/        # React components
│   │   ├── LocationStatus.tsx  # Real-time store status component
│   │   ├── LocationCard.tsx    # Store location display
│   │   ├── LocationFinder.tsx  # Store search functionality
│   │   └── Navigation.tsx      # Site navigation
│   └── lib/              # Utilities and Sanity client
├── studio/                # Sanity CMS studio
│   ├── schemas/          # Content type definitions
│   └── sanity.config.ts  # Studio configuration
└── README.md
```

## 🚀 Deployment

### Web Application (Vercel Recommended)

1. Connect repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Sanity Studio

The studio is deployed at `https://kamboistores.sanity.studio`

To deploy updates:

```bash
cd studio
npx sanity deploy
```

## 🎨 Customization

### Theme Colors

The gas station theme uses professional colors defined in `web/app/styles/globals.css`:

```css
:root {
  --primary: #dc2626;     /* Professional Red */
  --secondary: #0ea5e9;   /* Professional Blue */
  --accent: #dc2626;      /* Accent color */
}
```

### Logo and Branding

- Replace `web/public/logo.png` with your gas station logo
- Update site name in `web/app/layout.tsx`
- Modify hero content in `web/app/page.tsx`

## 🏪 Content Management

### Adding Store Locations

1. Access Sanity Studio at `https://kamboistores.sanity.studio`
2. Navigate to "Location" content type
3. Add store details including:
   - Name and address
   - GPS coordinates (lat/lng)
   - Phone number
   - Store hours for each day of the week
   - Active status

### Store Hours Format

Hours can be entered in either format:
- **24-hour**: "06:30" to "22:30"
- **12-hour**: "6:30 AM" to "10:30 PM"

For closed days, enter "closed" in both open and close fields.

## 🔍 Features Deep Dive

### Real-time Store Status

The `LocationStatus` component provides:
- Live open/closed status calculation
- Countdown to next status change
- Support for overnight hours (e.g., closing at 1:00 AM)
- Fallback to default hours if Sanity data unavailable
- Comprehensive error handling and logging

### Location Services

- **ZIP Code Search**: Find stores by entering ZIP code
- **GPS Detection**: Browser-based location detection
- **Distance Calculation**: Accurate distance using Haversine formula
- **Store Details**: Address, phone, hours, and status for each location

## 🐛 Troubleshooting

### Common Issues

1. **Node.js Version**: Ensure Node.js 20.19+ for Sanity v4.12.0 compatibility
2. **Time Display Issues**: Check Sanity time format (supports both 12/24-hour)
3. **Store Status**: Verify system clock and timezone settings
4. **Sanity Connection**: Confirm project ID `qxbunha1` and API tokens

### Debug Information

The application includes extensive logging:
- Time parsing and formatting in browser console
- Sanity data structure in development mode
- API responses for location and hours data

## 🔑 Required Services

### Essential Services

1. **Sanity CMS**: Content management (Project ID: qxbunha1)
2. **Google Geocoding API**: Location services and address validation

### Optional Services

1. **Google Analytics**: Website analytics and tracking
2. **Vercel**: Hosting and deployment platform

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support and issues:
- Open an issue in the [GitHub repository](https://github.com/Kamboi-Stores/Kamboi_Store)
- Check console logs for debugging information
- Verify Sanity Studio data structure

---

**Built for Kamboi Gas Station Stores** ⛽

