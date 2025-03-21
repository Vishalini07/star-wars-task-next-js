'use client';
import { createContext, useContext, useState } from 'react';
import { PeopleDetails } from '../services/starWar.service';

interface FavoritesContextType {
    favorites: any[];
    toggleFavorite: (character: any) => void;
    updateFavorite: (url: string, updatedData: Partial<PeopleDetails>) => void;

}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
    const [favorites, setFavorites] = useState<PeopleDetails[]>([]);

    const toggleFavorite = (character: PeopleDetails) => {
        setFavorites((prevFavorites) => {
            const isFavorite = prevFavorites.some((fav) => fav.name === character.name);
            if (isFavorite) {
                return prevFavorites.filter((fav) => fav.name !== character.name);
            } else {
                return [...prevFavorites, character];
            }
        });
    };

    const updateFavorite = (url: string, updatedData: Partial<PeopleDetails>) => {
        setFavorites((prev) =>
            prev.map((fav) => (fav.url === url ? { ...fav, ...updatedData } : fav))
        );
    };


    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, updateFavorite  }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};
