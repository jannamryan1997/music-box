import { EUserRole } from '../moduls/auth-user';
import { IMenuItem } from '../moduls/menu-item';

export const MENU_ITEM: IMenuItem[] = [
    { label: 'Songs', path: '/songs', icon: 'play-circle', roles: [EUserRole.Restaurant, EUserRole.SuperAdmin] },
    { label: 'Admins', path: '/admins', icon: 'font-colors', roles: [EUserRole.Admin, EUserRole.SuperAdmin] },
    { label: 'Restaurants', path: '/restaurants', icon: 'coffee', roles: [EUserRole.Admin, EUserRole.SuperAdmin] },
    { label: 'Users', path: '/users', icon: 'usergroup-add', roles: [EUserRole.Admin, EUserRole.SuperAdmin] },
    { label: 'Log out', path: '/landing', icon: 'logout', roles: [EUserRole.Restaurant, EUserRole.Admin, EUserRole.SuperAdmin] },
];
