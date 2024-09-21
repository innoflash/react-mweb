import { useSelectedPromotions } from '@mweb/app/hooks/useSelectedPromotions';
import { AppState } from '@mweb/app/models/state/app.state.model';
import { FILTERS } from '@mweb/app/store/filters.slice';
import { useSelector } from 'react-redux';

export function useSelectedProducts() {
  const selectedPromotions = useSelectedPromotions();
  const filteredProviderNames = useSelector<AppState, Array<string>>(state => state[FILTERS].providers);

  return selectedPromotions.filter(promotion => {
    //filter promotions by selected providers.
    if (!filteredProviderNames.length) {
      return true;
    }

    return filteredProviderNames.includes(promotion.provider);
  })
    .map(promotion => promotion.products)
    .flat();
}
