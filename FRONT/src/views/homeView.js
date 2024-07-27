import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../queries/characterQueries';
import { Character } from '../models/characterModel';
import CharacterList from '../components/cardListComponent';
import useDebounce from '../utils/useDebounce';

function Home() {
  const [page, setPage] = React.useState(1);
  const [characters, setCharacters] = React.useState([]);
  const [filter, setFilter] = React.useState({
    name: '',
    status: '',
    species: '',
    gender: '',
    origin_name: ''
  });

  const debouncedFilter = useDebounce(filter, 900);

  const { loading, error, data, refetch } = useQuery(GET_CHARACTERS, {
    variables: { page, filter: debouncedFilter },
    skip: !page,
    onCompleted: (data) => {
      const characters = Character.fromApiResponseList(data.characters.results);
      setCharacters(characters);
    }
  });

  const handleNextPage = () => {
    if (data?.characters.info.next) {
      setPage(data.characters.info.next);
    }
  };

  const handlePrevPage = () => {
    if (data?.characters.info.prev) {
      setPage(data.characters.info.prev);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prevFilter => ({
      ...prevFilter,
      [name]: value
    }));
  };

  const cleanFilter = (e) => {
    setFilter({
      name: '',
      status: '',
      species: '',
      gender: '',
      origin_name: ''
    });
  };

  const handleDelete = (deletedId) => {
    setCharacters(prevCharacters =>
      prevCharacters.filter(character => character.id !== deletedId)
    );
  };

  const handleUpdateComment = (id, comment) => {
    setCharacters(prevCharacters =>
      prevCharacters.map(character =>
        character.id === id ? { ...character, comment } : character
      )
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const info = data.characters.info;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rick And Blossom Characters</h1>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={filter.name}
          onChange={handleFilterChange}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={filter.status}
          onChange={handleFilterChange}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="species"
          placeholder="Species"
          value={filter.species}
          onChange={handleFilterChange}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={filter.gender}
          onChange={handleFilterChange}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="origin_name"
          placeholder="Origin"
          value={filter.origin_name}
          onChange={handleFilterChange}
          className="border p-2"
        />
      </div>

      <button  className="px-4 py-2 bg-blue-500 text-white rounded" onClick={cleanFilter} >
        Clear
      </button>
      {/* Lista de personajes */}
      <CharacterList characters={characters} onDelete={handleDelete} onComment={handleUpdateComment} />

      {/* Navegación */}
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={handlePrevPage}
          disabled={!info.prev}
        >
          &larr; Previous
        </button>
        <h3 className="text-2xl font-bold mb-4">{page} / {info.pages} </h3>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={handleNextPage}
          disabled={!info.next}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}

export default Home;
