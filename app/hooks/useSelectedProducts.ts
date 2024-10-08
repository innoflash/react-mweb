import { useSelectedPromotions } from '@mweb/app/hooks/useSelectedPromotions';
import { FibreProductModel } from '@mweb/app/models/fibre-product.model';
import { AppState } from '@mweb/app/models/state/app.state.model';
import { FilterStateModel } from '@mweb/app/models/state/filter.state.model';
import { FILTERS } from '@mweb/app/store/filters.slice';
import { useSelector } from 'react-redux';

/**
 * Filter through products and promotions and return an array of products.
 *
 * The products are filtered based on selected campaign, providers and price.
 */
export function useSelectedProducts(): Array<FibreProductModel> {
  const filters = useSelector<AppState, FilterStateModel>(state => state[FILTERS]);
  const selectedPromotions = useSelectedPromotions();

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
      //Filter products by price.
      if (!filters.price) {
        return true;
      }

      return product.productRate <= filters.price.max && product.productRate >= filters.price.min;
    });
}
