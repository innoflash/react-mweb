'use client'

import Loader from '@mweb/app/components/loader';
import useHttp from '@mweb/app/hooks/useHttp';
import { FiberCampaignsResponse } from '@mweb/app/models/fiber-campaigns.response';
import { FibrePromotionModel } from '@mweb/app/models/fibre-product.model';
import { useEffect } from 'react';

export default function FiberProductsList() {
  const {
    launchRequest: getFibreProductsRequest,
    isLoading: isFetchingFibreProducts
  } = useHttp<Array<FibrePromotionModel>>({
    onRequestSuccess: (response) => {
      //TODO: save promos in state manager.
      console.log(response);
    }
  });

  const {
    launchRequest: getFibreCampaignsRequest,
    isLoading: isFetchingFibreCampaigns
  } = useHttp<FiberCampaignsResponse>({
    onRequestSuccess: (response: FiberCampaignsResponse) => {
      //TODO: Save campaigns in state manager.
      //TODO: Save default selected campaign code.

      const productsUrls = response.campaigns.map(campaign => {
        const queryParams = new URLSearchParams({ sellable_online: 'true' });

        return `/products/promos/${ campaign.promocodes.join(',') }?${ queryParams.toString() }`;
      });

      return getFibreProductsRequest(productsUrls);
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
      <p className="text-center my-2">
        Select a Fibre infrastructure provider below, browse the products available and complete a coverage search
      </p>
      { (isFetchingFibreCampaigns || isFetchingFibreProducts) && <Loader/> }
    </>
  );
}