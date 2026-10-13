import { createFileRoute } from '@tanstack/react-router';
import { PageIntro, BookingBand, pageHead } from '@/components/ashni/common';
import { Collection } from '@/components/ashni/catalogue';
export const Route = createFileRoute('/shop')({ component: Shop, head:()=>pageHead('Eyewear Collection | Ashni Optometrists Rossburgh','Browse a sample edit of everyday frames, statement eyewear, sunglasses and classic styles. Enquire about fitting and frame options in Rossburgh, Durban.') });
function Shop() { return <><PageIntro eyebrow="The eyewear edit" title="Find a frame that feels like you." description="Quiet classics. A little personality. Something for the sunshine. Explore a considered sample collection, then let’s find your fit in practice."/><Collection shop/><BookingBand/></>; }
