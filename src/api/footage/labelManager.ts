import axios from 'axios';
import qs from 'query-string';

// 定义标签的结构，包括ID和名称
export interface PolicyRecord {
  id: number;    // 标签的唯一标识符 (数值类型)
  name: string;  // 标签的名称
  labelId: number;
}

// 定义用于查询标签列表的参数结构
export interface PolicyParams extends Partial<PolicyRecord> {
  page: number;       // 当前页码
  pageSize: number;  // 每页显示的标签数量
}

// 定义标签列表响应的数据结构
export interface PolicyListRes {
  data: PolicyRecord[];  // 标签的数组，包含多个标签记录
  total: number;         // 标签的总数量
  pages: number;         // 总页数
  page_num: number;      // 当前页码
}

// 获取标签列表的函数
export function labelPolicyList(params: PolicyParams) {
  return axios.get<PolicyListRes>('/api/admin/label', {
    params,
    paramsSerializer: qs.stringify,  // 直接传递qs.stringify函数
  });
}

// 创建标签的函数
export function createLabelForm(labelName: string) {
  return axios.post('/api/admin/label', { name: labelName });
}

// 根据ID删除标签的函数
export function deleteLabelForm(labelId: number) {
  return axios.delete('/api/admin/label', { data: { labelId } });
}
// 根据ID编辑标签的函数
export function putLabel(id: number, name: string) {
  return axios.put('/api/admin/label', {
    id,  // 传递id
    name // 传递name
  });
}
