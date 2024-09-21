import { Campaign } from '@mweb/app/models/fiber-campaigns.response';
import { FibrePromotionModel } from '@mweb/app/models/fibre-product.model';
import { AppState } from '@mweb/app/models/state/app.state.model';
import { CAMPAIGNS } from '@mweb/app/store/campaigns.slice';
import { PROMOTIONS } from '@mweb/app/store/promotions.slice';
import { useSelector } from 'react-redux';

export function useSelectedPromotions() {
  const selectedCampaign = useSelector<AppState, Campaign | undefined>(state => state[CAMPAIGNS].selectedCampaign);
  const allPromotions = useSelector<AppState, Array<FibrePromotionModel>>(state => state[PROMOTIONS]);

  if (!selectedCampaign) {
    return [];
  }

  return allPromotions.filter(promotion => selectedCampaign.promocodes.includes(promotion.promoCode));
}
