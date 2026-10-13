import { describe, expect, it } from 'vitest';
import { practice, enquiryMessages, whatsappUrl } from '@/lib/practice';
import { products } from '@/lib/catalogue';
describe('Official contact and demo safeguards',()=>{
 it('does not send enquiries without an official WhatsApp number',()=>{ expect(practice.whatsappNumber).toBe(''); expect(whatsappUrl(enquiryMessages.appointment)).toBeNull(); });
 it('encodes a configured standard WhatsApp enquiry',()=>{ const url=whatsappUrl('Hello, tinted lenses & frames?', '+27 12 345 6789'); expect(url).toBe('https://wa.me/27123456789?text=Hello%2C%20tinted%20lenses%20%26%20frames%3F'); });
 it('uses the supplied practice address and directions destination',()=>{ expect(practice.address).toBe('51 Titren Road, Rossburgh, Durban, 4094, South Africa'); expect(new URL(practice.directionsUrl).searchParams.get('destination')).toBe('51 Titren Road, Rossburgh, Durban, 4094'); });
 it('keeps the catalogue demonstration-only',()=>{ expect(products).toHaveLength(4); expect(products.every(p=>p.status==='DEMO')).toBe(true); });
 it('does not permit checkout on demonstration eyewear',()=>{ expect(products.every(p=>p.checkoutEligible===false)).toBe(true); });
 it('provides five different messages for the required enquiry channels',()=>{ expect(Object.keys(enquiryMessages).sort()).toEqual(['antiglare','appointment','frames','general','tinted']); expect(new Set(Object.values(enquiryMessages)).size).toBe(5); });
});
