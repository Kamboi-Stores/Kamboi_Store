export async function getSiteSettings() {
  const q = `*[_type=="siteSettings"][0]{siteName, "logoUrl": logo.asset->url}`;
  return client.fetch(q);
}
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'qxbunha1',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-08-01',
  useCdn: false, // Disabled CDN to get fresh data
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'published'
});

export async function getActiveLocations() {
  const q = `*[_type=="location" && isActive==true]{
    name, 
    "slug":slug.current, 
    address, 
    city, 
    state, 
    zip, 
    lat, 
    lng, 
    phone, 
    hours[]{
      day,
      open,
      close
    }, 
    orderUrl,
    doordashUrl
  } | order(name asc)`;
  
  const result = await client.fetch(q);
  console.log('Sanity getActiveLocations result:', result);
  return result;
}

export async function getLocationBySlug(slug:string) {
  const q = `*[_type=="location" && slug.current==$slug][0]{name, "slug":slug.current, address, city, state, zip, lat, lng, phone, hours, orderUrl, doordashUrl}`;
  return client.fetch(q, { slug });
}

export async function getLocationsByZip(zip: string) {
  const q = `*[_type=="location" && isActive==true && zip==$zip]{name, "slug":slug.current, address, city, state, zip, lat, lng, phone, hours, orderUrl, doordashUrl} | order(name asc)`;
  return client.fetch(q, { zip });
}

export async function getMenu() {
  const q = `*[_type=="menuCategory"]|order(displayOrder asc){
    name, "slug":slug.current,
    "items": *[_type=="menuItem" && references(^._id) && isActive==true]{name, description, price, dietaryTags, isFeatured, "img": image.asset->url}
    | order(isFeatured desc, name asc)
  }`;
  return client.fetch(q);
}

export async function getPage(slug: string) {
  const q = `*[_type=="page" && slug.current==$slug][0]{
    title,
    "slug": slug.current,
    body,
    "heroImage": heroImage.asset->url
  }`;
  return client.fetch(q, { slug });
}

export async function getHomepage() {
  const q = `*[_type=="homepage"][0]{
    title,
    subtitle,
    description,
    ctaText,
    ctaLink,
    "heroImage": heroImage.asset->url,
    locationTitle
  }`;
  return client.fetch(q);
}

export async function getRewards() {
  const q = `*[_type=="rewards"][0]{
    title,
    description,
    "rewardsPdfUrl": rewardsPdf.asset->url
  }`;
  return client.fetch(q);
}
