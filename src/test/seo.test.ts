import { describe, expect, it } from 'vitest';
import { siteUrl, socialImageUrl, logoUrl, absoluteUrl, pageHead, practiceSchema, siteSchema, breadcrumbSchema } from '@/lib/seo';
import { practice } from '@/lib/practice';

describe('Production SEO and local business metadata', () => {
 it('uses the official domain rather than the Lovable preview', () => {
  expect(siteUrl).toBe('https://ashnioptometrists.com');
  expect(absoluteUrl('/eye-care')).toBe('https://ashnioptometrists.com/eye-care');
 });
 it('emits an indexable canonical URL and OG URL for each page', () => {
  const head = pageHead('Eye care', 'An optometry practice in Rossburgh.', '/eye-care');
  expect(head.links).toContainEqual({rel: 'canonical', href: 'https://ashnioptometrists.com/eye-care'});
  expect(head.meta).toContainEqual({property: 'og:url', content: 'https://ashnioptometrists.com/eye-care'});
  expect(head.meta).toContainEqual({name: 'robots', content: 'index, follow, max-image-preview:large'});
 });
 it('exposes one branded high-resolution social sharing image for the official domain', () => {
  const head = pageHead('Rossburgh optometrist', 'Eyecare in Durban.', '/eye-care');
  expect(socialImageUrl).toBe('https://ashnioptometrists.com/og-ashni.png');
  expect(head.meta).toContainEqual({property: 'og:image', content: socialImageUrl});
  expect(head.meta).toContainEqual({property: 'og:image:width', content: '1200'});
  expect(head.meta).toContainEqual({property: 'og:image:height', content: '630'});
  expect(head.meta).toContainEqual({name: 'twitter:image', content: socialImageUrl});
  expect(head.meta).toContainEqual({name: 'twitter:card', content: 'summary_large_image'});
  expect(practiceSchema.logo).toBe(logoUrl);
 });
 it('uses the official full practice name and consistent address', () => {
  expect(practice.name).toBe('Ashni Penchaliah Optometrists');
  expect(practiceSchema.name).toBe(practice.name);
  expect(practiceSchema.address.streetAddress).toBe('51 Titren Road');
  expect(practiceSchema.address.postalCode).toBe('4094');
  expect(siteSchema.url).toBe(siteUrl);
 });
 it('advertises only the confirmed R90 offer', () => {
  const catalog = practiceSchema.hasOfferCatalog.itemListElement[0];
  expect(catalog.price).toBe(90);
  expect(catalog.priceCurrency).toBe('ZAR');
  expect(catalog.url).toBe('https://ashnioptometrists.com/drivers-licence-eye-test');
 });
 it('builds valid breadcrumb positions for the R90 landing page', () => {
  const breadcrumbs = breadcrumbSchema([{name:'Home',path:'/'},{name:'Driving Licence Eye Test',path:'/drivers-licence-eye-test'}]);
  expect(breadcrumbs.itemListElement.map(x=>x.position)).toEqual([1,2]);
  expect(breadcrumbs.itemListElement[1].item).toBe('https://ashnioptometrists.com/drivers-licence-eye-test');
 });
});
