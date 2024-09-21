import DealsFilter from '@mweb/app/components/deals-filter';
import FiberProductsList from '@mweb/app/components/fiber-products-list';

export default function Home() {
  return (
    <>
      <FiberProductsList/>
      <DealsFilter/>
    </>
  );
}
