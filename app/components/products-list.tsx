import { useSelectedProducts } from '@mweb/app/hooks/useSelectedProducts';

export default function ProductsList(){
  const products = useSelectedProducts();

  console.log(products[0]);
  return (
    <div className="my-6">Products listed here.</div>
  );
}