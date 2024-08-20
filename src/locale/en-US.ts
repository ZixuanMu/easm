import localeMessageBox from '@/components/message-box/locale/en-US';
import localeLogin from '@/views/login/locale/en-US';

import localeWorkplace from '@/views/dashboard/workplace/locale/en-US';
import localeTaskmanager from '@/views/task/taskmanager/locale/en-US';
import localeTaskcreate from '@/views/task/taskcreate/locale/en-US';
import localeFootage from '@/views/footage/footagemanager/locale/en-US';
import localeFootageLabelmanager from '@/views/footage/labelmanager/locale/en-US';

import locale403 from '@/views/exception/403/locale/en-US';
import locale404 from '@/views/exception/404/locale/en-US';
import locale500 from '@/views/exception/500/locale/en-US';

import localeUserInfo from '@/views/user/info/locale/en-US';
import localeUserSetting from '@/views/user/setting/locale/en-US';
/** simple end */
import localeSettings from './en-US/settings';

export default {
  'menu.dashboard': 'Dashboard',
  'menu.server.dashboard': 'Dashboard - Server',
  'menu.server.workplace': 'Workplace - Server',
  'menu.server.monitor': 'Real-time Monitor - Server',
  'menu.training': 'Training Management',
  'menu.task': 'Task Management',
  'menu.reporter': 'Reports',
  'menu.footage': 'Footage Library',
  'menu.footageList.footagemanager': 'Footage Manager',
  'menu.footageList.labelmanager': 'Label Manager',
  'menu.user': 'User Management',
  'menu.phishing': 'Phishing Emails',
  'menu.risk': 'Risk Scoring',
  'menu.settings': 'System Settings',
  'navbar.docs': 'Documentation',
  'navbar.action.locale': 'Switch to English',
  ...localeTaskcreate,
  ...localeFootage,
  ...localeFootageLabelmanager,
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,
  ...localeTaskmanager,
  ...locale403,
  ...locale404,
  ...locale500,
  ...localeUserInfo,
  ...localeUserSetting,
  
  /** simple end */
};
