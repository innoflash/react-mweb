import { Campaign } from '@mweb/app/models/fiber-campaigns.response';
import { CampaignsState } from '@mweb/app/models/state/campaigns.state.model';
import { createSlice } from '@reduxjs/toolkit';

export const CAMPAIGNS = 'mweb-campaigns';

const initialState = { campaigns: [] } satisfies CampaignsState as CampaignsState;

const campaignsSlice = createSlice({
  name: CAMPAIGNS,
  initialState,
  reducers: {
    setCampaigns: (state, action: { payload: Array<Campaign> }) => {
      state.campaigns = action.payload;
    },
    setSelectedCampaign: (state, action: { payload: Campaign | undefined }) => {
      state.selectedCampaign = action.payload;
    }
  }
});

export const campaignActions = campaignsSlice.actions;
export default campaignsSlice;

