import React, { useState } from 'react';
import useUpdateComment from '../queries/updateComment';

const CharacterModal = ({ character, onClose, onComment }) => {
  const [comment, setComment] = useState(character.comment || '');
  const updateComment = useUpdateComment();

  if (!character) return null;

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSave = async () => {
    await updateComment(character.id, comment);
    onComment(character.id, comment);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg max-w-md mx-auto w-full md:max-w-2xl h-full md:h-auto overflow-auto">
        <h2 className="text-2xl font-bold mb-4">{character.name}</h2>
        <div className="flex justify-center mb-4">
          <img src={character.image} alt={character.name} className="w-1/2 h-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <p className="text-gray-700">Status: {character.status}</p>
          <p className="text-gray-700">Species: {character.species}</p>
          <p className="text-gray-700">Type: {character.type}</p>
          <p className="text-gray-700">Gender: {character.gender}</p>
          <p className="text-gray-700">Origin: {character.origin_name}</p>
        </div>
        <textarea
          className="w-full p-2 border rounded mb-4"
          placeholder="Add a comment..."
          value={comment}
          onChange={handleCommentChange}
        />
        <div className="flex justify-end space-x-2">
          <button 
            className="px-4 py-2 bg-gray-500 text-white rounded" 
            onClick={onClose}
          >
            Close
          </button>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded" 
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
