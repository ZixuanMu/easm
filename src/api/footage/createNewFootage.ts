import axios from 'axios';

export interface BaseInfoModel {
  footageType: number;
  labels: number[];
}

export interface ArticleInfoModel {
  content: string;
  title: string;
  image?: File; // 假设image是一个文件对象
}

export type UnitfootageModel = BaseInfoModel & ArticleInfoModel;

export function submitfootageForm(data: UnitfootageModel) {
  const params = new URLSearchParams();
  params.append('content', data.content);
  params.append('title', data.title);
  data.labels.forEach(label => params.append('labels', label.toString()));

  // 假设image需要通过表单数据上传
  const formData = new FormData();
  if (data.image) {
    formData.append('image', data.image);
  }

  return axios.post(`/api/admin/article?${params.toString()}`, formData);
}
