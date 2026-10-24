import { queryOptions } from '@tanstack/react-query';

const domain = 'ashnioptometrists-kgoja-ux3ssdqu.myshopify.com';
// Public Storefront token: read-only catalogue access, never an Admin token.
const storefrontToken = '804570c48110c06b8873e408f06f6874';

export interface StoreProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  vendor: string;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
}

interface StorefrontResponse {
  data?: {
    products: {
      nodes: StoreProduct[];
      pageInfo: { hasNextPage: boolean; endCursor: string | null };
    };
  };
  errors?: { message: string }[];
}

// Shopify only returns products published to the Storefront sales channel.
// Drafts remain private in Shopify Admin and are never shown by this reader.
export async function readStoreCatalogue(): Promise<{ products: StoreProduct[]; error: string | null }> {
  try {
    const products: StoreProduct[] = [];
    let cursor: string | null = null;

    // The catalogue exceeds 100 products; read all pages once products are published.
    for (let page = 0; page < 10; page += 1) {
      const response = await fetch(`https://${domain}/api/2026-10/graphql.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': storefrontToken,
        },
        body: JSON.stringify({
          query: `query AshniPublishedCatalogue($cursor: String) {
            products(first: 100, after: $cursor) {
              nodes {
                id handle title description productType vendor
                featuredImage { url altText }
                priceRange { minVariantPrice { amount currencyCode } }
              }
              pageInfo { hasNextPage endCursor }
            }
          }`,
          variables: { cursor },
        }),
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) throw new Error(`Store request failed (${response.status})`);

      const result = (await response.json()) as StorefrontResponse;
      if (result.errors?.length) throw new Error(result.errors.map(e => e.message).join('; '));
      if (!result.data) throw new Error('Shopify returned no catalogue data');

      products.push(...result.data.products.nodes);
      const next = result.data.products.pageInfo;
      if (!next.hasNextPage || !next.endCursor) {
        return { products, error: null };
      }
      cursor = next.endCursor;
    }

    return { products, error: 'Some items are temporarily unavailable. Please enquire with the practice.' };
  } catch {
    return { products: [], error: 'Live catalogue availability cannot be checked right now. Please enquire with the practice.' };
  }
}

export const catalogueOptions = queryOptions({
  queryKey: ['shopify-catalogue-v2'],
  queryFn: readStoreCatalogue,
  staleTime: 60000,
});
