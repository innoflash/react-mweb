import ProductDetail from '@mweb/app/components/product-detail';
import { useSelectedProducts } from '@mweb/app/hooks/useSelectedProducts';
import { Campaign } from '@mweb/app/models/fiber-campaigns.response';
import { AppState } from '@mweb/app/models/state/app.state.model';
import { CAMPAIGNS } from '@mweb/app/store/campaigns.slice';
import { useSelector } from 'react-redux';

export default function ProductsList() {
  const products = useSelectedProducts();
  const selectedCampaign = useSelector<AppState, Campaign | undefined>(state => state[CAMPAIGNS].selectedCampaign);

  return (
    <div className="my-6 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      { products.map((product, i) => <ProductDetail key={ product.id + i }
                                               product={ product }
                                               campaign={ selectedCampaign?.name }/>) }
    </div>
  );
}