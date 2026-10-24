import { practice } from './practice';

export const siteUrl = 'https://ashnioptometrists.com';
export const siteName = 'Ashni Penchaliah Optometrists';
export const socialImageUrl = 'https://ashnioptometrists.com/og-ashni-dr-v2.png';
export const socialTitle = 'Visit Dr. Ashni Penchaliah | Optometrist in Rossburgh, Durban';
export const socialDescription = 'Visit Dr. Ashni Penchaliah, Optometrist in Rossburgh, Durban, for eye examinations, prescription spectacles and R90 driving licence eye tests.';
export const logoUrl = 'https://ashnioptometrists.com/ashni-logo-approved.svg';
export const absoluteUrl = (path = '/') => new URL(path, siteUrl).toString();

export function pageHead(title: string, description: string, path = '/') {
 const url = absoluteUrl(path);
 // Preserve each page's search title while giving shared links an unambiguous
 // practitioner identity. Keep social descriptions short enough for previews.
 const pageSocialTitle = path === '/' ? socialTitle : `${title.split(' | ')[0]} | Visit Dr. Ashni`;
 const pageSocialDescription = path === '/' ? socialDescription : `Visit Dr. Ashni Penchaliah, Optometrist in Rossburgh, Durban. ${description}`.slice(0, 190);
 return {
  meta: [
   { title },
   { name: 'description', content: description },
   { name: 'robots', content: 'index, follow, max-image-preview:large' },
   { property: 'og:title', content: pageSocialTitle },
   { property: 'og:description', content: pageSocialDescription },
   { property: 'og:type', content: 'website' },
   { property: 'og:locale', content: 'en_ZA' },
   { property: 'og:url', content: url },
   { property: 'og:site_name', content: siteName },
   { property: 'og:image', content: socialImageUrl },
   { property: 'og:image:secure_url', content: socialImageUrl },
   { property: 'og:image:type', content: 'image/png' },
   { property: 'og:image:width', content: '1200' },
   { property: 'og:image:height', content: '630' },
   { property: 'og:image:alt', content: 'Visit Dr. Ashni Penchaliah, Optometrist — Ashni Penchaliah Optometrists, Rossburgh, Durban, with elegant symmetrical spectacles' },
   { name: 'twitter:card', content: 'summary_large_image' },
   { name: 'twitter:image', content: socialImageUrl },
   { name: 'twitter:image:alt', content: 'Visit Dr. Ashni Penchaliah, Optometrist in Rossburgh, Durban' },
   { name: 'twitter:title', content: pageSocialTitle },
   { name: 'twitter:description', content: pageSocialDescription },
  ],
  links: [{ rel: 'canonical', href: url }],
 };
}

export const optometristSchema = {
 '@type': 'Person',
 '@id': absoluteUrl('/about#ashni-penchaliah'),
 name: practice.optometrist.name,
 honorificPrefix: 'Dr.',
 jobTitle: 'Optometrist',
 url: absoluteUrl('/about'),
 worksFor: { '@id': absoluteUrl('/#practice') },
 alumniOf: { '@type': 'CollegeOrUniversity', name: practice.optometrist.university },
 hasCredential: {
  '@type': 'EducationalOccupationalCredential',
  name: practice.optometrist.qualification,
  credentialCategory: 'Bachelor of Optometry',
 },
 description: `Dr. ${practice.optometrist.name}, ${practice.optometrist.qualification}, UKZN, with ${practice.optometrist.yearsPractising} years of practice experience.`,
};
export const practiceSchema = {
 '@context': 'https://schema.org',
 '@type': ['LocalBusiness', 'Optician'],
 '@id': absoluteUrl('/#practice'),
 name: siteName,
 logo: logoUrl,
 image: socialImageUrl,
 alternateName: 'Ashni Optometrists',
 url: siteUrl,
 description: 'Optometry practice at 51 Titren Road, Rossburgh, Durban. Eye examinations, prescription spectacles, lens options and R90 driving licence eye tests.',
 address: {
  '@type': 'PostalAddress',
  streetAddress: '51 Titren Road',
  addressLocality: 'Rossburgh',
  addressRegion: 'KwaZulu-Natal',
  postalCode: '4094',
  addressCountry: 'ZA',
 },
 areaServed: [
  { '@type': 'Place', name: 'Rossburgh, Durban' },
  { '@type': 'City', name: 'Durban' },
 ],
 openingHoursSpecification: [
  { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: practice.hours.weekdays.opens, closes: practice.hours.weekdays.closes },
  { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: practice.hours.saturday.opens, closes: practice.hours.saturday.closes },
 ],
 employee: optometristSchema,
 hasOfferCatalog: {
  '@type': 'OfferCatalog', name: 'Eye care and eyewear services',
  itemListElement: [
   { '@type': 'Offer', name: 'Driving licence eye test', price: practice.licenceOffer.price, priceCurrency: 'ZAR', url: absoluteUrl('/drivers-licence-eye-test'), itemOffered: { '@type': 'Service', name: practice.licenceOffer.title } },
   { '@type': 'OfferCatalog', name: 'Eye care and eyewear', itemListElement: [
    { '@type': 'Service', name: 'Eye examinations', url: absoluteUrl('/eye-care') },
    { '@type': 'Service', name: 'Prescription spectacles', url: absoluteUrl('/shop') },
    { '@type': 'Service', name: 'Tinted and anti-reflective lenses', url: absoluteUrl('/lenses') },
   ] },
  ],
 },
};
export const siteSchema = {
 '@context': 'https://schema.org',
 '@type': 'WebSite',
 '@id': absoluteUrl('/#website'),
 name: siteName,
 url: siteUrl,
 inLanguage: 'en-ZA',
 publisher: { '@id': absoluteUrl('/#practice') },
};
export function breadcrumbSchema(items: Array<{name: string; path: string}>) {
 return {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
   '@type': 'ListItem',
   position: index + 1,
   name: item.name,
   item: absoluteUrl(item.path),
  })),
 };
}
