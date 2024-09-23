import { useSelectedPromotions } from '@mweb/app/hooks/useSelectedPromotions';

/**
 * Filters selected providers based off of the selected promotions.
 */
export function useSelectedProviders() {
  const promotions = useSelectedPromotions();

  return promotions.map(promotion => {
    return {
      providerName: promotion.provider,
      providerLogo: promotion.providerLogo
    };
  }).filter((value, index, self) => self.findIndex(v => v.providerName === value.providerName) === index);
}