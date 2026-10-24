import { createFileRoute } from '@tanstack/react-router';
import { PageIntro, BookingBand, pageHead } from '@/components/ashni/common';
import { catalogueOptions } from '@/lib/shopify';
import { Collection } from '@/components/ashni/catalogue';

export const Route = createFileRoute('/shop')({
  component: Shop,
  loader: ({ context }) => context.queryClient.ensureQueryData(catalogueOptions),
  head: () => pageHead(
    'Shop Eyewear Collections | Ashni Penchaliah Optometrists Rossburgh',
    'Explore the Cooper Flexo, Superlux, Schyler and Clique Premium eyewear collections. The online shop is being prepared; enquire about frames and fitting at our Rossburgh practice.',
    '/shop',
  ),
});

function Shop() {
  return (
    <>
      <PageIntro
        eyebrow="Eyewear at Ashni"
        title="Find a frame that feels like you."
        description="Explore our latest eyewear collections and enquire with our Rossburgh team. Our online shop is being prepared, with product prices and availability confirmed before ordering opens."
      />
      <Collection shop />
      <BookingBand />
    </>
  );
}
