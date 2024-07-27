import React, { useState } from 'react';
import useMarkFavorite from '../queries/markFavorite';
import useDeleteCharacter from '../queries/softDeleteCharacter';

const CharacterCard = ({ character, onClick, onDelete }) => {
  const [isFavorite, setIsFavorite] = useState(character.is_favorite || false);
  const markFavorite = useMarkFavorite();
  const deleteCharacter = useDeleteCharacter();

  const toggleFavorite = async () => {
    try {
      const updatedCharacter = await markFavorite(character.id);
      if (updatedCharacter) {
        setIsFavorite(updatedCharacter.is_favorite);
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this character?");
    if (confirmDelete) {
      try {
        await deleteCharacter(character.id);
        onDelete(character.id);
      } catch (error) {
        console.error('Error deleting character:', error);
      }
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white cursor-pointer relative">
      <div onClick={() => onClick(character)} className='mb-4'>
        <img className="w-full" src={character.image} alt={character.name} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{character.name}</div>
          <p className="text-gray-700 text-base">{character.status}</p>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 flex space-x-4">
        <button className="text-2xl" onClick={handleDelete}>
          🗑️
        </button>
        <button className="text-2xl" onClick={toggleFavorite}>
          {isFavorite ? '⭐' : '☆'}
        </button>
      </div>
    </div>
  );
};

export default CharacterCard;
