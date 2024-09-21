'use client'

import Loader from '@mweb/app/components/loader';
import useHttp from '@mweb/app/hooks/useHttp';
import { FiberCampaignsResponse } from '@mweb/app/models/fiber-campaigns.response';
import { useEffect } from 'react';

export default function FiberProductsList() {
  //const { data: fibreProducts, isLoading: isFetchingFibreProducts } = useHttp<FiberCampaignsResponse>();
  const { launchRequest: getFibreCampaignsRequest, isLoading: isFetchingFibreCampaigns } = useHttp<FiberCampaignsResponse>({
    onRequestSuccess: (response: FiberCampaignsResponse) => {
      //TODO: Save campaigns in state manager.
      //TODO: Save default selected campaign code.
      console.log(response);
    }
  });

  useEffect(() => {
    const queryParams = new URLSearchParams({
      channels: '120',
      visibility: 'public'
    });

    return getFibreCampaignsRequest(`/campaigns/fibre?${ queryParams.toString() }`);
  }, []);

  return (
    <>
      <h1 className="font-bold text-center text-3xl">Fiber Products</h1>
      <p className="text-center my-2">Select a Fibre infrastructure provider below, browse the products available and
        complete a coverage search</p>
      { isFetchingFibreCampaigns && <Loader/> }
    </>
  );
}