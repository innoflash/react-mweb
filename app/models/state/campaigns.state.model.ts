import { Campaign } from '@mweb/app/models/fiber-campaigns.response';

export interface CampaignsState {
  campaigns: Array<Campaign>;
  selectedCampaign?: Campaign;
}