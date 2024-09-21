import { useSelectedPromotions } from '@mweb/app/hooks/useSelectedPromotions';
import { FibrePromotionModel } from '@mweb/app/models/fibre-product.model';
import { AppState } from '@mweb/app/models/state/app.state.model';
import { FILTERS } from '@mweb/app/store/filters.slice';
import { useSelector } from 'react-redux';

export function useSelectedProducts() {
  const selectedPromotions = useSelectedPromotions();
  const filteredProviderNames = useSelector<AppState, Array<string>>(state => state[FILTERS].providers);
  const filterByProviderNamesFn = (promotion: FibrePromotionModel): boolean => {
    if (!filteredProviderNames.length) {
      return true;
    }

    return filteredProviderNames.includes(promotion.provider);
  }

  return selectedPromotions.filter(promotion => {
    return filterByProviderNamesFn(promotion);
  })
    .map(promotion => promotion.products.map(product => {
      return { ...product, providerLogo: product.providerLogo };
    }));
}

