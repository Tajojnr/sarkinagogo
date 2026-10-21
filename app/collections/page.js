import ProductGrid from '@/components/ProductGrid';

export const metadata = {
  title: 'Full Collection — Sarkin Agogo Watches',
  description: 'Explore the complete catalog of luxury timepieces, presidential watches, and diamond commissions.',
};

export default function CollectionsPage() {
  return (
    <main className="bg-obsidian min-h-screen pt-28">
      <ProductGrid title="The Royal Catalog" />
    </main>
  );
}