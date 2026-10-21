import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import HeritageBanner from '@/components/HeritageBanner';
import ShowroomBooking from '@/components/ShowroomBooking';

export default function Home() {
  return (
    <main className="bg-obsidian min-h-screen">
      <Hero />
      <ProductGrid limit={6} title="Featured Timepieces" />
      <HeritageBanner />
      <ShowroomBooking />
    </main>
  );
}