import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeLogin from '@/views/login/locale/zh-CN';

import localeWorkplace from '@/views/dashboard/workplace/locale/zh-CN';
import localeTrainingmanager from '@/views/training/trainingmanager/locale/zh-CN';

import localeTaskmanager from '@/views/task/taskmanager/locale/zh-CN';
import localeTaskcreate from '@/views/task/taskcreate/locale/zh-CN';

import localeFootage from '@/views/footage/footagemanager/locale/zh-CN';
import localeFootageLabelmanager from '@/views/footage/labelmanager/locale/zh-CN';
import localeFootageCreate from '@/views/footage/footagecreate/locale/zh-CN'

import locale403 from '@/views/exception/403/locale/zh-CN';
import locale404 from '@/views/exception/404/locale/zh-CN';
import locale500 from '@/views/exception/500/locale/zh-CN';


/** simple end */
import localeSettings from './zh-CN/settings';

export default {
  'menu.dashboard': '仪表盘',
  'menu.server.dashboard': '仪表盘-服务端',
  'menu.server.workplace': '工作台-服务端',
  'menu.server.monitor': '实时监控-服务端',
  'menu.training': '培训管理',
  'menu.training.trainingmanager': '培训管理',
  'menu.training.industrystandards': '行业标准',
  'menu.training.trainingnotify': '培训通知',
  'menu.task': '任务管理',
  'menu.report': '报告',
  'menu.report.reportmanage': '报告管理',
  'menu.report.remarkreport': '已标记报告',
  'menu.footage': '素材仓库',
  'menu.footageList.footagemanager': '素材管理',
  'menu.footageList.labelmanager': '标签管理',
  'menu.footageList.remotefootage': '云端仓库',
  'menu.user': '用户管理',
  'menu.phishing': '钓鱼邮件',
  'menu.phishing.phishingactive':'钓鱼活动',
  'menu.phishing.emailsetting':'邮件设置',
  'menu.phishing.socialengineering':'社工测试',
  'menu.risk': '风险评分',
  'menu.user.departmentmanager': '部门管理',
  'menu.user.rolemanager': '角色管理',
  'menu.user.usermanager': '用户管理',
  'menu.user.groupmanager': '用户组管理',
  'menu.user.employeemanager':'员工管理',

  'menu.user.loginway': '单点登录',
  'menu.settings': '系统设置',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',
  ...localeTrainingmanager,
  ...localeTaskcreate,
  ...localeFootage,
  ...localeFootageLabelmanager,
  ...localeFootageCreate,
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,
  ...localeTaskmanager,
  ...locale403,
  ...locale404,
  ...locale500,

  
  /** simple end */
};
