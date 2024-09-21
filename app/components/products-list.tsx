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
    <>
      <div className="my-6 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        { products.map((product, i) => <ProductDetail key={ product.id + i }
                                                      product={ product }
                                                      campaign={ selectedCampaign?.name }/>) }
      </div>
      { !products.length && <div
          className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
          role="alert">
          <span className="font-medium">No products found for your filter </span> for this { selectedCampaign?.name }.
      </div> }
    </>
  );
}