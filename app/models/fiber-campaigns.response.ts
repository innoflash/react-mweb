export interface FiberCampaignsResponse {
  links: Array<unknown>;
  campaigns: Array<Campaign>;
}

export interface Campaign {
  links: Array<unknown>;
  category: string;
  code: string;
  description: string;
  name: string;
  slug: string;
  isDefaultCampaign: boolean;
  isPrivateCampaign: boolean;
  isStandardCampaign: boolean;
  promocodes: Array<string>;
}