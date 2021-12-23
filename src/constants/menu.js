import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'dashboards',
    icon: 'iconsminds-shop-4',
    label: 'menu.dashboards',
    to: `${adminRoot}/dashboards`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      // {
      //   icon: 'simple-icon-briefcase',
      //   label: 'menu.overview',
      //   to: `${adminRoot}/dashboards/overview`,
      //   // roles: [UserRole.Admin],
      // },
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
        icon: 'iconsminds-map-marker-2',
        label: 'menu.locations',
        to: `${adminRoot}/space/locations`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'iconsminds-monitor',
        label: 'menu.desks',
        to: `${adminRoot}/space/desks`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'iconsminds-network',
        label: 'menu.meeting-room',
        to: `${adminRoot}/space/meeting-room`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'iconsminds-computer',
        label: 'menu.private-cabins',
        to: `${adminRoot}/space/private-cabins`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'iconsminds-headset',
        label: 'menu.conference-room',
        to: `${adminRoot}/space/conference-room`,
        // roles: [UserRole.Admin],
      },
    ],
  },
  {
    id: 'client',
    icon: 'iconsminds-conference',
    label: 'menu.client',
    to: `${adminRoot}/client`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-calendar',
        label: 'menu.bookings',
        to: `${adminRoot}/client/bookings`,
        // roles: [UserRole.Admin],
      },
      // {
      //   icon: 'simple-icon-organization',
      //   label: 'menu.companies',
      //   to: `${adminRoot}/client/companies`,
      //   // roles: [UserRole.Admin],
      // },
      {
        icon: 'simple-icon-people',
        label: 'menu.customers',
        to: `${adminRoot}/client/customers`,
        // roles: [UserRole.Admin],
      },
    ],
  },
  {
    id: 'billing',
    icon: 'iconsminds-receipt-4',
    label: 'menu.billing',
    to: `${adminRoot}/billing`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'iconsminds-letter-open',
        label: 'menu.invoices',
        to: `${adminRoot}/billing/invoices`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'simple-icon-list',
        label: 'menu.plans',
        to: `${adminRoot}/billing/plans`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'iconsminds-coffee',
        label: 'menu.amenities',
        to: `${adminRoot}/billing/amenities`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'iconsminds-ribbon',
        label: 'menu.discounts',
        to: `${adminRoot}/billing/discounts`,
        // roles: [UserRole.Admin],
      },
    ],
  },
  {
    id: 'collaboration',
    icon: 'iconsminds-mail-read',
    label: 'menu.collaboration',
    to: `${adminRoot}/collaboration`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'iconsminds-mailbox-empty',
        label: 'menu.tickets',
        to: `${adminRoot}/collaboration/tickets`,
        // roles: [UserRole.Admin],
      },
    ],
  },
];
export default data;
