import { BookTable, ClientReview, Hero, PopularMenu } from '@/components/Home';

export default function Home() {
  return (
    <>
      <Hero />
      <PopularMenu />
      <ClientReview />
      <BookTable />
    </>
  );
}
