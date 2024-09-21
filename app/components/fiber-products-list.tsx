'use client'

import Loader from '@mweb/app/components/loader';
import useHttp from '@mweb/app/hooks/useHttp';
import { FiberProductsResponse } from '@mweb/app/models/fiber-products.response';
import { useEffect } from 'react';

export default function FiberProductsList() {
  const { launchRequest, isLoading } = useHttp<FiberProductsResponse>({
    onRequestSuccess: (response: FiberProductsResponse) => {
      console.log(response);
    }
  });

  useEffect(() => {
    const queryParams = new URLSearchParams({
      channels: '120',
      visibility: 'public'
    });

    return launchRequest(`/campaigns/fibre?${ queryParams.toString() }`);
  }, []);

  return (
    <>
      <h1 className="font-bold text-center text-3xl">Fiber Products</h1>
      <p className="text-center my-2">Select a Fibre infrastructure provider below, browse the products available and
        complete a coverage search</p>
      { isLoading && <Loader/> }
    </>
  );
}