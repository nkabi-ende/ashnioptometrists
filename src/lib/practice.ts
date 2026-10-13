export const practice = {
  name: 'Ashni Optometrists',
  address: '51 Titren Road, Rossburgh, Durban, 4094, South Africa',
  whatsappNumber: '',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=51%20Titren%20Road%2C%20Rossburgh%2C%20Durban%2C%204094',
};
export const enquiryMessages = {
  appointment: 'Hello Ashni Optometrists, I would like to enquire about booking an eye test.',
  frames: 'Hello Ashni Optometrists, I would like to enquire about spectacle frames.',
  tinted: 'Hello Ashni Optometrists, I would like to find out about tinted lens options.',
  antiglare: 'Hello Ashni Optometrists, I would like to find out about anti-glare lens options.',
  general: 'Hello Ashni Optometrists, I have a general question about the practice.',
};
export type EnquiryType = keyof typeof enquiryMessages;
export function whatsappUrl(message: string, number = practice.whatsappNumber): string | null {
  const digits = number.replace(/[\s+()-]/g, '');
  if (!/^\d{8,15}$/.test(digits)) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
