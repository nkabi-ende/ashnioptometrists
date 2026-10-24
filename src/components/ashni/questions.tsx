import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { WhatsAppCTA } from './enquiry';
import { practice } from '@/lib/practice';
const answers = [
 { question: 'How much is a driving licence eye test?', answer: `The driving licence eye test costs R${practice.licenceOffer.price}. Visit Ashni Penchaliah Optometrists at 51 Titren Road, Rossburgh, opposite the licensing centre. WhatsApp the practice to confirm the test arrangements and what to bring.` },
 { question: 'What time do you open?', answer: 'Monday to Friday: 5:00 AM–3:00 PM. Saturday: 6:00 AM–11:00 AM. Please contact the practice to confirm Sunday or public holiday availability.' },
 { question: 'Where is Ashni Penchaliah Optometrists?', answer: '51 Titren Road, Rossburgh, Durban, 4094, South Africa, opposite the licensing centre. Use Get Directions below to open Google Maps.' },
 { question: 'Who will I see at the practice?', answer: 'Ashni Penchaliah holds a B Optom (Cum Laude) from UKZN and has been practising optometry for 21 years.' },
 { question: 'How do I book an eye examination?', answer: 'Send a WhatsApp enquiry to 073 532 6811. The practice confirms the appointment date, time and cost. The R90 offer is for a driving licence eye test; ask separately about a full eye examination.' },
 { question: 'Can I order prescription spectacles online?', answer: 'Browse the eyewear collection and enquire about a frame. The practice confirms availability, pricing, prescription verification, fitting and in-practice fulfilment before your order is finalised.' },
 { question: 'Do you accept my medical aid?', answer: 'Please ask the practice directly about your medical aid and payment options before your visit. Scheme participation and cover have not been confirmed on this website.' },
];
export function VisitorQuestions() {
 return <section className="section-space"><div className="site-width grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow mb-4">Before your visit</p><h2 className="heading">Your questions,<br/>answered.</h2><WhatsAppCTA type="general" variant="link" className="mt-5 px-0 text-xs">Ask us on WhatsApp</WhatsAppCTA></div><Accordion type="single" collapsible className="min-w-0">{answers.map((item,i)=><AccordionItem key={item.question} value={`question-${i}`}><AccordionTrigger className="py-5 text-left text-sm">{item.question}</AccordionTrigger><AccordionContent className="text-sm leading-7 text-muted-foreground">{item.answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>;
}