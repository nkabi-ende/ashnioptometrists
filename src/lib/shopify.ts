import { queryOptions } from '@tanstack/react-query';

const domain = 'ashnioptometrists-kgoja-ux3ssdqu.myshopify.com';
// Public Storefront token: read-only catalogue access, never an Admin token.
const storefrontToken = '804570c48110c06b8873e408f06f6874';
export interface StoreProduct {
  id: string; handle: string; title: string; description: string; productType: string;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
}
export async function readStoreCatalogue(): Promise<{ products: StoreProduct[]; error: string | null }> {
  try {
    const response = await fetch(`https://${domain}/api/2026-10/graphql.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': storefrontToken },
      body: JSON.stringify({ query: `query { products(first: 100) { nodes { id handle title description productType featuredImage { url altText } priceRange { minVariantPrice { amount currencyCode } } } } }` }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`Store request failed (${response.status})`);
    const result = await response.json() as { data?: { products: { nodes: StoreProduct[] } }; errors?: { message: string }[] };
    if (result.errors?.length) throw new Error(result.errors.map(error => error.message).join('; '));
    if (!result.data) throw new Error('Store returned no catalogue data');
    return { products: result.data.products.nodes, error: null };
  } catch {
    return { products: [], error: 'The collection is temporarily unavailable. Please enquire with the practice.' };
  }
}
export const catalogueOptions = queryOptions({ queryKey: ['shopify-catalogue'], queryFn: readStoreCatalogue, staleTime: 60000 });