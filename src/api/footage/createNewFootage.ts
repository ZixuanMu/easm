import axios from 'axios';

export interface BaseInfoModel {
  footageType: number;
  labels: number[];
}

export interface ArticleInfoModel {
  content: string;
  title: string;
  file?: File; // 这是缩略图，后端给的接口就叫这个名字
}

export type UnitfootageModel = BaseInfoModel & ArticleInfoModel;

export function submitfootageForm(data: UnitfootageModel) {
  const formData = new FormData();
  formData.append('content', data.content);
  formData.append('title', data.title);
  data.labels.forEach(label => formData.append('labels', label.toString()));

  formData.append('file', data.file as any);
  
  return axios.post('/api/admin/article', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}