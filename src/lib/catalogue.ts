import everyday from '@/assets/everyday.webp';
import statement from '@/assets/statement.webp';
import sunglasses from '@/assets/sunglasses.webp';
import classic from '@/assets/classic.webp';
export const categories = ['All Frames', 'Everyday Frames', 'Statement Frames', 'Sunglasses', 'Classic Styles'] as const;
export type Category = typeof categories[number];
export interface EyewearProduct {
 id: string; name: string; category: Category; image: string; colour: string; style: string; description: string; status: 'DEMO'; checkoutEligible: false;
}
export const products: EyewearProduct[] = [
 { id: 'demo-01', name: 'The Everyday Round', category: 'Everyday Frames', image: everyday, colour: 'Champagne gold — sample', style: 'Round / fine metal', description: 'A light, understated silhouette for an effortlessly classic look.', status: 'DEMO', checkoutEligible: false },
 { id: 'demo-02', name: 'The Modern Muse', category: 'Statement Frames', image: statement, colour: 'Warm tortoiseshell — sample', style: 'Soft square / acetate-style', description: 'A beautifully expressive shape with warm, characterful details.', status: 'DEMO', checkoutEligible: false },
 { id: 'demo-03', name: 'The Weekend Edit', category: 'Sunglasses', image: sunglasses, colour: 'Black — sample', style: 'Cat-eye / full rim', description: 'A bold, sculptural silhouette for your sun-filled days.', status: 'DEMO', checkoutEligible: false },
 { id: 'demo-04', name: 'The Timeless Classic', category: 'Classic Styles', image: classic, colour: 'Olive brown — sample', style: 'Rectangle / fine rim', description: 'Clean lines and a quiet confidence that never goes out of style.', status: 'DEMO', checkoutEligible: false },
];
