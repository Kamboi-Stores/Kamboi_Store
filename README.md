# Restaurant Starter Project

A modern restaurant website built with Next.js and Sanity CMS, featuring location management, menu display, and contact forms.

## 🚀 Features

- **Next.js 14** with App Router
- **Sanity CMS** for content management
- **TypeScript** for type safety
- **Location Management** with geocoding
- **Menu System** with categories and items
- **Contact Forms** with Web3Forms integration
- **SEO Optimized** with sitemap and robots.txt
- **Responsive Design** for all devices

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd restaurant-starter
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

Create environment files for both the web app and Sanity studio:

#### For the Web App (`web/.env.local`):

```bash
# Sanity Configuration
SANITY_PROJECT_ID=p4mai67v
SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_sanity_read_token_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Google Analytics (optional)
NEXT_PUBLIC_GA4_ID=your_ga4_id_here

# Web3Forms (for contact forms)
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_key_here

# Google Geocoding API (for location services)
GOOGLE_GEOCODING_API_KEY=your_google_api_key_here

# Revalidation Secret (for ISR)
REVALIDATE_SECRET=your_revalidation_secret_here
```

#### For Sanity Studio (`studio/.env.local`):

```bash
SANITY_STUDIO_PROJECT_ID=p4mai67v
SANITY_STUDIO_DATASET=production
```

### 4. Sanity Setup

#### Initialize Sanity (if not already done):

```bash
cd studio
npx sanity init
```

#### Start Sanity Studio:

```bash
cd studio
npm run dev
```

The Sanity Studio will be available at `http://localhost:3333`

### 5. Web App Setup

#### Start the Next.js Development Server:

```bash
cd web
npm run dev
```

The web application will be available at `http://localhost:3000`

## 🔧 Configuration

### Sanity Project ID

The project is configured to use the Sanity project ID `p4mai67v`. If you need to use a different project:

1. Update `studio/sanity.config.ts`
2. Update `web/lib/sanity.client.ts`
3. Update your environment variables

### Content Types

The project includes the following Sanity content types:

- **Location**: Restaurant locations with addresses and coordinates
- **MenuCategory**: Menu categories (e.g., Appetizers, Main Course)
- **MenuItem**: Individual menu items with prices and descriptions
- **Page**: Static pages (About, Contact, etc.)
- **SiteSettings**: Global site configuration

## 📁 Project Structure

```
restaurant-starter/
├── web/                    # Next.js web application
│   ├── app/               # App Router pages
│   ├── components/        # React components
│   ├── lib/              # Utility functions and Sanity client
│   └── styles/           # Global styles
├── studio/                # Sanity CMS studio
│   ├── schemas/          # Sanity schema definitions
│   └── sanity.config.ts  # Sanity configuration
└── README.md
```

## 🚀 Deployment

### Vercel (Recommended for Next.js)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Sanity Studio Deployment

```bash
cd studio
npm run deploy
```

## 🔑 API Keys & Services

### Required Services:

1. **Sanity**: Content management system
2. **Google Geocoding API**: For location services
3. **Web3Forms**: For contact form handling

### Optional Services:

1. **Google Analytics**: For website analytics
2. **Google Maps**: For enhanced location features

## 🐛 Troubleshooting

### Common Issues:

1. **Sanity Project ID Error**: Ensure your project ID only contains lowercase letters, numbers, and dashes
2. **Environment Variables**: Make sure all required environment variables are set
3. **Port Conflicts**: Ensure ports 3000 (web) and 3333 (studio) are available

### Getting Help:

- Check the [Next.js documentation](https://nextjs.org/docs)
- Check the [Sanity documentation](https://www.sanity.io/docs)
- Review the console for error messages

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support, please open an issue in the repository or contact the development team.

