// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  // WINE
  // ----------------------------------------------------------------------
  {
    subheader: 'wine',
    items: [
      { title: 'Edit', path: PATH_DASHBOARD.one, icon: ICONS.dashboard },
      { title: 'Add', path: PATH_DASHBOARD.two, icon: ICONS.ecommerce },
      { title: 'Three', path: PATH_DASHBOARD.three, icon: ICONS.analytics },
    ],
  },

  // BOTTLES
  // ----------------------------------------------------------------------
  {
    subheader: 'bottles',
    items: [
      { title: 'Consume', path: PATH_DASHBOARD.user.four, icon: ICONS.dashboard },
      { title: 'Add', path: PATH_DASHBOARD.user.five, icon: ICONS.ecommerce },
      { title: 'Edit', path: PATH_DASHBOARD.user.six, icon: ICONS.analytics },
    ],
  },

  // SETTINGS
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'settings',
  //   items: [
  //     {
  //       title: 'user',
  //       path: PATH_DASHBOARD.user.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'Four', path: PATH_DASHBOARD.user.four },
  //         { title: 'Five', path: PATH_DASHBOARD.user.five },
  //         { title: 'Six', path: PATH_DASHBOARD.user.six },
  //       ],
  //     },
  //   ],
  // },
];

export default navConfig;
