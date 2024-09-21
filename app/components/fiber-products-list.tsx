'use client'

import Loader from '@mweb/app/components/loader';
import useHttp from '@mweb/app/hooks/useHttp';
import { useSelectedProviders } from '@mweb/app/hooks/useSelectedProviders';
import { FiberCampaignsResponse } from '@mweb/app/models/fiber-campaigns.response';
import { FibrePromotionModel } from '@mweb/app/models/fibre-product.model';
import { AppState } from '@mweb/app/models/state/app.state.model';
import { campaignActions } from '@mweb/app/store/campaigns.slice';
import { filterActions, FILTERS } from '@mweb/app/store/filters.slice';
import { promotionActions } from '@mweb/app/store/promotions.slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function FiberProductsList(props: { onLoadingCompleted: VoidFunction }) {
  const dispatch = useDispatch();

  const selectedProviders = useSelectedProviders();
  const filteredProviders = useSelector<AppState, Array<string>>(state => state[FILTERS].providers);

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

  return (
    <>
      <h1 className="font-bold text-center text-3xl">Fiber Products</h1>
      <p className="text-center my-2 opacity-65">
        Select a Fibre infrastructure provider below, browse the products available and complete a coverage search
      </p>
      { (isFetchingFibreCampaigns || isFetchingFibreProducts) && <Loader/> }
      { (!isFetchingFibreCampaigns || !isFetchingFibreProducts) && <div className="grid grid-cols-5 gap-4 mb-12 mt-8">
        { selectedProviders.map(provider => (
          <img src={ provider.providerLogo }
               alt={ provider.providerName }
               key={ provider.providerName }
               onClick={() => dispatch(filterActions.toggleProvider(provider.providerName))}
               className={ `py-4 px-12 w-full hover:bg-gray-200 rounded cursor-pointer ${ filteredProviders.includes(provider.providerName) ? 'bg-gray-300' : '' }` }/>
        )) }
      </div> }
    </>
  );
}