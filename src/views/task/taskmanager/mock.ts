import Mock from 'mockjs';
import qs from 'query-string';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';
import { GetParams } from '@/types/global';

const { Random } = Mock;

const data = Mock.mock({
  'list|55': [
    {
      'id|8': /[A-Z][a-z][-][0-9]/,
      'taskname|4-8': /[A-Za-z]/,
      'tasktype|1': ['Type A', 'Type B', 'Type C'],
      'usergroup|1': ['Group 1', 'Group 2', 'Group 3'],
      'status|1': ['online', 'offline'],
      'createdTime': Random.datetime(),
      'completionRate|0-100': 1,
    },
  ],
});

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/list/policy'), (params: GetParams) => {
      const { current = 1, pageSize = 10 } = qs.parseUrl(params.url).query;
      const p = current as number;
      const ps = pageSize as number;
      return successResponseWrap({
        list: data.list.slice((p - 1) * ps, p * ps),
        total: 55,
      });
    });
  },
});
