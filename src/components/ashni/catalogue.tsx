import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Glasses } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { catalogueOptions } from '@/lib/shopify';
import { SectionHeading } from './common';
import { WhatsAppCTA } from './enquiry';

export function Collection({ shop = false }: { shop?: boolean }) {
 const { data } = useSuspenseQuery(catalogueOptions);
 const [category, setCategory] = useState('All Frames');
 const categories = ['All Frames', ...new Set(data.products.map(p => p.productType).filter(Boolean))];
 const filtered = data.products.filter(p => category === 'All Frames' || p.productType === category);
 return <section className="section-space"><div className="site-width">{!shop && <SectionHeading eyebrow="Considered frames. Individual style." title="Find Your Next Favourite Frames"><Button asChild variant="link" className="px-0 text-xs"><Link to="/shop">View the collection<ArrowRight/></Link></Button></SectionHeading>}{shop && categories.length > 1 && <div className="mb-9 flex flex-wrap gap-2" role="group" aria-label="Filter eyewear category">{categories.map(c => <Button key={c} variant={c === category ? 'default' : 'outline'} aria-pressed={c === category} onClick={() => setCategory(c)}>{c}</Button>)}</div>}
 {data.error ? <p role="status" className="border-y py-12 text-center text-muted-foreground">{data.error}</p> : filtered.length === 0 ? <div className="border-y py-14 text-center"><Glasses className="mx-auto mb-4 size-9 text-primary"/><h2 className="text-2xl">No products found</h2><WhatsAppCTA type="frames" variant="link" className="mt-4">Enquire about frames</WhatsAppCTA></div> : <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">{filtered.map(p => <article key={p.id} className="min-w-0"><Link to="/product/$handle" params={{ handle: p.handle }} className="block overflow-hidden rounded-lg border">{p.featuredImage ? <img src={p.featuredImage.url} alt={p.featuredImage.altText || p.title} width={768} height={512} className="product-image" loading="lazy"/> : <div className="flex aspect-[3/2] items-center justify-center bg-secondary"><Glasses className="size-12 text-primary"/></div>}</Link><h3 className="mt-4 text-lg"><Link to="/product/$handle" params={{handle:p.handle}}>{p.title}</Link></h3><p className="mt-2 text-sm text-primary">{new Intl.NumberFormat('en-ZA',{style:'currency',currency:p.priceRange.minVariantPrice.currencyCode}).format(Number(p.priceRange.minVariantPrice.amount))}</p><p className="mt-2 line-clamp-2 text-xs leading-6 text-muted-foreground">{p.description}</p><WhatsAppCTA type="frames" product={p.title} variant="link" className="mt-3 px-0 text-xs">Enquire</WhatsAppCTA></article>)}</div>}
 {shop && <div className="mt-12 border-t pt-8"><h2 className="text-2xl">Find your fit in practice.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">The practice confirms availability, pricing and fitting. Prescription eyewear requires prescription verification and appropriate in-practice fulfilment.</p></div>}</div></section>;
}
