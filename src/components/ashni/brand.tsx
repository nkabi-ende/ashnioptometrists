import { cn } from '@/lib/utils';

// Exact vector artwork exported from the client's approved primary logo PDF.
// Both assets are served locally by Cloudflare; no Lovable-only asset requests.
export function LensMark({ className }: { className?: string }) {
 return <svg viewBox="0 0 64 36" fill="none" className={cn('w-12 text-primary', className)} aria-hidden="true"><g stroke="currentColor" strokeWidth="1.7"><circle cx="18" cy="20" r="13"/><circle cx="46" cy="20" r="13"/><path d="M29 13q3-5 6 0M1 14l4 3m54 0 4-3"/></g></svg>;
}

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
 return <img
  src={compact ? '/ashni-logo-mark.svg' : '/ashni-logo-approved.svg'}
  alt="Ashni Penchaliah Optometrists"
  width={compact ? 464 : 720}
  height={compact ? 178 : 493}
  loading={compact ? 'eager' : 'lazy'}
  decoding="async"
  className={cn('block max-w-full object-contain', compact ? 'h-auto w-[136px] sm:w-[166px]' : 'h-auto w-[238px]', light && 'rounded-sm bg-card')}
 />;
}

export function WhatsAppIcon({ className }: { className?: string }) {
 return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cn('size-4',className)} aria-hidden="true"><path d="M20.7 11.7a8.7 8.7 0 0 1-12.9 7.6L3 20.7l1.3-4.6a8.7 8.7 0 1 1 16.4-4.4Z"/><path d="M8.1 7.4c-.5.5-.7 1.2-.3 2.2 1 2.4 2.8 4.2 5.2 5.2 1 .4 1.7.3 2.2-.3l1-1L9.2 6.5Z"/></svg>;
}
