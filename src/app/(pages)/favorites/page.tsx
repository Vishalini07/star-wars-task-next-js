"use client"
import GenericButton from '@/app/(components)/genericButton';
import { useFavorites } from '@/app/context/favoritesContext';
import { PeopleDetails } from '@/app/services/starWar.service';
import React, { useState } from 'react'

const Favorites = () => {

  const { favorites, toggleFavorite, updateFavorite } = useFavorites();

  const [selectedCharacter, setSelectedCharacter] = useState<PeopleDetails | null>(null);
  const [editedData, setEditedData] = useState({ height: "", gender: "" });


  const openEditModal = (character: PeopleDetails) => {
    setSelectedCharacter(character);
    setEditedData({ height: character.height, gender: character.gender });
  };

  const closeModal = () => {
    setSelectedCharacter(null);
  };

  const handleUpdate = () => {
    if (selectedCharacter) {
      updateFavorite(selectedCharacter.url, editedData);
      closeModal();
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Favorite Characters</h1>

      {favorites.length === 0 ? (
        <p className="text-lg text-gray-600">No favorites added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((character: PeopleDetails) => (
            <div key={character.url} className="bg-white shadow-lg rounded-lg p-6 border border-gray-300">
              <h2 className="text-xl font-semibold text-blue-600">{character.name}</h2>

              <ul className="mt-4 space-y-2 text-gray-700">
                <li>🌍 <strong>Home World:</strong> {character.homeworldName}</li>
                <li>📅 <strong>Birth Year:</strong> {character.birth_year}</li>
                <li>👤 <strong>Gender:</strong> {character.gender}</li>
                <li>💇 <strong>Hair Color:</strong> {character.hair_color}</li>
                <li>📏 <strong>Height:</strong> {character.height}</li>
                <li>⚖ <strong>Mass:</strong> {character.mass}</li>
              </ul>

              <div className="mt-6 flex gap-4">
                <GenericButton
                  onClick={() => openEditModal(character)}
                  variant="primary"
                  className="w-full"
                >
                  Edit
                </GenericButton>

                <GenericButton
                  onClick={() => toggleFavorite(character)}
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-100"
                >
                  Remove
                </GenericButton>
              </div>

            </div>
          ))}
        </div>
      )}

      {selectedCharacter && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Character</h2>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium">Height</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded mt-1"
                value={editedData.height}
                onChange={(e) => setEditedData({ ...editedData, height: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium">Gender</label>
              <select
                className="w-full border border-gray-300 p-2 rounded mt-1"
                value={editedData.gender}
                onChange={(e) => setEditedData({ ...editedData, gender: e.target.value })}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="n/a">N/A</option>

              </select>
            </div>

            <div className="flex gap-6 mt-6">
              <GenericButton onClick={closeModal} variant="secondary" className="w-full">
                Cancel
              </GenericButton>

              <GenericButton onClick={handleUpdate} variant="primary" className="w-full">
                Confirm
              </GenericButton>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default Favorites