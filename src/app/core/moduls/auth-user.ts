export interface IAuthUser {
    role: EUserRole;
    id?: number;
    login?: string;
    name?: string;
    latitude?: number;
    longitude?: number;
    address?: string;
    phoneNumber?: string;

}
export enum EUserRole {
    Restaurant = 'Restaurant',
    Admin = 'Admin',
    SuperAdmin = 'SuperAdmin'
}

export type TUserRole = EUserRole.Restaurant | EUserRole.Admin | EUserRole.SuperAdmin;
