import { createFileRoute, Link } from '@tanstack/react-router';
import { MapPin, Clock, MessageCircle, ArrowRight, CircleHelp, Eye } from 'lucide-react';
import { WhatsAppCTA } from '@/components/ashni/enquiry';
import { practice } from '@/lib/practice';
import { pageHead, breadcrumbSchema } from '@/lib/seo';

const steps = [
 { title: 'Confirm before travelling', description: 'WhatsApp the practice to confirm current availability, the R90 fee and any documents you may need to bring.' },
 { title: 'Visit our Rossburgh practice', description: 'Find us at 51 Titren Road, Rossburgh, Durban, opposite the licensing centre.' },
 { title: 'Complete your eye test', description: 'Ask the practice how test results are provided and what the licensing centre will accept for your application or renewal.' },
];
export const Route = createFileRoute('/drivers-licence-eye-test')({
 head: () => ({
  ...pageHead(
   'R90 Driving Licence Eye Test in Rossburgh, Durban | Ashni Penchaliah Optometrists',
   'Driving licence eye tests for R90 at Ashni Penchaliah Optometrists, 51 Titren Road, Rossburgh, opposite the licensing centre. Enquire on WhatsApp.',
   '/drivers-licence-eye-test',
  ),
  scripts: [{
   type: 'application/ld+json',
   children: JSON.stringify(breadcrumbSchema([{name:'Home',path:'/'},{name:'Driving Licence Eye Test',path:'/drivers-licence-eye-test'}])),
  }],
 }),
 component: LicenceEyeTest,
});

function LicenceEyeTest() {
 return <>
  <section className="border-b bg-secondary/35 py-12 sm:py-20">
   <div className="site-width">
    <nav aria-label="Breadcrumb" className="mb-7 flex items-center gap-2 text-xs text-muted-foreground">
     <Link to="/" className="underline-offset-4 hover:underline">Home</Link><span aria-hidden="true">/</span><span>Driving licence eye test</span>
    </nav>
    <p className="eyebrow mb-4">Rossburgh, Durban · Opposite the licensing centre</p>
    <div className="grid items-center gap-9 md:grid-cols-[1.3fr_.7fr]">
     <div>
      <h1 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">Driving licence eye tests <span className="text-primary">for R{practice.licenceOffer.price}</span></h1>
      <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">Looking for a driving licence eye test near the Rossburgh licensing centre? Visit Ashni Penchaliah Optometrists at 51 Titren Road in Durban. Contact us to confirm availability and what to bring.</p>
      <div className="mt-8 flex flex-wrap gap-3">
       <WhatsAppCTA type="licence" className="h-12 px-6">Enquire about the R90 eye test</WhatsAppCTA>
       <a href={practice.directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center gap-2 rounded-md border border-primary/30 px-5 text-xs font-medium text-primary hover:bg-card"><MapPin className="size-4"/>Get directions</a>
      </div>
     </div>
     <div className="rounded-2xl border border-primary/20 bg-card p-8 text-center shadow-sm"><Eye className="mx-auto mb-4 size-9 text-primary" aria-hidden="true"/><p className="text-xs uppercase tracking-widest text-muted-foreground">Driving licence eye test</p><p className="mt-3 font-display text-7xl font-semibold text-primary">R90</p><p className="mt-4 text-xs text-muted-foreground">Price for this test only. A full eye examination is a separate service.</p></div>
    </div>
   </div>
  </section>
  <section className="section-space"><div className="site-width"><p className="eyebrow mb-4">Plan your visit</p><h2 className="heading">Three simple steps.</h2><div className="mt-10 grid gap-7 md:grid-cols-3">{steps.map((step,index)=><div key={step.title} className="border-t border-primary/30 pt-5"><span className="text-xs font-semibold text-primary">0{index+1}</span><h3 className="mt-4 text-2xl">{step.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{step.description}</p></div>)}</div></div></section>
  <section className="section-space border-y bg-card"><div className="site-width grid gap-9 md:grid-cols-2">
   <div><MapPin className="mb-4 size-6 text-primary" aria-hidden="true"/><h2 className="text-3xl">Where to find us</h2><address className="mt-4 text-sm not-italic leading-7">{practice.address}</address><a className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline" target="_blank" rel="noopener noreferrer" href={practice.directionsUrl}>Open directions <ArrowRight className="size-4"/></a></div>
   <div><Clock className="mb-4 size-6 text-primary" aria-hidden="true"/><h2 className="text-3xl">Practice hours</h2><p className="mt-4 text-sm leading-7">{practice.hours.weekdays.label}<br/>{practice.hours.saturday.label}</p><p className="mt-3 text-xs text-muted-foreground">Contact the practice to confirm holiday hours and eye-test availability.</p></div>
  </div></section>
  <section className="section-space"><div className="site-width max-w-4xl"><CircleHelp className="mb-4 size-6 text-primary" aria-hidden="true"/><h2 className="heading">Common questions</h2><div className="mt-7 divide-y">
   <div className="py-5"><h3 className="font-semibold">Is the R90 test a complete eye examination?</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">No. This price is for a driving licence eye test. Ask separately about a comprehensive eye examination or prescription assessment.</p></div>
   <div className="py-5"><h3 className="font-semibold">Can I walk in?</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">Contact the practice to confirm walk-in availability and operating hours before travelling.</p></div>
   <div className="py-5"><h3 className="font-semibold">Will the licensing centre accept my result?</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">Requirements can differ by licensing transaction. Confirm the accepted documentation with the relevant licensing centre and ask the practice what is supplied after the test.</p></div>
  </div><WhatsAppCTA type="licence" className="mt-7 h-12"><MessageCircle className="size-4"/>Ask about your eye test</WhatsAppCTA></div></section>
 </>;
}
