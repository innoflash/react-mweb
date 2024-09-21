import { FibreProductModel } from '@mweb/app/models/fibre-product.model';

export default function ProductDetail({ product, campaign }: { product: FibreProductModel, campaign?: string }) {
  console.log(product);
  return (
    <div className="w-full border-2 px-4 py-3 cursor-pointer hover:bg-gray-300">
      <div className="flex flex-col">
        <span>{ product.friendlyName }</span>
        <span>{ product.parameters.find(param => param.name === 'isThrottled')?.value }</span>
        <span>{campaign}</span>
      </div>
    </div>
  )
}