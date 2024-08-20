import axios from 'axios';

export interface BaseInfoModel {
  channelType: string;
  promotionTime: string[];
}
export interface ChannelInfoModel {
  footageName: string;
  advertisingSource: string;
  advertisingMedia: string;
  keyword: string[];
  pushNotify: boolean;
  advertisingContent: string;
}

export type UnitChannelModel = BaseInfoModel & ChannelInfoModel;

export function submitChannelForm(data: UnitChannelModel) {
  return axios.post('/api/channel-form/submit', { data });
}
