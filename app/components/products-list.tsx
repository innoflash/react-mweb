import ProductDetail from '@mweb/app/components/product-detail';
import { useSelectedProducts } from '@mweb/app/hooks/useSelectedProducts';

export default function ProductsList() {
  const products = useSelectedProducts();

  return (
    <div className="my-6 w-full grid grid-cols-2 gap-4">
      { products.map(product => <ProductDetail key={ product.id } product={ product }/>) }
    </div>
  );
}