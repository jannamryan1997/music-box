export interface ISongs {
    endSecond: number;
    id: number;
    name: string;
    price: number;
    restaurantId: number;
    restaurantName: string;
    startSecond: number;
    status: number;
    url: string;
}

export interface ISongDetails {
    name: string;
    price: number;
    url: string;
    startSecond: number;
    endSecond: number;
    restaurantId?: number;
    genreId: number;
}


export interface IGenres {
    genres: IGenresDetails[];

}

export interface IGenresDetails {
    id: number;
    name: string;
}
