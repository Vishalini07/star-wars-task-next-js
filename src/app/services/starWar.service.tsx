import { ApiService } from "./api.service";

const apiService = new ApiService();

export interface PeopleDetails {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
    homeworldName: string
}


export const extractPlanetId = (url: string): string | null => {
    const match = url.match(/\/(\d+)\/$/); // Extracts the number between slashes
    return match ? match[1] : null; // Returns the number or null if not found
};

export const getPeopleList = async (pageCount:number) => {
    let result;
    await apiService.get(`/people/?page=${pageCount}`).then((response: any) => {
        result = response
    }).catch(error => {
        console.error('Error occurred :', error.response);
    });
    return result;
}


export const planetNameById = async (planetId:string | null) => {
    let result;    
    await apiService.get(`/planets/${planetId}`).then((response: any) => {
        result = response?.name
    }).catch(error => {
        console.error('Error occurred :', error.response);
    });
    return result;
}

export const peopleGetById = async (peopleId:string | null) => {
    let result;    
    await apiService.get(`/people/${peopleId}`).then((response: any) => {
        result = response
    }).catch(error => {
        console.error('Error occurred :', error.response);
    });
    return result;
}

export const filmsGetById = async (filmId:string | null) => {
    let result;    
    await apiService.get(`/films/${filmId}`).then((response: any) => {
        result = response?.title
    }).catch(error => {
        console.error('Error occurred :', error.response);
    });
    return result;
}



export const starShipGetById = async (starId:string | null) => {
    let result;    
    await apiService.get(`/starships/${starId}`).then((response: any) => {
        result = response?.name
    }).catch(error => {
        console.error('Error occurred :', error.response);
    });
    return result;
}