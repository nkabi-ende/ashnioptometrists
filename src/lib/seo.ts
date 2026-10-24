import { practice } from './practice';
export const siteUrl = 'https://ashnioptometrists.lovable.app';
export function pageHead(title: string, description: string, path = '/') {
 const url = `${siteUrl}${path}`;
 return {
  meta: [{ title }, { name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { property: 'og:url', content: url }, { property: 'og:site_name', content: practice.name }, { name: 'twitter:card', content: 'summary_large_image' }],
  links: [{ rel: 'canonical', href: url }],
 };
}
export const optometristSchema = {
 '@type': 'Person', '@id': `${siteUrl}/about#ashni-penchaliah`, name: practice.optometrist.name,
 jobTitle: 'Optometrist', url: `${siteUrl}/about`,
 alumniOf: { '@type': 'CollegeOrUniversity', name: practice.optometrist.university },
 hasCredential: { '@type': 'EducationalOccupationalCredential', name: practice.optometrist.qualification, credentialCategory: 'Bachelor of Optometry' },
 description: `${practice.optometrist.name}, ${practice.optometrist.qualification}, UKZN, with ${practice.optometrist.yearsPractising} years of practice experience.`,
};
export const practiceSchema = {
 '@context': 'https://schema.org', '@type': 'Optician', '@id': `${siteUrl}/#practice`,
 name: practice.name, url: siteUrl,
 description: 'Optometry practice in Rossburgh, Durban, offering eye examinations, eyewear and R90 driving licence eye tests opposite the licensing centre.',
 address: { '@type': 'PostalAddress', streetAddress: '51 Titren Road', addressLocality: 'Rossburgh, Durban', addressRegion: 'KwaZulu-Natal', postalCode: '4094', addressCountry: 'ZA' },
 openingHoursSpecification: [
  { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: practice.hours.weekdays.opens, closes: practice.hours.weekdays.closes },
  { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: practice.hours.saturday.opens, closes: practice.hours.saturday.closes },
 ],
 employee: optometristSchema,
 hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Driving licence eye test', itemListElement: [{ '@type': 'Offer', price: practice.licenceOffer.price, priceCurrency: 'ZAR', itemOffered: { '@type': 'Service', name: practice.licenceOffer.title } }] },
};