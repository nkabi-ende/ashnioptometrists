import { useState } from 'react';
import { cn } from '@/lib/utils';

// The official image was supplied through Lovable's asset service. Cloudflare
// cannot serve relative /__l5e/assets-v1 paths. Try the original published
// asset, and provide a self-hosted, visible brand fallback if it is unavailable.
const imageSource = {
 primary: 'https://ashnioptometrists.lovable.app/__l5e/assets-v1/1a6c2e19-5df3-4f4c-8d72-5479ebaee7f9/ashni-primary-stacked.jpg',
 compact: 'https://ashnioptometrists.lovable.app/__l5e/assets-v1/03fb10c0-f8bb-4315-88bf-f4390aac4ea6/ashni-logo-compact.webp',
};
export function LensMark({ className }: { className?: string }) {
 return <svg viewBox="0 0 64 36" fill="none" className={cn('w-12 text-primary', className)} aria-hidden="true"><g stroke="currentColor" strokeWidth="1.7"><circle cx="18" cy="20" r="13"/><circle cx="46" cy="20" r="13"/><path d="M29 13q3-5 6 0M1 14l4 3m54 0 4-3"/></g></svg>;
}
export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
 const [failed, setFailed] = useState(false);
 const image = failed ? (compact ? '/ashni-logo-compact.svg' : '/ashni-logo.svg') : (compact ? imageSource.compact : imageSource.primary);
 return <img
   src={image}
   onError={() => { if (!failed) setFailed(true); }}
   alt="Ashni Penchaliah Optometrists"
   width={compact ? 420 : 720}
   height={compact ? 190 : 360}
   decoding="async"
   className={cn('max-w-full object-contain', compact ? 'h-[55px] w-[130px] sm:h-[68px] sm:w-[160px]' : 'h-auto w-[220px]', light && 'rounded-sm bg-card')}
 />;
}
export function WhatsAppIcon({ className }: { className?: string }) {
 return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cn('size-4',className)} aria-hidden="true"><path d="M20.7 11.7a8.7 8.7 0 0 1-12.9 7.6L3 20.7l1.3-4.6a8.7 8.7 0 1 1 16.4-4.4Z"/><path d="M8.1 7.4c-.5.5-.7 1.2-.3 2.2 1 2.4 2.8 4.2 5.2 5.2 1 .4 1.7.3 2.2-.3l1-1-2.4-1.4-1 1c-1.4-.7-2.5-1.8-3.2-3.2l1-1L9.2 6.5Z"/></svg>;
}
