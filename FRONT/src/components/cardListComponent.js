import React, { useState, useEffect } from 'react';
import CharacterCard from './cardsComponent';
import CharacterModal from './characterModal';

const CharacterList = ({ characters, onDelete ,onComment }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [sortedCharacters, setSortedCharacters] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    setSortedCharacters([...characters].sort((a, b) => {
      return sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }));
  }, [characters, sortOrder]);


  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleCardClick = (character) => {
    setSelectedCharacter(character);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
  };

  const handleDelete = (deletedId) => {
    setSortedCharacters((prevCharacters) => {
      const updatedList = prevCharacters.filter(character => character.id !== deletedId);
      console.log(updatedList);
      return updatedList;
    });
    
    if (onDelete) onDelete(deletedId);
  };
  

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={toggleSortOrder}
        >
          {sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {sortedCharacters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onClick={handleCardClick}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          onClose={closeModal}
          onComment={onComment}
        />
      )}
    </div>
  );
};

export default CharacterList;
