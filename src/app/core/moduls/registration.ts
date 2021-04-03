export interface IRegistrationRestaurant {
    name: string;
    latitude: string;
    longitude: string;
    address: string;
    phoneNumber: string;
    email: string;
    openTime: number;
    closeTime: number;
    password: string;
    avatar?: FormData | string;
}
