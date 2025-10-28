# Kamboi Gas Station - Sanity Studio

Content management system for Kamboi Gas Station stores, handling location data, store hours, and site content.

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   cd studio && npm install
   ```

2. **Configuration**
   - Project ID: `qxbunha1`
   - Dataset: `production`
   - Studio Host: `kamboistores`

3. **Development**
   ```bash
   npm run dev
   # Studio available at http://localhost:3333
   ```

4. **Live Studio Access**
   ```
   https://kamboistores.sanity.studio
   ```

## 🏪 Content Types

### **Location Management**
- **Name**: Gas station store name
- **Address**: Full street address with city, state, ZIP
- **Coordinates**: Latitude/longitude for GPS services
- **Phone**: Store contact number
- **Hours**: Day-specific operating hours
- **Active Status**: Enable/disable store visibility

### **Store Hours Format**
Supports both time formats:
```
12-hour: "6:30 AM" to "10:30 PM"
24-hour: "06:30" to "22:30"
Closed: "closed" in both open and close fields
```

### **Page Content**
- **Static Pages**: About, Contact, Terms, Privacy
- **Site Settings**: Global configuration and branding

## 🔧 Deployment

### **Deploy Studio**
```bash
npm run deploy
```
Deploys to: `https://kamboistores.sanity.studio`

### **Webhook Setup**
Create webhook pointing to:
```
https://yourdomain.com/api/revalidate?secret=YOUR_SECRET
```
For automatic website updates when content changes.

## 📝 Content Guidelines

### **Adding New Store Locations**
1. Navigate to "Location" content type
2. Fill in all required fields:
   - Store name and address
   - GPS coordinates (lat/lng)
   - Phone number
   - Operating hours for each day
3. Set active status to publish

### **Store Hours Best Practices**
- Use consistent time format across all stores
- For 24-hour stores, set open: "00:00", close: "23:59"
- For closed days, use "closed" in both fields
- Consider overnight hours (closing after midnight)

## 🛠️ Technical Details

- **Project ID**: qxbunha1
- **Environment**: Production dataset
- **Schema**: Location-focused content types
- **Integration**: Real-time updates to Next.js frontend
