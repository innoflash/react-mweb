import { FibreProductModel } from '@mweb/app/models/fibre-product.model';

export default function ProductDetail({ product, campaign }: { product: FibreProductModel, campaign?: string }) {
  const providerLogo = `https://www.mweb.co.za/media/images/providers/provider-${ product.subcategory.replace('Uncapped', '')
    .replace('Capped', '')
    .trim()
    .toLowerCase()
    .replace(' ', '-') }.png`;

  return (
    <div className="w-full border-2 px-4 py-3 cursor-pointer hover:bg-gray-300">
      <div className="flex flex-col">
        <span className="font-black tracking-wide">{ product.friendlyName }</span>
        <span
          className="font-light opacity-65">{ product.parameters.find(param => param.name === 'isThrottled')?.value }</span>
        <span className="opacity-65">{ campaign }</span>
        <div className="flex justify-between items-center h-8">
          <span className="h-full text-xl font-black">R{ product.productRate }pm</span>
          <img className="h-full" src={ providerLogo } alt={ product.subcategory }/>
        </div>
      </div>

    </div>
  )
}