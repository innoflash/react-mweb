import { useSelectedPromotions } from '@mweb/app/hooks/useSelectedPromotions';

export function useSelectedProviders() {
  const promotions = useSelectedPromotions();

  return promotions.map(promotion => {
    return {
      providerName: promotion.provider,
      providerLogo: promotion.providerLogo
    };
  }).filter((value, index, self) => self.findIndex(v => v.providerName === value.providerName) === index);
}