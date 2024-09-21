import { FibreProductModel } from '@mweb/app/models/fibre-product.model';
import { ArrowDown, ArrowUp } from 'react-bootstrap-icons';

const bytesToMB = (speed?: string): string => {
  if (!speed) {
    return '0Mbps';
  }

  return +speed.replace(/[A-Za-z]/g, '') / 1024 + 'Mbps';
}

export default function ProductDetail({ product, campaign }: { product: FibreProductModel, campaign?: string }) {
  const providerLogo = `https://www.mweb.co.za/media/images/providers/provider-${ product.subcategory.replace('Uncapped', '')
    .replace('Capped', '')
    .trim()
    .toLowerCase()
    .replace(' ', '-') }.png`;

  return (
    <div className="w-full border-2 px-4 py-3 cursor-pointer hover:bg-gray-300 flex gap-6 rounded">
      <div className="flex flex-col flex-grow">
        <span className="font-black tracking-wide">{ product.friendlyName }</span>
        <span
          className="font-light opacity-65">{ product.parameters.find(param => param.name === 'isThrottled')?.value }</span>
        <span className="opacity-65">{ campaign }</span>
        <div className="flex justify-between items-center h-8">
          <span className="h-full text-xl font-black">R{ product.productRate }pm</span>
          <img className="h-full" src={ providerLogo } alt={ product.subcategory }/>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex gap-5">
          <div className="flex flex-col text-center">
            <ArrowDown className="self-center"/>
            <span className="opacity-50 text-sm font-bold">Download</span>
            <span className="font-semibold opacity-75">
              { bytesToMB(product.parameters.find(param => param.name === 'downloadSpeed')?.value) }
            </span>
          </div>
          <div className="flex flex-col text-center">
            <ArrowUp className="self-center"/>
            <span className="opacity-50 text-sm font-bold">Upload</span>
            <span className="font-semibold opacity-75">
              { bytesToMB(product.parameters.find(param => param.name === 'uploadSpeed')?.value) }
            </span>
          </div>
        </div>
        <button className="w-full bg-red-600 text-white font-bold py-1 px-4 rounded mt-3">
          Check Coverage
        </button>
      </div>
    </div>
  )
}