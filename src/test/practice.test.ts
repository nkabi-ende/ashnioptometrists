import { describe, expect, it } from 'vitest';
import { practice, enquiryMessages, whatsappUrl } from '@/lib/practice';
import { products } from '@/lib/catalogue';
describe('Official contact and demo safeguards',()=>{
 it('uses the supplied optometry qualification and university',()=>{ expect(practice.optometrist.qualification).toBe('B Optom (Cum Laude)'); expect(practice.optometrist.universityShort).toBe('UKZN'); });
 it('uses the supplied practising experience',()=>{ expect(practice.optometrist.yearsPractising).toBe(21); });
 it('directs enquiries to the official WhatsApp number',()=>{ expect(whatsappUrl(enquiryMessages.appointment)).toBe('https://wa.me/27735326811?text='+encodeURIComponent(enquiryMessages.appointment)); });
  it('still refuses missing contact numbers',()=>{ expect(whatsappUrl('Hello','')).toBeNull(); });
  it('uses Monday–Friday opening times',()=>{ expect(practice.hours.weekdays.opens).toBe('05:00'); expect(practice.hours.weekdays.closes).toBe('15:00'); });
  it('uses Saturday opening times',()=>{ expect(practice.hours.saturday.opens).toBe('06:00'); expect(practice.hours.saturday.closes).toBe('11:00'); });
  it('keeps the licence eye test offer at R90',()=>{ expect(practice.licenceOffer.price).toBe(90); expect(practice.licenceOffer.currency).toBe('ZAR'); });
 it('encodes a configured standard WhatsApp enquiry',()=>{ const url=whatsappUrl('Hello, tinted lenses & frames?', '+27 12 345 6789'); expect(url).toBe('https://wa.me/27123456789?text=Hello%2C%20tinted%20lenses%20%26%20frames%3F'); });
 it('uses the supplied practice address and directions destination',()=>{ expect(practice.address).toBe('51 Titren Road, Rossburgh, Durban, 4094, South Africa'); expect(new URL(practice.directionsUrl).searchParams.get('destination')).toBe('51 Titren Road, Rossburgh, Durban, 4094'); });
 it('keeps the catalogue demonstration-only',()=>{ expect(products).toHaveLength(4); expect(products.every(p=>p.status==='DEMO')).toBe(true); });
 it('does not permit checkout on demonstration eyewear',()=>{ expect(products.every(p=>p.checkoutEligible===false)).toBe(true); });
 it('provides different messages for the required enquiry channels',()=>{ expect(Object.keys(enquiryMessages).sort()).toEqual(['antiglare','appointment','frames','general','licence','tinted']); expect(new Set(Object.values(enquiryMessages)).size).toBe(6); });
});
