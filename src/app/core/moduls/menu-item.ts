import { TUserRole } from './auth-user';

export interface IMenuItem {
    label: string;
    path: string;
    icon: string;
    roles: TUserRole[];
}
