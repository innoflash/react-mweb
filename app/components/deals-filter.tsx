import { Campaign } from '@mweb/app/models/fiber-campaigns.response';
import { AppState } from '@mweb/app/models/state/app.state.model';
import { CAMPAIGNS } from '@mweb/app/store/campaigns.slice';
import App from 'next/app';
import { useSelector } from 'react-redux';

export default function DealsFilter() {
  const priceOptions = [
    'R0 - R699',
    'R700 - R999',
    'R1000+'
  ];
  const campaigns = useSelector<AppState, Array<Campaign>>(state => state[CAMPAIGNS].campaigns);
  const selectedCampaign = useSelector<AppState, Campaign | undefined>(state => state[CAMPAIGNS].selectedCampaign);

  return (
    <div className="w-full flex flex-row">
      <div className="w-1/3">
        <label className="font-light">Filter By:</label>
        <div className="flex gap-2">
          <select value={ undefined }
                  className="px-4 py-2 border-2">
            <option value={ undefined }>Speed</option>
          </select>
          <select value={ undefined }
                  className="px-4 py-2 border-2">
            <option value={ undefined }>Price</option>
            { priceOptions.map((priceOption) => <option key={ priceOption }
                                                        value={ priceOption }>{ priceOption }</option>) }
          </select>
        </div>
      </div>
      <div className="w-1/3 flex flex-col">
        <label className="font-light">Deal Type:</label>
        <select value={ selectedCampaign?.code }
                className="bg-blue-900 text-white py-2 text-center"
                style={ { borderRight: "10px solid transparent" } }>
          <option disabled value={ undefined }>Select campaign</option>
          { campaigns.map(campaign => (
            <option key={ campaign.code } value={ campaign.code }>{ campaign.name }</option>)) }
        </select>
      </div>
    </div>
  );
}