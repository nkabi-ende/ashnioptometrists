import { createContext, useContext, useState, type ReactNode } from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { enquiryMessages, whatsappUrl, type EnquiryType } from '@/lib/practice';
import { WhatsAppIcon } from './brand';
import { Check, Copy } from 'lucide-react';
const EnquiryContext = createContext<(type: EnquiryType, product?: string) => void>(() => {});
export function EnquiryProvider({ children }: { children: ReactNode }) {
 const [message, setMessage] = useState<string | null>(null);
 const [copied, setCopied] = useState(false);
 function enquire(type: EnquiryType, product?: string) {
  const text = product ? `${enquiryMessages[type]} I'm interested in ${product} from your sample collection. Please let me know about available frame options and an in-practice fitting.` : enquiryMessages[type];
  const url = whatsappUrl(text);
  if (url) { window.open(url,'_blank','noopener,noreferrer'); return; }
  setCopied(false); setMessage(text);
 }
 return <EnquiryContext.Provider value={enquire}>{children}<Dialog open={message !== null} onOpenChange={open => { if (!open) setMessage(null); }}><DialogContent className="max-w-md w-[calc(100%-32px)] rounded-lg p-7"><span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary"><WhatsAppIcon className="size-6"/></span><p className="eyebrow">Enquiry preview</p><DialogTitle className="font-display text-3xl">Let’s start a conversation.</DialogTitle><DialogDescription className="leading-relaxed">The practice’s official WhatsApp number is awaiting confirmation. This preview has not sent a message or booked an appointment.</DialogDescription><div className="rounded-md bg-secondary/60 p-4 text-sm leading-relaxed">{message}</div><Button className="h-11" onClick={async () => { if (!message) return; try { await navigator.clipboard.writeText(message); setCopied(true); } catch { setCopied(false); } }}>{copied ? <Check/> : <Copy/>}{copied ? 'Message copied' : 'Copy enquiry message'}</Button><p className="text-xs text-muted-foreground">Please do not share medical history or prescription details here.</p></DialogContent></Dialog></EnquiryContext.Provider>;
}
export function WhatsAppCTA({ type='appointment', product, children='Book an Eye Test', className, ...props }: Omit<ButtonProps, 'type'> & { type?: EnquiryType; product?: string }) {
 const enquire = useContext(EnquiryContext);
 return <Button {...props} className={className} onClick={() => enquire(type,product)}><WhatsAppIcon/>{children}</Button>;
}
