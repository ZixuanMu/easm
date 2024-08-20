import axios from 'axios';

export interface BaseInfoModel {

  footageType: number;
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
