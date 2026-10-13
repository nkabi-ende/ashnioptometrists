import { Link } from '@tanstack/react-router';
import { ArrowRight, ArrowUpRight, Eye, Glasses, Sun, Sparkles, MapPin, Clock, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppCTA } from './enquiry';
import { practice } from '@/lib/practice';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
export function SectionHeading({ eyebrow, title, description, children, className }: {eyebrow:string;title:string;description?:string;children?:ReactNode;className?:string}) {
 return <div className={cn('mb-9 flex flex-wrap items-end justify-between gap-5',className)}><div><p className="eyebrow mb-3">{eyebrow}</p><h2 className="heading">{title}</h2>{description&&<p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">{description}</p>}</div>{children}</div>;
}
export const services = [
 { icon:Eye, title:'Eye Examinations', description:'Make time for your eyes. Enquire about an eye examination at our Rossburgh practice.', to:'/eye-care' },
 { icon:Glasses, title:'Prescription Spectacles', description:'Explore frames and discuss prescription lens options suited to your everyday needs.', to:'/eye-care' },
 { icon:Sun, title:'Sunglasses & Tinted Lenses', description:'Bring a little style to sunny days with sunglasses and tinted lens options.', to:'/lenses' },
 { icon:Sparkles, title:'Anti-Glare Lens Options', description:'Discover anti-reflective lens options and find out what may suit your lenses.', to:'/lenses' },
] as const;
export function Services({ full=false }: { full?:boolean }) {
 return <section className="section-space bg-card"><div className="site-width"><SectionHeading eyebrow="A clear focus on you" title="Care for Your Eyes. Style for Your Everyday." description={full?'Eye care starts with a conversation. Explore our services and contact the practice to discuss your appointment.':undefined}>{!full&&<Button asChild variant="link" className="px-0 text-xs"><Link to="/eye-care">Explore eye care<ArrowRight/></Link></Button>}</SectionHeading><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{services.map(s=><Link key={s.title} to={s.to} className="group rounded-lg border bg-background/50 p-6 transition-colors hover:border-primary/40"><s.icon strokeWidth={1.3} className="mb-7 size-8 text-primary"/><h3 className="text-[25px] leading-7">{s.title}</h3><p className="mt-3 text-xs leading-6 text-muted-foreground">{s.description}</p><span className="mt-6 flex items-center gap-2 text-[11px] font-medium text-primary">Find out more<ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-1"/></span></Link>)}</div></div></section>;
}
export function PageIntro({ eyebrow,title,description,children }: {eyebrow:string;title:string;description:string;children?:ReactNode}) {
 return <section className="border-b bg-secondary/30 py-16 sm:py-20"><div className="site-width"><p className="eyebrow mb-4">{eyebrow}</p><h1 className="max-w-3xl font-display text-5xl leading-[1.08] sm:text-6xl">{title}</h1><p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">{description}</p>{children}</div></section>;
}
export function Location({ contact=false }: {contact?:boolean}) {
 return <section className={cn('section-space',!contact&&'bg-card')}><div className="site-width grid items-center gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow mb-4">Your local eye care destination</p><h2 className="heading">Visit Ashni Optometrists</h2><div className="my-7 flex gap-3"><MapPin className="mt-1 size-5 text-primary"/><address className="text-sm not-italic leading-7">51 Titren Road<br/>Rossburgh, Durban, 4094<br/>South Africa</address></div><p className="mb-7 flex items-center gap-2 text-xs text-muted-foreground"><Clock className="size-4"/>Hours to be confirmed</p><div className="flex flex-wrap gap-3"><Button asChild className="h-11 text-xs"><a href={practice.directionsUrl} target="_blank" rel="noreferrer"><Navigation/>Get Directions</a></Button><WhatsAppCTA type="general" variant="outline" className="h-11 text-xs">Ask a Question</WhatsAppCTA></div></div><div className="overflow-hidden rounded-lg border bg-muted"><iframe title="Map showing the address at 51 Titren Road, Rossburgh, Durban" src="https://maps.google.com/maps?q=51%20Titren%20Road%2C%20Rossburgh%2C%20Durban%2C%204094&z=15&output=embed" className="h-[320px] w-full border-0 sm:h-[360px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/><div className="flex items-center justify-between gap-3 bg-card px-4 py-3 text-[10px] text-muted-foreground"><span>Address map · Official business listing awaiting confirmation</span><a href={practice.directionsUrl} aria-label="Open directions in Google Maps" target="_blank" rel="noreferrer"><ArrowUpRight className="size-4 text-primary"/></a></div></div></div></section>;
}
export function BookingBand() {
 return <section className="bg-primary py-14 text-primary-foreground"><div className="site-width flex flex-wrap items-center justify-between gap-6"><div><h2 className="text-4xl">A little care. A fresh perspective.</h2><p className="mt-3 text-sm text-primary-foreground/75">Let’s talk about your eyes, your frames and your everyday.</p></div><WhatsAppCTA variant="secondary" className="h-12 px-6"/></div></section>;
}
export function pageHead(title:string,description:string) {
 return { meta:[{title},{name:'description',content:description},{property:'og:title',content:title},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] };
}
