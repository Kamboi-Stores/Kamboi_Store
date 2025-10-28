# Quick Setup Guide

## 🚀 Quick Start

Follow these steps to get your restaurant project running:

### 1. Install Dependencies

```bash
# Install web dependencies
cd web
npm install

# Install studio dependencies  
cd ../studio
npm install
```

### 2. Create Environment Files

Create `web/.env.local`:
```bash
SANITY_PROJECT_ID=<your_sanity_proj_id>
SANITY_DATASET=production
SANITY_API_READ_TOKEN=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=
GOOGLE_GEOCODING_API_KEY=
REVALIDATE_SECRET=your-secret-here
```

Create `studio/.env.local`:
```bash
SANITY_STUDIO_PROJECT_ID=<your_sanity_proj_id>
SANITY_STUDIO_DATASET=production
```

### 3. Start Development Servers

**Terminal 1 - Sanity Studio:**
```bash
cd studio
npx sanity dev
```
Studio will run on: http://localhost:3333

**Terminal 2 - Web App:**
```bash
cd web
npm run dev
```
Web app will run on: http://localhost:3000

### 4. Access Your Project

- **Sanity Studio**: http://localhost:3333 (Content Management)
- **Website**: http://localhost:3000 (Public Website)

## 🔧 Required API Keys

1. **Google Geocoding API**: Get from [Google Cloud Console](https://console.cloud.google.com/)
2. **Web3Forms**: Get from [Web3Forms](https://web3forms.com/)
3. **Sanity Token**: Generate from your Sanity project settings

## ✅ Verification

- ✅ Sanity Studio loads without errors
- ✅ Web app loads without errors  
- ✅ No console errors in browser
- ✅ Environment variables are loaded correctly

## 🆘 Need Help?

- Check the main README.md for detailed instructions
- Ensure Node.js version 18+ is installed
- Verify all environment variables are set correctly
- Check that ports 3000 and 3333 are available
