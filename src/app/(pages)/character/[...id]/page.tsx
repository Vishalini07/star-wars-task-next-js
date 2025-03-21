"use client";

import { useEffect, useState } from "react";
import { useFavorites } from "@/app/context/favoritesContext";
import { extractPlanetId, filmsGetById, peopleGetById, planetNameById, starShipGetById, PeopleDetails } from "@/app/services/starWar.service";
import GenericButton from "@/app/(components)/genericButton";

const CharacterDetails = ({ params }: { params: { id: string } }) => {

    const characterId = params.id;
    const { favorites, toggleFavorite } = useFavorites();

    // State for character details
    const [peopleDetail, setPeopleDetail] = useState<PeopleDetails | null>(null);
    const [homeworldName, setHomeworldName] = useState<string>("");
    const [updatedFilmList, setUpdatedFilmList] = useState<any[]>([]);
    const [updatedStarShipList, setUpdatedStarShipList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCharacterData();
    }, [characterId]);

    const fetchCharacterData = async () => {
        setLoading(true);
        try {
            peopleGetById(characterId).then(async (res: any) => {
                setPeopleDetail(res);

                // Fetch homeworld
                const homeworldId = extractPlanetId(res?.url);

                await planetNameById(homeworldId).then((response: any) => {
                    setHomeworldName(response);
                })


                // Fetch films
                const films = await Promise.all(
                    res?.films?.map(async (filmUrl: string) => ({
                        filmName: await filmsGetById(extractPlanetId(filmUrl))
                    })) || []
                );
                setUpdatedFilmList(films);

                // Fetch starships
                const starships = await Promise.all(
                    res?.starships?.map(async (shipUrl: string) => ({
                        starName: await starShipGetById(extractPlanetId(shipUrl))
                    })) || []
                );
                setUpdatedStarShipList(starships);
            });




        } catch (error) {
            console.error("Error fetching character details:", error);
        }
        setLoading(false);
    };

    if (loading) return <p className="text-center text-lg">Loading...</p>;

    // Check if the character is already in favorites
    const isFavorite = favorites.some((fav) => fav.name === peopleDetail?.name);

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">{peopleDetail?.name}</h1>
                <GenericButton
                    onClick={() => toggleFavorite(peopleDetail)}
                    variant={isFavorite ? "danger" : "primary"}
                    className="px-6 py-2 rounded-lg shadow-md w-auto"
                >
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </GenericButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <p className="text-lg"><span className="font-semibold">Gender:</span> {peopleDetail?.gender}</p>
                    <p className="text-lg"><span className="font-semibold">Hair Color:</span> {peopleDetail?.hair_color}</p>
                    <p className="text-lg"><span className="font-semibold">Eye Color:</span> {peopleDetail?.eye_color}</p>
                    <p className="text-lg"><span className="font-semibold">Height:</span> {peopleDetail?.height}</p>
                    <p className="text-lg"><span className="font-semibold">Birth Year:</span> {peopleDetail?.birth_year}</p>
                </div>
                <div>
                    <p className="text-lg"><span className="font-semibold">Home World:</span> {homeworldName}</p>
                    <p className="text-lg"><span className="font-semibold">Skin Color:</span> {peopleDetail?.skin_color}</p>
                    <p className="text-lg"><span className="font-semibold">Mass:</span> {peopleDetail?.mass}</p>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-2">Character Films and Starships</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="font-semibold">Films:</p>
                        <ul className="list-disc list-inside text-lg">
                            {updatedFilmList.map((film, index) => (
                                <li key={index}>{film.filmName}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold">Starships:</p>
                        <ul className="list-disc list-inside text-lg">
                            {updatedStarShipList.map((star, index) => (
                                <li key={index}>{star.starName}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterDetails;
