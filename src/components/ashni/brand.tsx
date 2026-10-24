import brandAsset from '@/assets/ashni-primary-stacked.jpg.asset.json';
import compactAsset from '@/assets/ashni-logo-compact.webp.asset.json';
import { cn } from '@/lib/utils';
export function LensMark({ className }: { className?: string }) {
 return <svg viewBox="0 0 64 36" fill="none" className={cn('w-12 text-primary', className)} aria-hidden="true"><g stroke="currentColor" strokeWidth="1.7"><circle cx="18" cy="20" r="13"/><circle cx="46" cy="20" r="13"/><path d="M29 13q3-5 6 0M1 14l4 3m54 0 4-3"/></g></svg>;
}
export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
 return <img src={compact ? compactAsset.url : brandAsset.url} alt="Ashni Penchaliah Optometrist — Ashni Optometrists" width={1200} height={733} className={cn('max-w-full object-contain', compact ? 'h-[55px] w-[90px] sm:h-[68px] sm:w-[112px]' : 'w-[200px]', light && 'bg-card')} />;
}
export function WhatsAppIcon({ className }: { className?: string }) {
 return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cn('size-4',className)} aria-hidden="true"><path d="M20.7 11.7a8.7 8.7 0 0 1-12.9 7.6L3 20.7l1.3-4.6a8.7 8.7 0 1 1 16.4-4.4Z"/><path d="M8.1 7.4c-.5.5-.7 1.2-.3 2.2 1 2.4 2.8 4.2 5.2 5.2 1 .4 1.7.3 2.2-.3l1-1-2.4-1.4-1 1c-1.4-.7-2.5-1.8-3.2-3.2l1-1L9.2 6.5Z"/></svg>;
}
