import { createFileRoute } from '@tanstack/react-router';
import { PageIntro, BookingBand, pageHead } from '@/components/ashni/common';
import { catalogueOptions } from '@/lib/shopify';
import { Collection } from '@/components/ashni/catalogue';
export const Route = createFileRoute('/shop')({ component: Shop, loader: ({ context }) => context.queryClient.ensureQueryData(catalogueOptions), head:()=>pageHead('Eyewear Collection | Ashni Penchaliah Optometrists Rossburgh','Explore the Ashni eyewear collection. Enquire about fitting and frame options in Rossburgh, Durban.', '/shop') });
function Shop() { return <><PageIntro eyebrow="The eyewear edit" title="Find a frame that feels like you." description="Explore eyewear from our practice, then let’s find your fit in person."/><Collection shop/><BookingBand/></>; }
