import axios from 'axios';

export interface BaseInfoModel {
  footageName: string;
  footageType: string;
  label: string[];
}
export interface footageInfoModel {
  advertisingSource: string;
  advertisingMedia: string;
  keyword: string[];
  pushNotify: boolean;
  advertisingContent: string;
}

export type UnitfootageModel = BaseInfoModel & footageInfoModel;

export function submitfootageForm(data: UnitfootageModel) {
  return axios.post('/api/footage-form/submit', { data });
}
