import { EUserRole } from '../moduls/auth-user';
import { IMenuItem } from '../moduls/menu-item';

export const MENU_ITEM: IMenuItem[] = [
    { label: 'Reataurant Song', path: 'restaurantSong', icon: 'play-circle', roles: [EUserRole.Restaurant] },
    { label: 'Songs', path: '/songs', icon: 'play-circle', roles: [EUserRole.SuperAdmin] },
    { label: 'Admins', path: '/admins', icon: 'font-colors', roles: [EUserRole.SuperAdmin] },
    { label: 'Restaurants', path: '/restaurants', icon: 'coffee', roles: [EUserRole.SuperAdmin] },
    { label: 'Users', path: '/users', icon: 'usergroup-add', roles: [EUserRole.SuperAdmin] },
    { label: 'Log out', path: '/landing', icon: 'logout', roles: [EUserRole.Restaurant, EUserRole.SuperAdmin] },
];
