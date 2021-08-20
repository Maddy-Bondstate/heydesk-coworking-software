import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'dashboards',
    icon: 'iconsminds-shop-4',
    label: 'menu.dashboards',
    to: `${adminRoot}/dashboards`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-briefcase',
        label: 'menu.overview',
        to: `${adminRoot}/dashboards/overview`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'simple-icon-calendar',
        label: 'menu.calendar',
        to: `${adminRoot}/dashboards/calendar`,
        // roles: [UserRole.Admin],
      },
    ],
  },
  {
    id: 'space',
    icon: 'iconsminds-location-2',
    label: 'menu.space',
    to: `${adminRoot}/space`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-briefcase',
        label: 'menu.desks',
        to: `${adminRoot}/space/desks`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'simple-icon-calendar',
        label: 'menu.meeting-room',
        to: `${adminRoot}/space/meeting-room`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'simple-icon-calendar',
        label: 'menu.private-cabins',
        to: `${adminRoot}/space/private-cabins`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'simple-icon-calendar',
        label: 'menu.conference-room',
        to: `${adminRoot}/space/conference-room`,
        // roles: [UserRole.Admin],
      },
    ],
  },
];
export default data;
