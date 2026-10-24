import { createFileRoute, Link } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { catalogueOptions } from '@/lib/shopify';
import { pageHead } from '@/components/ashni/common';
import { WhatsAppCTA } from '@/components/ashni/enquiry';

export const Route = createFileRoute('/product/$handle')({
  loader: ({ context }) => context.queryClient.ensureQueryData(catalogueOptions),
  head: ({ params, loaderData }) => {
    const product = loaderData?.products.find(p => p.handle === params.handle);
    const originalImage = product?.featuredImage?.url;
    const image = originalImage ? `${originalImage}${originalImage.includes('?') ? '&' : '?'}width=1200&height=630&crop=center` : undefined;
    const head = pageHead(`${product?.title || 'Eyewear'} | Ashni Penchaliah Optometrists`, product?.description || 'Enquire about eyewear and in-practice fitting at Ashni Penchaliah Optometrists in Durban.', `/product/${encodeURIComponent(params.handle)}`);
    return { ...head, meta: [...head.meta, ...(!product ? [{ name: 'robots', content: 'noindex, follow' }] : []), ...(image?.startsWith('https://') ? [{ property: 'og:image', content: image }, { name: 'twitter:image', content: image }] : [])] };
  },
  component: Product,
});
function Product() {
  const { handle } = Route.useParams();
  const { data } = useSuspenseQuery(catalogueOptions);
  const product = data.products.find(p => p.handle === handle);
  if (!product) return <section className="site-width section-space"><h1 className="heading">Product unavailable</h1><p className="mt-4 text-muted-foreground">{data.error || 'This frame is not currently listed.'}</p><Link to="/shop" className="mt-6 inline-block text-primary">Back to eyewear</Link></section>;
  return <section className="site-width section-space"><Link to="/shop" className="text-xs text-primary">← Back to eyewear</Link><div className="mt-8 grid items-start gap-10 md:grid-cols-2">{product.featuredImage && <img src={product.featuredImage.url} alt={product.featuredImage.altText || product.title} className="aspect-[3/2] w-full object-contain"/>}<div><h1 className="heading">{product.title}</h1><p className="mt-5 text-xl text-primary">{new Intl.NumberFormat('en-ZA', { style: 'currency', currency: product.priceRange.minVariantPrice.currencyCode }).format(Number(product.priceRange.minVariantPrice.amount))}</p><p className="mt-5 text-sm leading-7 text-muted-foreground">{product.description}</p><WhatsAppCTA type="frames" product={product.title} className="mt-7">Enquire on WhatsApp</WhatsAppCTA><p className="mt-5 text-xs leading-6 text-muted-foreground">Availability confirmed by the practice. Prescription verification, fitting and fulfilment take place in practice.</p></div></div></section>;
}