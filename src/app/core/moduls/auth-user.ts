export interface IAuthUser {
    role: EUserRole;
}
export enum EUserRole {
    Restaurant = 'Restaurant',
    Admin = 'Admin',
    SuperAdmin = 'SuperAdmin'
}

export type TUserRole = EUserRole.Restaurant | EUserRole.Admin | EUserRole.SuperAdmin;
