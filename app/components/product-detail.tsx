import { FibreProductModel } from '@mweb/app/models/fibre-product.model';

export default function ProductDetail({ product }: { product: FibreProductModel }) {
  console.log(product);
  return (
    <div className="w-full border-2 px-4 py-3">Defensive</div>
  )
}