import { createFileRoute } from '@tanstack/react-router';
import { PageIntro, Location, pageHead } from '@/components/ashni/common';
import { Practitioner } from '@/components/ashni/practitioner';
import { optometristSchema } from '@/lib/seo';
export const Route = createFileRoute('/about')({ component: About, head:()=>({ ...pageHead('Ashni Penchaliah | B Optom Cum Laude, UKZN | Durban', 'Meet Ashni Penchaliah, B Optom (Cum Laude), UKZN, with 21 years of optometry practice. Personal eye care at 51 Titren Road, Rossburgh, Durban.', '/about'), scripts: [{ type: 'application/ld+json', children: JSON.stringify({ '@context': 'https://schema.org', ...optometristSchema }) }] }) });
function About() { return <><PageIntro eyebrow="Experience. Care. Individual style." title="A personal approach to eyecare." description="Eye care close to home, guided by 21 years of optometry experience. Meet Ashni Penchaliah at our practice in Rossburgh, Durban."/><Practitioner full/><Location/></>; }
