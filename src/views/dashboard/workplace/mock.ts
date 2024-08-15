import Mock from 'mockjs';
import qs from 'query-string';
import dayjs from 'dayjs';
import { GetParams } from '@/types/global';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';

const textList = [
  {
    key: 1,
    clickNumber: '网络安全部门',
    title: '网络安全培训：如何防范网络钓鱼攻击',
    increases: '35%',
  },
  {
    key: 2,
    clickNumber: '数据保护组',
    title: '网络安全培训：密码管理的重要性',
    increases: '35%',
  },
  {
    key: 3,
    clickNumber: '网络安全部门',
    title: '网络安全培训：识别恶意软件的方法',
    increases: '45%',
  },
  {
    key: 4,
    clickNumber: '网络安全部门',
    title: '网络安全培训：保护个人信息的最佳实践',
    increases: '37%',
  },
  {
    key: 5,
    clickNumber: '企业安全组',
    title: '网络安全培训：企业数据安全的重要性',
    increases: '16%',
  },
  {
    key: 6,
    clickNumber: '安全培训组',
    title: '网络安全培训：防范社交工程攻击',
    increases: '58%',
  },
  {
    key: 7,
    clickNumber: '安全培训组',
    title: '网络安全培训：多因素认证的使用',
    increases: '89%',
  },
  {
    key: 8,
    clickNumber: '网络安全部门',
    title: '网络安全培训：安全浏览器的使用技巧',
    increases: 37,
  },
];

const imageList = [
  {
    key: 1,
    clickNumber: '移动设备安全组',
    title: '网络安全培训：保护移动设备安全',
    increases: 15,
  },
  {
    key: 2,
    clickNumber: '应急响应组',
    title: '网络安全培训：如何应对网络攻击',
    increases: 26,
  },
  {
    key: 3,
    clickNumber: '云安全组',
    title: '网络安全培训：云存储的安全使用',
    increases: 9,
  },
  {
    key: 4,
    clickNumber: '家庭安全组',
    title: '网络安全培训：家庭网络安全',
    increases: 0,
  },
  {
    key: 5,
    clickNumber: '加密技术组',
    title: '网络安全培训：数据加密的重要性',
    increases: 4,
  },
];

const videoList = [
  {
    key: 1,
    clickNumber: '网络钓鱼防护组',
    title: '网络安全培训：如何防止网络钓鱼',
    increases: 5,
  },
  {
    key: 2,
    clickNumber: '勒索软件组',
    title: '网络安全培训：如何应对勒索软件',
    increases: 17,
  },
  {
    key: 3,
    clickNumber: '在线支付安全组',
    title: '网络安全培训：保护在线支付安全',
    increases: 30,
  },
  {
    key: 4,
    clickNumber: '网站安全组',
    title: '网络安全培训：识别假冒网站',
    increases: 12,
  },
  {
    key: 5,
    clickNumber: 'VPN使用组',
    title: '网络安全培训：如何使用VPN',
    increases: 2,
  },
];


setupMock({
  setup() {
    Mock.mock(new RegExp('/api/content-data'), () => {
      const presetData = [58, 81, 53, 90, 64, 88, 49, 79];
      const getLineData = () => {
        const count = 8;
        return new Array(count).fill(0).map((el, idx) => ({
          x: dayjs()
            .day(idx - 2)
            .format('MM.DD'),
          y: presetData[idx],
        }));
      };
      return successResponseWrap([...getLineData()]);
    });
    Mock.mock(new RegExp('/api/popular/list'), (params: GetParams) => {
      const { type = 'text' } = qs.parseUrl(params.url).query;
      if (type === 'image') {
        return successResponseWrap([...videoList]);
      }
      if (type === 'video') {
        return successResponseWrap([...imageList]);
      }
      return successResponseWrap([...textList]);
    });
    Mock.mock(new RegExp('/api/dashboard/getUserNum'), () => {

      return successResponseWrap({
        count: 1438,
        growth: 56,
      });
    });
    Mock.mock(new RegExp('/api/dashboard/getFootageNum'), () => {

      return successResponseWrap({
        count: 578,
        growth: 87,
      });
    });
    Mock.mock(new RegExp('/api/dashboard/getTrainingPercent'), () => {

      return successResponseWrap({
        count: 32.3,
        growth: 1.2,
      });
    });
    Mock.mock(new RegExp('/api/dashboard/getTrainingNum'), () => {
   
      return successResponseWrap({
        count: 120,
        growth: 2,
      });
    });
  },
});
