import {NbMenuItem} from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Profile',
    expanded: true,
    children: [
      {
        title: 'Change Password',
      },
      {
        title: 'Privacy Policy',
      },
      {
        title: 'Logout',
      },
    ],
  },
  {
    title: 'Shopping Bag',
  },
  {
    title: 'Orders',
  },
]
