'use client';

import DealsFilter from '@mweb/app/components/deals-filter';
import FiberProductsList from '@mweb/app/components/fiber-products-list';
import Loader from '@mweb/app/components/loader';
import ProductsList from '@mweb/app/components/products-list';
import { useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="md:mx-16 mx-2">
      <FiberProductsList onLoadingCompleted={ () => setIsLoading(false) }/>
      { isLoading && <Loader/> }
      { !isLoading && <div className="my-3">
          <DealsFilter/>
          <ProductsList/>
      </div> }
    </div>
  );
}
