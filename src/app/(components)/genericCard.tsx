
import Link from "next/link";
import { planetNameById } from "../services/starWar.service";
import GenericButton from "./genericButton";
import { Icon } from '@iconify/react/dist/iconify.js';
import { useFavorites } from "../context/favoritesContext";


interface CardProps {
    name: string;
    world: string;

}

export default function Card({ cardDetails, id }: any) {

    const { favorites, toggleFavorite } = useFavorites();

    const handle = () =>{

    }

console.log("favorites", favorites);

    const isFavorite = favorites.some((fav) => fav.name === cardDetails.name);

    return (
        <div className="bg-white shadow-md rounded-lg p-4 border w-full">
            {/* Top Row: Name & Icon */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{cardDetails.name}</h2>
                <Icon className="cursor-pointer" icon={isFavorite ? "mdi:heart" : "mdi:heart-outline"} width="24" height="24" onClick={() => toggleFavorite(cardDetails)} />
            </div>

            {/* Second Row: Key-Value Data */}
            <div className="my-4 grid grid-cols-1 gap-x-6 gap-y-2 text-gray-700">
                {/* Home World */}
                <div className="grid grid-cols-4 gap-x-6 gap-y-2 items-center">
                    {/* <FaGlobe className="text-blue-500 mr-2" /> */}
                    <p className="text-sm font-medium">Home World:</p>
                    <p className="text-sm">{cardDetails?.homeworldName}</p>

                </div>

                {/* Birth Year */}
                <div className="grid grid-cols-4 gap-x-6 gap-y-2 items-center">
                    {/* <FaBirthdayCake className="text-yellow-500 mr-2" /> */}
                    <p className="text-sm font-medium">Birth Year:</p>
                    <p className="text-sm">{cardDetails?.birth_year}</p>
                </div>

                {/* Gender */}
                <div className="grid grid-cols-4 gap-x-6 gap-y-2 items-center">
                    {/* <FaVenusMars className="text-pink-500 mr-2" /> */}
                    <p className="text-sm font-medium">Gender:</p>
                    <p className="text-sm">{cardDetails?.gender}</p>
                </div>

                {/* Hair Color */}
                <div className="grid grid-cols-4 gap-x-6 gap-y-2 items-center">
                    {/* <FaUser className="text-gray-500 mr-2" /> */}
                    <p className="text-sm font-medium">Hair Color:</p>
                    <p className="text-sm">{cardDetails?.hair_color}</p>
                </div>

                {/* Height */}
                <div className="grid grid-cols-4 gap-x-6 gap-y-2 items-center">
                    {/* <FaRulerVertical className="text-green-500 mr-2" /> */}
                    <p className="text-sm font-medium">Height:</p>
                    <p className="text-sm">{cardDetails?.height}</p>
                </div>

                {/* Mass */}
                <div className="grid grid-cols-4 gap-x-6 gap-y-2 items-center">
                    {/* <FaWeight className="text-red-500 mr-2" /> */}
                    <p className="text-sm font-medium">Mass:</p>
                    <p className="text-sm">{cardDetails?.mass}</p>
                </div>
            </div>
            {/* onClick={() => router.push() } */}
            <Link href={`/character/${id}`}>
                <GenericButton >View Details</GenericButton>
            </Link>

        </div>
    );
}
