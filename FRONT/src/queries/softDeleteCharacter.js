import { gql, useMutation } from '@apollo/client';

const DELETE_CHARACTER = gql`
  mutation deleteCharacter($id: Int!) {
    deleteCharacter(id: $id) {
      id
    }
  }
`;

const useDeleteCharacter = () => {
  const [deleteCharacter] = useMutation(DELETE_CHARACTER);

  return async (id) => {
    try {
      const { data } = await deleteCharacter({ variables: { id } });
      return data.deleteCharacter;
    } catch (error) {
      console.error('Error deleting character:', error);
    }
  };
};

export default useDeleteCharacter;
