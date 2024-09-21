import { useSelectedPromotions } from '@mweb/app/hooks/useSelectedPromotions';
import { AppState } from '@mweb/app/models/state/app.state.model';
import { FilterStateModel } from '@mweb/app/models/state/filter.state.model';
import { FILTERS } from '@mweb/app/store/filters.slice';
import { useSelector } from 'react-redux';

export function useSelectedProducts() {
  const selectedPromotions = useSelectedPromotions();
  const filters = useSelector<AppState, FilterStateModel>(state => state[FILTERS]);

  return selectedPromotions.filter(promotion => {
    //filter promotions by selected providers.
    if (!filters.providers.length) {
      return true;
    }

    return filters.providers.includes(promotion.provider);
  })
    .map(promotion => promotion.products)
    .flat()
    .filter(product => {
      if (!filters.price) {
        return true;
      }

      return product.productRate <= filters.price.max && product.productRate >= filters.price.min;
    });
}
