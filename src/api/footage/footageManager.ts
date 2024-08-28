import axios from 'axios';
import qs from 'query-string';

export interface label{
    id:number;
    name:string;
}
// 定义结构
export interface FootageRecord {
  id: number;    
  labels: label[];  
  name:string;
  subId:number;
  img:string;
  type:number;
}

// 定义用于查询标签列表的参数结构
export interface FootageParams extends Partial<FootageRecord> {
    page:number;
    pageSize:number;
}

// 定义标签列表响应的数据结构
export interface FootageListRes {
  data: FootageRecord[];  // 标签的数组，包含多个标签记录
  total: number;         // 标签的总数量
  pages: number;         // 总页数
  page_num: number;      // 当前页码
}

// 获取标签列表的函数
export function FootagePolicyList(params: FootageParams) {
  return axios.get<FootageListRes>('/api/admin/footage', {
    params,
    paramsSerializer: qs.stringify,  // 直接传递qs.stringify函数
  });
}
export function deletefootageForm(fid: number) {
  return axios.delete('/api/admin/footage', { data: { fid} });
}