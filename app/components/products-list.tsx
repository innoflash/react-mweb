import { useSelectedProducts } from '@mweb/app/hooks/useSelectedProducts';

export default function ProductsList(){
  const products = useSelectedProducts();

  console.log(products);
  return (
    <div className="my-6">Products listed here.</div>
  );
}