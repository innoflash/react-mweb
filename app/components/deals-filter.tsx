import { Campaign } from '@mweb/app/models/fiber-campaigns.response';
import { AppState } from '@mweb/app/models/state/app.state.model';
import { campaignActions, CAMPAIGNS } from '@mweb/app/store/campaigns.slice';
import { filterActions } from '@mweb/app/store/filters.slice';
import { ChangeEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const priceOptions = [
  { min: 0, max: 699, label: 'R0 - R699' },
  { min: 700, max: 999, label: 'R700 - R999' },
  { min: 1000, max: 9999, label: 'R1000+' }
];

export default function DealsFilter() {
  const dispatch = useDispatch();
  const priceSelectRef = useRef<HTMLSelectElement>();
  const [filteredPriceRange, setFilteredPriceRange] = useState('-1');
  const campaigns = useSelector<AppState, Array<Campaign>>(state => state[CAMPAIGNS].campaigns);
  const selectedCampaign = useSelector<AppState, Campaign | undefined>(state => state[CAMPAIGNS].selectedCampaign);

  const priceRangeChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedPriceIndex = +event.target.value;
    if (selectedPriceIndex === -1) {
      return dispatch(filterActions.updatePriceFilter(undefined));
    }

    return dispatch(filterActions.updatePriceFilter(priceOptions[selectedPriceIndex]));
  }

  const dealTypeChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilteredPriceRange('-1');
    if (priceSelectRef?.current) {
      priceSelectRef.current.value = '-1';
    }
    dispatch(filterActions.resetFilter());
    dispatch(campaignActions.setSelectedCampaign(event.target.value));
  }

  return (
    <div className="w-full flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 lg:w-1/3">
        <label className="font-light">Filter By:</label>
        <div className="flex gap-2">
          <select defaultValue={ undefined }
                  className="px-4 py-2 border-2 bg-transparent flex-grow md:flex-grow-0">
            <option value={ undefined }>Speed</option>
          </select>
          <select defaultValue={ filteredPriceRange }
                  // @ts-expect-error This is alright.
                  ref={ priceSelectRef }
                  className="px-4 py-2 border-2 bg-transparent flex-grow md:flex-grow-0"
                  onChange={ priceRangeChangeHandler }>
            <option value="-1">Price</option>
            { priceOptions.map((priceOption, index) => <option key={ priceOption.label }
                                                               value={ index }>{ priceOption.label }</option>) }
          </select>
        </div>
      </div>
      <div className="w-full mt-4 md:mt-0 md:w-1/2 lg:w-1/3 flex flex-col">
        <label className="font-light">Deal Type:</label>
        <select defaultValue={ selectedCampaign?.code }
                className="bg-blue-900 text-white py-2 text-center"
                style={ { borderRight: "10px solid transparent" } }
                onChange={ dealTypeChangeHandler }>
          <option disabled value={ undefined }>Select campaign</option>
          { campaigns.map(campaign => (
            <option key={ campaign.code } value={ campaign.code }>{ campaign.name }</option>)) }
        </select>
      </div>
    </div>
  );
}