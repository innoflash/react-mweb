'use client'

import Loader from '@mweb/app/components/loader';
import useHttp from '@mweb/app/hooks/useHttp';
import { useSelectedPromotions } from '@mweb/app/hooks/useSelectedPromotions';
import { FiberCampaignsResponse } from '@mweb/app/models/fiber-campaigns.response';
import { FibrePromotionModel } from '@mweb/app/models/fibre-product.model';
import { campaignActions } from '@mweb/app/store/campaigns.slice';
import { promotionActions } from '@mweb/app/store/promotions.slice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function FiberProductsList(props: { onLoadingCompleted: VoidFunction }) {
  const dispatch = useDispatch();
  const promotions = useSelectedPromotions();
  const {
    launchRequest: getFibrePromotionsRequest,
    isLoading: isFetchingFibreProducts
  } = useHttp<Array<Array<FibrePromotionModel>>>({
    onRequestSuccess: (response) => {
      //save promos in state manager.
      dispatch(
        promotionActions.setPromotions(
          response.flat().map(promotion => {
            //TODO: Keep the image base path in an env file.
            //Set provider logos for the promotions.
            promotion.providerLogo = `https://www.mweb.co.za/media/images/providers/provider-${ promotion.provider.toLowerCase().replace(' ', '-') }.png`;

            return promotion;
          })
        )
      );
    },
    onRequestComplete: () => props.onLoadingCompleted()
  });

  const {
    launchRequest: getFibreCampaignsRequest,
    isLoading: isFetchingFibreCampaigns
  } = useHttp<FiberCampaignsResponse>({
    onRequestSuccess: (response: FiberCampaignsResponse) => {
      //Save campaigns in state manager.
      dispatch(campaignActions.setCampaigns(response.campaigns));

      //Save default selected campaign code.
      const selectedCampaign = response.campaigns.find(campaign => campaign.isDefaultCampaign);
      dispatch(campaignActions.setSelectedCampaign(selectedCampaign));

      //Fetch promotions based off of the found campaigns.
      const productsUrls = response.campaigns.map(campaign => {
        const queryParams = new URLSearchParams({ sellable_online: 'true' });

        return `/products/promos/${ campaign.promocodes.join(',') }?${ queryParams.toString() }`;
      });

      return getFibrePromotionsRequest(productsUrls);
    }
  });

  useEffect(() => {
    const queryParams = new URLSearchParams({
      channels: '120',
      visibility: 'public'
    });

    return getFibreCampaignsRequest(`/campaigns/fibre?${ queryParams.toString() }`);
  }, []);

  console.log({ promotions });

  return (
    <>
      <h1 className="font-bold text-center text-3xl">Fiber Products</h1>
      <p className="text-center my-2">
        Select a Fibre infrastructure provider below, browse the products available and complete a coverage search
      </p>
      { (isFetchingFibreCampaigns || isFetchingFibreProducts) && <Loader/> }
      { (!isFetchingFibreCampaigns || !isFetchingFibreProducts) && <div>
          This is gonna be listed.
      </div> }
    </>
  );
}