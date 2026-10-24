export const practice = {
  name: 'Ashni Penchaliah Optometrists',
  optometrist: { name: 'Ashni Penchaliah', qualification: 'B Optom (Cum Laude)', university: 'University of KwaZulu-Natal', universityShort: 'UKZN', yearsPractising: 21 },
  address: '51 Titren Road, Rossburgh, Durban, 4094, South Africa',
  whatsappNumber: '27735326811',
  whatsappDisplay: '073 532 6811',
  hours: { weekdays: { opens: '05:00', closes: '15:00', label: 'Monday–Friday · 5:00 AM–3:00 PM' }, saturday: { opens: '06:00', closes: '11:00', label: 'Saturday · 6:00 AM–11:00 AM' } },
  licenceOffer: { price: 90, currency: 'ZAR', title: 'Driving licence eye test', location: 'Opposite the licensing centre' },
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=51%20Titren%20Road%2C%20Rossburgh%2C%20Durban%2C%204094',
};
export const enquiryMessages = {
  appointment: 'Hello Ashni Penchaliah Optometrists, I would like to enquire about booking an eye test.',
  frames: 'Hello Ashni Penchaliah Optometrists, I would like to enquire about spectacle frames.',
  tinted: 'Hello Ashni Penchaliah Optometrists, I would like to find out about tinted lens options.',
  antiglare: 'Hello Ashni Penchaliah Optometrists, I would like to find out about anti-glare lens options.',
  licence: 'Hello Ashni Penchaliah Optometrists, I would like to enquire about the R90 driving licence eye test.',
  general: 'Hello Ashni Penchaliah Optometrists, I have a general question about the practice.',
};
export type EnquiryType = keyof typeof enquiryMessages;
export function whatsappUrl(message: string, number = practice.whatsappNumber): string | null {
  const digits = number.replace(/[\s+()-]/g, '');
  if (!/^\d{8,15}$/.test(digits)) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
