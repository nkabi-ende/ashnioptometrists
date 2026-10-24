import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Glasses } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { catalogueOptions } from '@/lib/shopify';
import { SectionHeading } from './common';
import { WhatsAppCTA } from './enquiry';

// Original product photographs uploaded from the client's supplier catalogues.
// These are editorial previews, NOT live Shopify products or confirmed in-store stock.
const frameCollections = [
  {
    name: 'Cooper Flexo',
    image: 'https://cdn.shopify.com/s/files/1/0863/9037/4642/files/ashni-CP101-catalogue.jpg?v=1792850995',
    alt: 'Cooper Flexo CP101 eyewear from the supplied 2026 frame catalogue',
    description: 'Comfortable everyday frame styles, with distinctive colour options.',
  },
  {
    name: 'Superlux',
    image: 'https://cdn.shopify.com/s/files/1/0863/9037/4642/files/ashni-superlux-SP1051-catalogue.jpg?v=1792850605',
    alt: 'Superlux SP1051 eyewear from the supplied 2026 frame catalogue',
    description: 'Contemporary shapes and expressive finishes for personal style.',
  },
  {
    name: 'Schyler',
    image: 'https://cdn.shopify.com/s/files/1/0863/9037/4642/files/ashni-svf606-catalogue.jpg?v=1792852717',
    alt: 'Schyler SVF606 eyewear from the supplied 2026 frame catalogue',
    description: 'Explore metal and plastic eyewear from the Schyler range.',
  },
  {
    name: 'Clique Premium',
    image: 'https://cdn.shopify.com/s/files/1/0863/9037/4642/files/ashni-CL358-2026.jpg?v=1792853626',
    alt: 'Clique Premium CL358 eyewear from the supplied 2026 frame catalogue',
    description: 'An elegant edit of premium frames with personality.',
  },
] as const;

function ComingSoonCollections({ shop }: { shop: boolean }) {
  return (
    <div>
      <div className="mb-8 max-w-2xl">
        <span className="mb-3 inline-flex rounded-full border border-primary/20 bg-secondary/50 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-primary">
          Online shop opening soon
        </span>
        <h2 className="text-3xl leading-tight sm:text-4xl">Four collections. Find your perfect fit.</h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          We're preparing our online frame catalogue. Take a look at the ranges below and ask our team
          about available models, colours, pricing and fitting in Rossburgh.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {frameCollections.map(collection => (
          <article key={collection.name} className="overflow-hidden rounded-lg border bg-card">
            <div className="aspect-[4/3] overflow-hidden bg-secondary/40">
              <img
                src={collection.image}
                alt={collection.alt}
                width={768}
                height={576}
                loading="lazy"
                className="size-full object-contain"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl">{collection.name}</h3>
              <p className="mt-2 min-h-16 text-xs leading-6 text-muted-foreground">{collection.description}</p>
              <WhatsAppCTA type="frames" product={collection.name} variant="outline" className="mt-4 h-10 w-full text-xs">
                Enquire about frames
              </WhatsAppCTA>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-5 text-xs leading-6 text-muted-foreground">
        Supplier catalogue imagery for browsing inspiration only. Prices and physical availability
        are not yet confirmed. No online frame orders are being taken through this page.
      </p>
      {shop && (
        <div className="mt-10 rounded-lg bg-secondary/30 p-6 sm:p-8">
          <p className="eyebrow">Need a particular frame?</p>
          <h3 className="mt-2 text-2xl">Ask us about your preferred style.</h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            Our optometry team can help you check colour options and arrange an appropriate in-practice fitting.
            Prescription lenses and the driving-licence eye test are separate from frame-only enquiries.
          </p>
          <WhatsAppCTA type="frames" className="mt-5 h-11">Ask about eyewear</WhatsAppCTA>
        </div>
      )}
    </div>
  );
}

export function Collection({ shop = false }: { shop?: boolean }) {
  const { data } = useSuspenseQuery(catalogueOptions);
  const [category, setCategory] = useState('All Frames');
  // Only published optical frames belong here; do not include lens services or eye tests.
  const frames = data.products.filter(p => p.productType.toLowerCase().includes('frame'));
  const categories = ['All Frames', ...new Set(frames.map(p => p.vendor).filter(Boolean))];
  const filtered = frames.filter(p => category === 'All Frames' || p.vendor === category);

  return (
    <section className="section-space">
      <div className="site-width">
        {!shop && (
          <SectionHeading eyebrow="Considered frames. Individual style." title="Find Your Next Favourite Frames">
            <Button asChild variant="link" className="px-0 text-xs">
              <Link to="/shop">Explore the collections <ArrowRight /></Link>
            </Button>
          </SectionHeading>
        )}

        {frames.length === 0 ? (
          <>
            {data.error && <p role="status" className="mb-5 text-xs text-muted-foreground">{data.error}</p>}
            <ComingSoonCollections shop={shop} />
          </>
        ) : (
          <>
            {shop && categories.length > 1 && (
              <div className="mb-9 flex flex-wrap gap-2" role="group" aria-label="Filter frames by brand">
                {categories.map(name => (
                  <Button
                    key={name}
                    variant={name === category ? 'default' : 'outline'}
                    aria-pressed={name === category}
                    onClick={() => setCategory(name)}
                  >
                    {name}
                  </Button>
                ))}
              </div>
            )}
            {filtered.length === 0 ? (
              <div className="border-y py-14 text-center">
                <Glasses className="mx-auto mb-4 size-9 text-primary" />
                <h2 className="text-2xl">No frames found in this range</h2>
                <WhatsAppCTA type="frames" variant="link" className="mt-4">Enquire about frames</WhatsAppCTA>
              </div>
            ) : (
              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
                {filtered.map(p => (
                  <article key={p.id} className="min-w-0">
                    <Link to="/product/$handle" params={{ handle: p.handle }} className="block overflow-hidden rounded-lg border">
                      {p.featuredImage ? (
                        <img
                          src={p.featuredImage.url}
                          alt={p.featuredImage.altText || p.title}
                          width={768}
                          height={512}
                          className="product-image"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex aspect-[3/2] items-center justify-center bg-secondary">
                          <Glasses className="size-12 text-primary" />
                        </div>
                      )}
                    </Link>
                    <h3 className="mt-4 text-lg"><Link to="/product/$handle" params={{ handle: p.handle }}>{p.title}</Link></h3>
                    <p className="mt-2 text-sm text-primary">
                      {new Intl.NumberFormat('en-ZA', {
                        style: 'currency',
                        currency: p.priceRange.minVariantPrice.currencyCode,
                      }).format(Number(p.priceRange.minVariantPrice.amount))}
                    </p>
                    <p className="mt-2 line-clamp-2 text-xs leading-6 text-muted-foreground">{p.description}</p>
                    <WhatsAppCTA type="frames" product={p.title} variant="link" className="mt-3 px-0 text-xs">
                      Enquire
                    </WhatsAppCTA>
                  </article>
                ))}
              </div>
            )}
          </>
        )}

        {shop && frames.length > 0 && (
          <div className="mt-12 border-t pt-8">
            <h2 className="text-2xl">Find your fit in practice.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
              The practice confirms availability, pricing and fitting. Prescription eyewear
              requires verification and appropriate in-practice fulfilment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
