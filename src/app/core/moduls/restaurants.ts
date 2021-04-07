export interface IResataurants {
    address: string;
    avatar: string;
    id: number;
    isAdminVerified: boolean;
    latitude: number;
    longitude: number;
    name: string;
    phoneNumber: string;
}

export interface IRestaurantResponse{
    restaurantId: number;
}
